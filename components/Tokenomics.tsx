'use client';

import { Coins, TrendingUp, Users, Flame, Lock, ArrowRight } from 'lucide-react';
import PresaleCountdown from './PresaleCountdown';

const tokenInfo = [
  { label: 'Total supply', value: '1B', description: '1 billion BLAZE' },
  { label: 'Presale allocation', value: '120M', description: '12% for presale' },
  { label: 'Launch price', value: '$0.02', description: 'Post-presale price' },
];

const distribution = [
  { name: 'Community rewards', percentage: 20, color: 'bg-emerald-500' },
  { name: 'Staking rewards', percentage: 16, color: 'bg-yellow-500' },
  { name: 'Liquidity pool', percentage: 15, color: 'bg-sky-500' },
  { name: 'Treasury', percentage: 15, color: 'bg-purple-500' },
  { name: 'Presale', percentage: 12, color: 'bg-orange-500' },
  { name: 'Team (6mo vest)', percentage: 12, color: 'bg-pink-500' },
  { name: 'Marketing', percentage: 10, color: 'bg-red-500' },
];

const utilities = [
  { icon: Flame, title: 'Deflationary', description: '0.1% burn per transfer' },
  { icon: TrendingUp, title: 'Staking', description: '8-20% APY (Q1 2026)' },
  { icon: Users, title: 'Governance', description: '1 token = 1 vote (Q2 2026)' },
  { icon: Lock, title: 'Fee discounts', description: 'Up to 75% off' },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20 lg:py-28 bg-gray-50">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-6">
            <Coins className="w-4 h-4" />
            Token economy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            BLAZE <span className="text-gradient-brand">tokenomics</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparent and fair distribution. Designed for long-term growth.
          </p>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tokenInfo.map((item) => (
            <div key={item.label} className="card p-6 text-center">
              <div className="text-sm text-gray-500 mb-1">{item.label}</div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-brand mb-1">{item.value}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Distribution */}
          <div className="card p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Token distribution</h3>
            <div className="space-y-4">
              {distribution.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <span className="font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Utilities */}
          <div className="card p-6 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Token utility</h3>
            <div className="grid grid-cols-2 gap-4">
              {utilities.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="icon-box-sm bg-gray-200 mb-3">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Liquidity lock notice */}
        <div className="card p-6 md:p-8 bg-orange-50 border-orange-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-orange-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Liquidity locked</h3>
              <p className="text-gray-600">
                50% of raised funds locked for 1 year via smart contract for maximum security and trust.
              </p>
            </div>
            <a
              href="/whitepaper"
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Presale Countdown */}
        <div className="mt-12">
          <PresaleCountdown />
        </div>
      </div>
    </section>
  );
}
