'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  Calendar,
  Hash,
  Save,
  Check,
  AlertCircle,
} from 'lucide-react';

export default function AdminSettings() {
  const [presaleDate, setPresaleDate] = useState('2026-02-01');
  const [presaleTime, setPresaleTime] = useState('12:00');
  const [waitlistOffset, setWaitlistOffset] = useState(2847);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
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
      loadSettings();
    };
    checkAuth();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      data?.forEach((setting) => {
        if (setting.key === 'presale_date') {
          const date = new Date(JSON.parse(setting.value));
          setPresaleDate(date.toISOString().split('T')[0]);
          setPresaleTime(date.toISOString().split('T')[1].substring(0, 5));
        }
        if (setting.key === 'waitlist_offset') {
          setWaitlistOffset(JSON.parse(setting.value));
        }
      });
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSaved(false);

    try {
      const presaleDatetime = new Date(`${presaleDate}T${presaleTime}:00Z`).toISOString();

      // Update presale date
      const { error: dateError } = await supabase
        .from('site_settings')
        .upsert({
          key: 'presale_date',
          value: JSON.stringify(presaleDatetime),
          updated_at: new Date().toISOString(),
          updated_by: user?.id,
        });

      if (dateError) throw dateError;

      // Update waitlist offset
      const { error: offsetError } = await supabase
        .from('site_settings')
        .upsert({
          key: 'waitlist_offset',
          value: JSON.stringify(waitlistOffset),
          updated_at: new Date().toISOString(),
          updated_by: user?.id,
        });

      if (offsetError) throw offsetError;

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
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
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-1">Configure presale and website settings</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Presale Settings */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  Presale countdown
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target date
                    </label>
                    <input
                      type="date"
                      value={presaleDate}
                      onChange={(e) => setPresaleDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target time (UTC)
                    </label>
                    <input
                      type="time"
                      value={presaleTime}
                      onChange={(e) => setPresaleTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">
                      Countdown will show: <br />
                      <strong className="text-gray-900">
                        {new Date(`${presaleDate}T${presaleTime}:00Z`).toLocaleString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZoneName: 'short',
                        })}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Waitlist Settings */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-orange-500" />
                  Waitlist counter
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display offset
                  </label>
                  <input
                    type="number"
                    value={waitlistOffset}
                    onChange={(e) => setWaitlistOffset(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    This number is added to the actual waitlist count for display purposes.
                    If you have {waitlistOffset} offset and 50 real signups, it will show {waitlistOffset + 50}.
                  </p>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Save button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all ${
                  saved
                    ? 'bg-green-500'
                    : 'bg-orange-500 hover:bg-orange-600'
                } disabled:opacity-50`}
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


