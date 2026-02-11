'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  Users,
  MessageSquare,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowRight,
  Download,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

interface Stats {
  total: number;
  today: number;
  this_week: number;
  this_month: number;
}

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
  source: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  created_at: string;
  status: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0, this_week: 0, this_month: 0 });
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [recentSignups, setRecentSignups] = useState<WaitlistEntry[]>([]);
  const [recentMessages, setRecentMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const router = useRouter();
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

  const loadData = async () => {
    try {
      // Get waitlist stats
      const { data: statsData } = await supabase.rpc('get_waitlist_stats');
      if (statsData) {
        setStats(statsData);
      }

      // Get unread messages count
      const { data: unreadData } = await supabase.rpc('get_unread_messages_count');
      if (unreadData !== null) {
        setUnreadMessages(unreadData);
      }

      // Get recent signups
      const { data: signups } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (signups) {
        setRecentSignups(signups);
      }

      // Get recent messages
      const { data: messages } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (messages) {
        setRecentMessages(messages);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
      <AdminSidebar unreadMessages={unreadMessages} />
      
      {/* Main content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  Total
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.total.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Waitlist signups</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-sky-600" />
                </div>
                <span className="text-xs font-medium text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.today}</div>
              <div className="text-sm text-gray-500">New today</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  Week
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.this_week}</div>
              <div className="text-sm text-gray-500">This week</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                </div>
                {unreadMessages > 0 && (
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </div>
              <div className="text-3xl font-bold text-gray-900">{unreadMessages}</div>
              <div className="text-sm text-gray-500">Unread messages</div>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent signups */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Recent signups</h2>
                <Link
                  href="/admin/waitlist"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">Loading...</div>
                ) : recentSignups.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No signups yet</div>
                ) : (
                  recentSignups.map((signup) => (
                    <div key={signup.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-bold text-sm">
                            {signup.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{signup.email}</p>
                          <p className="text-xs text-gray-500">{signup.source || 'presale'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Clock className="w-3 h-3" />
                        {formatDate(signup.created_at)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent messages */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Recent messages</h2>
                <Link
                  href="/admin/messages"
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
                >
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-gray-100">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">Loading...</div>
                ) : recentMessages.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No messages yet</div>
                ) : (
                  recentMessages.map((message) => (
                    <Link
                      key={message.id}
                      href={`/admin/messages?id=${message.id}`}
                      className="flex items-center justify-between p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          message.status === 'new' ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          <span className={`font-bold text-sm ${
                            message.status === 'new' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {message.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{message.name}</p>
                          <p className="text-sm text-gray-500 truncate">{message.subject || 'No subject'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {message.status === 'new' && (
                          <span className="w-2 h-2 bg-red-500 rounded-full" />
                        )}
                        <span className="text-gray-400 text-sm">{formatDate(message.created_at)}</span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/admin/waitlist"
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Download className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Export waitlist</p>
                <p className="text-sm text-gray-500">Download as CSV</p>
              </div>
            </Link>

            <Link
              href="/admin/messages"
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                <MessageSquare className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">View messages</p>
                <p className="text-sm text-gray-500">{unreadMessages} unread</p>
              </div>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Presale settings</p>
                <p className="text-sm text-gray-500">Update countdown</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}


