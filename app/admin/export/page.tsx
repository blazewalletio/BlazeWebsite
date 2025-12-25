'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  Download,
  FileSpreadsheet,
  Calendar,
  Filter,
  Check,
} from 'lucide-react';

export default function AdminExport() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [source, setSource] = useState('all');
  const [sources, setSources] = useState<string[]>([]);
  const [exported, setExported] = useState(false);
  
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
      loadSources();
    };
    checkAuth();
  }, []);

  const loadSources = async () => {
    try {
      const { data } = await supabase
        .from('waitlist')
        .select('source')
        .not('source', 'is', null);
      
      const uniqueSources = Array.from(new Set((data || []).map(d => d.source)));
      setSources(uniqueSources);
    } catch (error) {
      console.error('Error loading sources:', error);
    }
  };

  const handleExport = async (format: 'csv' | 'json') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        action: 'export',
        format,
      });
      
      if (startDate) params.append('start', startDate);
      if (endDate) params.append('end', endDate);
      if (source !== 'all') params.append('source', source);

      const res = await fetch(`/api/waitlist?${params}`);
      
      if (format === 'csv') {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `blaze-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `blaze-waitlist-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }

      setExported(true);
      setTimeout(() => setExported(false), 3000);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data');
    } finally {
      setLoading(false);
    }
  };

  const presetRanges = [
    { label: 'Today', start: new Date().toISOString().split('T')[0], end: new Date().toISOString().split('T')[0] },
    { label: 'Last 7 days', start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], end: new Date().toISOString().split('T')[0] },
    { label: 'Last 30 days', start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], end: new Date().toISOString().split('T')[0] },
    { label: 'All time', start: '', end: '' },
  ];

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
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Export data</h1>
            <p className="text-gray-500 mt-1">Download waitlist data with filters</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-orange-500" />
              Filters
            </h3>

            {/* Quick ranges */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick select</label>
              <div className="flex flex-wrap gap-2">
                {presetRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      setStartDate(range.start);
                      setEndDate(range.end);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      startDate === range.start && endDate === range.end
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Date range */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Start date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  End date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Source filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All sources</option>
                {sources.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Export buttons */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-orange-500" />
              Download
            </h3>

            {exported && (
              <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700">
                <Check className="w-5 h-5" />
                Export successful!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleExport('csv')}
                disabled={loading}
                className="flex items-center justify-center gap-3 p-6 bg-gray-50 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300 rounded-2xl transition-all group disabled:opacity-50"
              >
                <FileSpreadsheet className="w-8 h-8 text-emerald-600" />
                <div className="text-left">
                  <p className="font-bold text-gray-900">CSV</p>
                  <p className="text-sm text-gray-500">For Excel, Google Sheets</p>
                </div>
              </button>

              <button
                onClick={() => handleExport('json')}
                disabled={loading}
                className="flex items-center justify-center gap-3 p-6 bg-gray-50 hover:bg-orange-50 border-2 border-gray-200 hover:border-orange-300 rounded-2xl transition-all group disabled:opacity-50"
              >
                <FileSpreadsheet className="w-8 h-8 text-sky-600" />
                <div className="text-left">
                  <p className="font-bold text-gray-900">JSON</p>
                  <p className="text-sm text-gray-500">For developers, APIs</p>
                </div>
              </button>
            </div>

            {loading && (
              <div className="mt-4 text-center text-gray-500">
                <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                Preparing export...
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

