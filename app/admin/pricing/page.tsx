'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { DollarSign, TrendingUp, Users, Edit2, Check, X, Loader2, AlertCircle } from 'lucide-react';

interface PricingTier {
  id: number;
  tier_number: number;
  tier_name: string;
  min_buyers: number;
  max_buyers: number;
  price_usd: number;
  bonus_percentage: number;
  is_active: boolean;
}

export default function PricingAdminPage() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);
  const [buyerCount, setBuyerCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    
    // Fetch tiers
    const { data: tiersData, error: tiersError } = await supabase
      .from('pricing_tiers')
      .select('*')
      .order('tier_number');

    if (tiersError) {
      setError('Failed to fetch pricing tiers');
      console.error(tiersError);
    } else {
      setTiers(tiersData || []);
    }

    // Fetch buyer count
    const { count } = await supabase
      .from('presale_buyers')
      .select('*', { count: 'exact', head: true })
      .in('status', ['confirmed', 'completed']);

    setBuyerCount(count || 0);
    setLoading(false);
  }

  async function updateTier(tier: PricingTier) {
    const { error } = await supabase
      .from('pricing_tiers')
      .update({
        tier_name: tier.tier_name,
        min_buyers: tier.min_buyers,
        max_buyers: tier.max_buyers,
        price_usd: tier.price_usd,
        bonus_percentage: tier.bonus_percentage,
        is_active: tier.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', tier.id);

    if (error) {
      setError('Failed to update tier');
      console.error(error);
    } else {
      setEditingTier(null);
      fetchData();
    }
  }

  function getCurrentTier() {
    return tiers.find(t => 
      t.is_active && buyerCount >= t.min_buyers - 1 && buyerCount < t.max_buyers
    );
  }

  const currentTier = getCurrentTier();
  const publicPrice = 0.005;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pricing tiers</h1>
            <p className="text-gray-600">Configure presale pricing tiers and bonuses</p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 text-red-500 bg-red-50 px-4 py-3 rounded-xl">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
              <button onClick={() => setError(null)} className="ml-auto">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Current Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-600">Current tier</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {currentTier?.tier_name || 'Founders'}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-gray-600">Current price</span>
              </div>
              <div className="text-2xl font-bold text-emerald-600">
                ${currentTier?.price_usd?.toFixed(4) || '0.0015'}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600">Total buyers</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{buyerCount}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                </div>
                <span className="text-gray-600">Spots remaining</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {currentTier ? currentTier.max_buyers - buyerCount : 100}
              </div>
            </div>
          </div>

          {/* Tiers Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-900">All pricing tiers</h2>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Tier</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Name</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Buyer range</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Price</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Discount</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Bonus %</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tiers.map((tier) => {
                      const isCurrent = tier.tier_number === currentTier?.tier_number;
                      const isPast = buyerCount >= tier.max_buyers;
                      const discount = Math.round((1 - tier.price_usd / publicPrice) * 100);

                      return (
                        <tr
                          key={tier.id}
                          className={`${isCurrent ? 'bg-orange-50' : ''} ${isPast ? 'opacity-50' : ''}`}
                        >
                          <td className="px-6 py-4">
                            <span className={`font-bold ${isCurrent ? 'text-orange-600' : 'text-gray-600'}`}>
                              #{tier.tier_number}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {editingTier?.id === tier.id ? (
                              <input
                                type="text"
                                value={editingTier.tier_name}
                                onChange={(e) => setEditingTier({ ...editingTier, tier_name: e.target.value })}
                                className="px-2 py-1 border border-gray-300 rounded text-sm w-24"
                              />
                            ) : (
                              <span className="font-medium text-gray-900">{tier.tier_name}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {editingTier?.id === tier.id ? (
                              <div className="flex gap-1">
                                <input
                                  type="number"
                                  value={editingTier.min_buyers}
                                  onChange={(e) => setEditingTier({ ...editingTier, min_buyers: parseInt(e.target.value) })}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm w-16"
                                />
                                <span>-</span>
                                <input
                                  type="number"
                                  value={editingTier.max_buyers}
                                  onChange={(e) => setEditingTier({ ...editingTier, max_buyers: parseInt(e.target.value) })}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm w-16"
                                />
                              </div>
                            ) : (
                              <span className="text-gray-600">{tier.min_buyers} - {tier.max_buyers}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {editingTier?.id === tier.id ? (
                              <input
                                type="number"
                                step="0.0001"
                                value={editingTier.price_usd}
                                onChange={(e) => setEditingTier({ ...editingTier, price_usd: parseFloat(e.target.value) })}
                                className="px-2 py-1 border border-gray-300 rounded text-sm w-24"
                              />
                            ) : (
                              <span className="font-bold text-emerald-600">${tier.price_usd.toFixed(4)}</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-sm font-medium ${
                              discount >= 50 ? 'bg-emerald-100 text-emerald-700' :
                              discount >= 25 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {discount}% off
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {editingTier?.id === tier.id ? (
                              <input
                                type="number"
                                value={editingTier.bonus_percentage}
                                onChange={(e) => setEditingTier({ ...editingTier, bonus_percentage: parseInt(e.target.value) })}
                                className="px-2 py-1 border border-gray-300 rounded text-sm w-16"
                              />
                            ) : (
                              <span className="text-orange-600 font-medium">+{tier.bonus_percentage}%</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {isPast ? (
                              <span className="text-gray-500">Sold out</span>
                            ) : isCurrent ? (
                              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                                Active
                              </span>
                            ) : (
                              <span className="text-gray-400">Upcoming</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            {editingTier?.id === tier.id ? (
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => updateTier(editingTier)}
                                  className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setEditingTier(null)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setEditingTier(tier)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-blue-700 text-sm">
            <strong>Note:</strong> Changes to pricing tiers take effect immediately.
            The current tier is determined by the total number of confirmed buyers.
          </div>
        </div>
      </main>
    </div>
  );
}

