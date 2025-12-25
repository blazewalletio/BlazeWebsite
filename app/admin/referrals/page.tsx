'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  Gift,
  Trophy,
  Users,
  Copy,
  Check,
  ExternalLink,
  Search,
} from 'lucide-react';

interface ReferralUser {
  email: string;
  referral_code: string;
  created_at: string;
  referral_count: number;
}

export default function AdminReferrals() {
  const [referrals, setReferrals] = useState<ReferralUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, withReferrals: 0, totalReferred: 0 });
  
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
      // Get all users with their referral counts
      const { data: users } = await supabase
        .from('waitlist')
        .select('email, referral_code, created_at, referred_by')
        .not('referral_code', 'is', null)
        .order('created_at', { ascending: false });

      if (users) {
        // Count referrals for each user
        const referralCounts = new Map<string, number>();
        users.forEach(u => {
          if (u.referred_by) {
            referralCounts.set(u.referred_by, (referralCounts.get(u.referred_by) || 0) + 1);
          }
        });

        const usersWithCounts: ReferralUser[] = users.map(u => ({
          email: u.email,
          referral_code: u.referral_code,
          created_at: u.created_at,
          referral_count: referralCounts.get(u.referral_code) || 0,
        }));

        // Sort by referral count
        usersWithCounts.sort((a, b) => b.referral_count - a.referral_count);

        setReferrals(usersWithCounts);

        // Calculate stats
        const totalReferred = Array.from(referralCounts.values()).reduce((a, b) => a + b, 0);
        setStats({
          total: users.length,
          withReferrals: usersWithCounts.filter(u => u.referral_count > 0).length,
          totalReferred: totalReferred,
        });
      }
    } catch (error) {
      console.error('Error loading referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (code: string) => {
    await navigator.clipboard.writeText(`https://www.blazewallet.io?ref=${code}`);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredReferrals = referrals.filter(r => 
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.referral_code.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Referrals</h1>
            <p className="text-gray-500 mt-1">Track referral codes and top performers</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm text-gray-500">Total with codes</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Gift className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-sm text-gray-500">Active referrers</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.withReferrals}</div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Total referred</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalReferred}</div>
            </div>
          </div>

          {/* Search and table */}
          <div className="bg-white rounded-2xl border border-gray-200">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by email or code..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Rank</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Referral code</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Referrals</th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredReferrals.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        {search ? 'No results found' : 'No referrals yet'}
                      </td>
                    </tr>
                  ) : (
                    filteredReferrals.map((referral, index) => (
                      <tr key={referral.referral_code} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="p-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            index === 0 ? 'bg-yellow-100 text-yellow-700' :
                            index === 1 ? 'bg-gray-100 text-gray-700' :
                            index === 2 ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-50 text-gray-500'
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-medium text-gray-900">{referral.email}</span>
                        </td>
                        <td className="p-4">
                          <code className="px-2 py-1 bg-gray-100 rounded text-sm text-orange-600 font-mono">
                            {referral.referral_code}
                          </code>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            referral.referral_count > 0 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {referral.referral_count}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => copyToClipboard(referral.referral_code)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Copy referral link"
                          >
                            {copied === referral.referral_code ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

