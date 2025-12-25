'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  Mail,
  Clock,
  Check,
  CheckCheck,
  X,
  Trash2,
  ArrowLeft,
} from 'lucide-react';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  status: string;
  notes: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }
      setUser(user);
      loadData();
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id && messages.length > 0) {
      const message = messages.find((m) => m.id === id);
      if (message) {
        handleSelectMessage(message);
      }
    }
  }, [searchParams, messages]);

  const loadData = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMessages(data || []);
      setUnreadCount(data?.filter((m) => m.status === 'new').length || 0);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMessage = async (message: Message) => {
    setSelectedMessage(message);
    
    // Mark as read if new
    if (message.status === 'new') {
      try {
        await supabase
          .from('contact_messages')
          .update({ status: 'read', read_at: new Date().toISOString() })
          .eq('id', message.id);
        
        // Update local state
        setMessages(messages.map((m) =>
          m.id === message.id ? { ...m, status: 'read' } : m
        ));
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (error) {
        console.error('Error marking as read:', error);
      }
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedMessage) return;

    try {
      await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', selectedMessage.id);
      
      setMessages(messages.map((m) =>
        m.id === selectedMessage.id ? { ...m, status } : m
      ));
      setSelectedMessage({ ...selectedMessage, status });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedMessage) return;
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await supabase
        .from('contact_messages')
        .delete()
        .eq('id', selectedMessage.id);
      
      setMessages(messages.filter((m) => m.id !== selectedMessage.id));
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-600';
      case 'read': return 'bg-yellow-100 text-yellow-600';
      case 'replied': return 'bg-blue-100 text-blue-600';
      case 'resolved': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar unreadMessages={unreadCount} />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="h-[calc(100vh-4rem)] lg:h-screen flex">
          {/* Message list */}
          <div className={`w-full lg:w-96 bg-white border-r border-gray-200 flex flex-col ${
            selectedMessage ? 'hidden lg:flex' : 'flex'
          }`}>
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              <p className="text-sm text-gray-500">{unreadCount} unread</p>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-6 text-center text-gray-500">Loading...</div>
              ) : messages.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No messages yet</div>
              ) : (
                messages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => handleSelectMessage(message)}
                    className={`w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-orange-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.status === 'new' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <span className={`font-bold text-sm ${
                          message.status === 'new' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {message.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`font-medium truncate ${
                            message.status === 'new' ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {message.name}
                          </p>
                          {message.status === 'new' && (
                            <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{message.subject || 'No subject'}</p>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(message.created_at)}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message detail */}
          <div className={`flex-1 flex flex-col ${
            selectedMessage ? 'flex' : 'hidden lg:flex'
          }`}>
            {selectedMessage ? (
              <>
                {/* Header */}
                <div className="p-4 lg:p-6 border-b border-gray-200 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                      <h2 className="font-bold text-gray-900">{selectedMessage.name}</h2>
                      <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                    <button
                      onClick={handleDelete}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4" />
                      {formatDate(selectedMessage.created_at)}
                    </div>
                    {selectedMessage.subject && (
                      <h3 className="font-semibold text-gray-900 mb-4">{selectedMessage.subject}</h3>
                    )}
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-gray-200 bg-white flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUpdateStatus('read')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                      selectedMessage.status === 'read'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    Read
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('replied')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                      selectedMessage.status === 'replied'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Replied
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('resolved')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                      selectedMessage.status === 'resolved'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-50'
                    }`}
                  >
                    <CheckCheck className="w-4 h-4" />
                    Resolved
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors ml-auto"
                  >
                    <Mail className="w-4 h-4" />
                    Reply via email
                  </a>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a message to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

