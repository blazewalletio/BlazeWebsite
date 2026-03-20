'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ThanksInner() {
  const searchParams = useSearchParams();
  const other = searchParams.get('other') === '1';
  const token = searchParams.get('t') || '';
  const invalid = searchParams.get('invalid') === '1';
  const error = searchParams.get('error') === '1';

  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function submitNote(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !note.trim()) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch('/api/commitment-feedback/note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, note: note.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setSaveError(data?.error || 'Could not save');
        setSaving(false);
        return;
      }
      setSaved(true);
    } catch {
      setSaveError('Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  if (invalid) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Link not valid</h1>
        <p className="text-gray-600 mb-8">This link may have expired or is incorrect. Please use the link from your latest BLAZE email.</p>
        <Link href="/presale" className="text-orange-600 font-semibold hover:underline">Presale</Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h1>
        <p className="text-gray-600 mb-8">We couldn&apos;t save your answer. Please try again from the email, or contact us on Telegram.</p>
        <Link href="https://t.me/ai4ldMZv0KgyN2Y8" className="text-orange-600 font-semibold hover:underline">Telegram</Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank you 🙏</h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-8">
        We&apos;ve received your answer. It helps the BLAZE team understand how to support you and improve the presale experience.
      </p>

      {other && token && !saved && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-2">Care to add a few words?</h2>
          <p className="text-sm text-gray-600 mb-4">Optional — tell us in your own words what would help.</p>
          <form onSubmit={submitNote}>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full min-h-[120px] rounded-xl border border-gray-200 p-4 text-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="e.g. I need a walkthrough for ..."
              maxLength={4000}
            />
            {saveError && <p className="text-red-600 text-sm mt-2">{saveError}</p>}
            <button
              type="submit"
              disabled={saving || !note.trim()}
              className="mt-4 w-full py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Send note'}
            </button>
          </form>
        </div>
      )}

      {saved && (
        <p className="text-emerald-700 font-medium mb-8">Your note was saved. We appreciate it.</p>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="https://my.blazewallet.io"
          className="inline-flex justify-center items-center px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600"
        >
          Open BLAZE Wallet
        </Link>
        <Link href="/presale" className="inline-flex justify-center items-center px-6 py-3 rounded-xl border border-gray-200 text-gray-800 font-semibold hover:bg-gray-50">
          Presale info
        </Link>
      </div>
    </div>
  );
}

export default function CommitmentFeedbackThanksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Suspense
        fallback={
          <div className="flex justify-center py-24">
            <div className="animate-pulse text-gray-500">Loading…</div>
          </div>
        }
      >
        <ThanksInner />
      </Suspense>
    </div>
  );
}
