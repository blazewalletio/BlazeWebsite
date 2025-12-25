'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Flame, Bell, Users, ArrowRight, Check, Sparkles, AlertCircle, Gift, Copy } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Inner component that uses useSearchParams
function PresaleCountdownInner() {
  const [presaleDate, setPresaleDate] = useState<number>(new Date('2026-02-01T12:00:00Z').getTime());
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(2847);
  const [myReferralCode, setMyReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  
  const searchParams = useSearchParams();
  const referredBy = searchParams.get('ref');

  // Fetch settings and waitlist count on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get settings (including presale date)
        const settingsRes = await fetch('/api/settings');
        if (settingsRes.ok) {
          const settings = await settingsRes.json();
          if (settings.presale_date) {
            setPresaleDate(new Date(settings.presale_date).getTime());
          }
        }

        // Get waitlist count
        const countRes = await fetch('/api/waitlist');
        if (countRes.ok) {
          const data = await countRes.json();
          setWaitlistCount(data.count);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = presaleDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [presaleDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          source: referredBy ? 'referral' : 'presale_countdown',
          ref: referredBy || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If already on waitlist, still show their referral code
        if (data.referralCode) {
          setMyReferralCode(data.referralCode);
        }
        setError(data.error || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
      setIsLoading(false);
      setWaitlistCount(data.count + 2847); // Add offset
      setMyReferralCode(data.referralCode);
      setEmail('');
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
      setIsLoading(false);
    }
  };

  const copyReferralLink = async () => {
    await navigator.clipboard.writeText(`https://www.blazewallet.io?ref=${myReferralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-16 sm:w-20 h-16 sm:h-20 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />
      </div>
      <span className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 md:p-10">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 font-medium text-sm mb-4">
            <Flame className="w-4 h-4" />
            Token presale
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Presale starts in
          </h3>
        </div>

        {/* Countdown */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-8">
          <TimeBlock value={timeLeft.days} label="Days" />
          <div className="flex items-center text-2xl text-gray-500 font-bold pt-4">:</div>
          <TimeBlock value={timeLeft.hours} label="Hours" />
          <div className="flex items-center text-2xl text-gray-500 font-bold pt-4">:</div>
          <TimeBlock value={timeLeft.minutes} label="Minutes" />
          <div className="hidden sm:flex items-center text-2xl text-gray-500 font-bold pt-4">:</div>
          <div className="hidden sm:block">
            <TimeBlock value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>

        {/* Price info */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8">
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">Early bird price</div>
            <div className="text-2xl font-bold text-orange-400">$0.00417</div>
          </div>
          <div className="hidden sm:block w-px bg-gray-700" />
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">Public launch price</div>
            <div className="text-2xl font-bold text-white">$0.01</div>
          </div>
          <div className="hidden sm:block w-px bg-gray-700" />
          <div className="text-center">
            <div className="text-gray-400 text-sm mb-1">Your savings</div>
            <div className="text-2xl font-bold text-emerald-400">58% off</div>
          </div>
        </div>

        {/* Email form */}
        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="relative">
              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Bell className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl font-semibold text-white hover:from-orange-600 hover:to-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Notify me
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 py-4 px-6 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-emerald-400 font-medium">You're on the list! Check your email for confirmation.</span>
              </div>
              
              {/* Referral code box */}
              {myReferralCode && (
                <div className="p-4 bg-white/10 border border-white/20 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                    <Gift className="w-4 h-4 text-orange-400" />
                    <span>Share & earn rewards!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-4 py-3 bg-white/10 rounded-lg text-orange-400 font-mono text-center">
                      {myReferralCode}
                    </code>
                    <button
                      onClick={copyReferralLink}
                      className="px-4 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Copy className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Top referrers get bonus tokens!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Waitlist counter */}
        <div className="flex items-center justify-center gap-2 mt-6 text-gray-400">
          <Users className="w-4 h-4" />
          <span className="text-sm">
            <span className="text-white font-semibold">{waitlistCount.toLocaleString()}</span> people already on the waitlist
          </span>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
          {[
            { icon: Sparkles, text: 'Early access to presale' },
            { icon: Bell, text: 'Price alerts & updates' },
            { icon: Flame, text: 'Exclusive bonuses' },
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-sm">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Wrapper component with Suspense boundary
export default function PresaleCountdown() {
  return (
    <Suspense fallback={
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 md:p-10">
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    }>
      <PresaleCountdownInner />
    </Suspense>
  );
}
