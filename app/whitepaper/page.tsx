'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, BookOpen, Brain, Shield, Zap, Users, Coins, Rocket, Globe, Lock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to website</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-blaze rounded-lg font-medium hover:scale-105 transition-transform">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 card-glass rounded-lg font-medium hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Page */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-blaze rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              BLAZE <span className="text-gradient">Whitepaper</span>
            </h1>
            <p className="text-2xl text-gray-400 mb-8">
              The Future of Intelligent Crypto Wallets
            </p>
            <div className="flex items-center justify-center gap-8 text-gray-500">
              <span>Version 2.0</span>
              <span>•</span>
              <span>December 2024</span>
              <span>•</span>
              <span>BLAZE Core Team</span>
            </div>
          </div>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-glass p-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Executive Summary', page: 1 },
              { title: 'Problem Statement', page: 2 },
              { title: 'BLAZE Solution', page: 3 },
              { title: 'AI Features Overview', page: 4 },
              { title: 'Technology Stack', page: 6 },
              { title: 'Smart Contract Architecture', page: 8 },
              { title: 'Token Economics', page: 10 },
              { title: 'Security & Audits', page: 12 },
              { title: 'Roadmap & Milestones', page: 14 },
              { title: 'Team & Governance', page: 16 },
              { title: 'Legal & Compliance', page: 17 },
              { title: 'Conclusion', page: 18 },
            ].map((section, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <span className="font-medium">{section.title}</span>
                <span className="text-gray-400 text-sm">p.{section.page}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Executive Summary */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">1. Executive Summary</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-6">
              BLAZE Wallet represents a paradigm shift in cryptocurrency management, combining 
              traditional wallet functionality with cutting-edge artificial intelligence to create 
              the most intelligent and user-friendly crypto experience available.
            </p>
            <p className="mb-6">
              Built on a foundation of security, innovation, and user-centric design, BLAZE 
              introduces five revolutionary AI features that transform how users interact with 
              cryptocurrency. From natural language transaction processing to predictive gas 
              optimization, BLAZE makes crypto accessible to everyone while providing advanced 
              tools for experienced users.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="card-glass p-6 text-center">
                <Brain className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">5 AI Features</h3>
                <p className="text-gray-400">Revolutionary artificial intelligence integration</p>
              </div>
              <div className="card-glass p-6 text-center">
                <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">100% Secure</h3>
                <p className="text-gray-400">Non-custodial architecture with advanced security</p>
              </div>
              <div className="card-glass p-6 text-center">
                <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Multi-Chain</h3>
                <p className="text-gray-400">Support for 18 blockchain networks</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Problem Statement */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">2. Problem Statement</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-6">
              The cryptocurrency ecosystem has grown exponentially, yet user experience remains 
              a significant barrier to mainstream adoption. Current wallets suffer from several 
              critical limitations:
            </p>
            <div className="space-y-4 mb-8">
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-3 text-red-400">Complex User Interfaces</h3>
                <p className="text-gray-300">
                  Traditional wallets require users to understand complex technical concepts like 
                  gas fees, slippage, and contract interactions. This creates a steep learning 
                  curve that prevents many potential users from entering the crypto space.
                </p>
              </div>
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-3 text-red-400">Security Vulnerabilities</h3>
                <p className="text-gray-300">
                  Users frequently fall victim to scams, phishing attacks, and malicious contracts. 
                  The lack of intelligent security screening leaves users vulnerable to financial loss.
                </p>
              </div>
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-3 text-red-400">Inefficient Gas Management</h3>
                <p className="text-gray-300">
                  Users often overpay for gas fees due to poor timing and lack of optimization 
                  tools. This results in unnecessary costs and poor user experience.
                </p>
              </div>
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-3 text-red-400">Limited Portfolio Insights</h3>
                <p className="text-gray-300">
                  Most wallets provide basic balance information without actionable insights 
                  for portfolio optimization and risk management.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* BLAZE Solution */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">3. BLAZE Solution</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-6">
              BLAZE Wallet addresses these challenges through intelligent automation, 
              advanced security features, and an intuitive user experience that makes 
              cryptocurrency accessible to everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="card-glass p-6">
                <h3 className="text-2xl font-bold mb-4 text-orange-400">AI-Powered Experience</h3>
                <p className="mb-4">
                  Our five AI features work together to create an intelligent assistant 
                  that understands user intent and executes complex operations with 
                  natural language commands.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Natural language transaction processing</li>
                  <li>• Real-time security scanning</li>
                  <li>• Predictive gas optimization</li>
                  <li>• Portfolio analysis and recommendations</li>
                  <li>• 24/7 crypto expert assistance</li>
                </ul>
              </div>
              <div className="card-glass p-6">
                <h3 className="text-2xl font-bold mb-4 text-green-400">Enterprise-Grade Security</h3>
                <p className="mb-4">
                  Built with security-first principles, BLAZE ensures user funds and 
                  data remain protected through multiple layers of security.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>• Non-custodial architecture</li>
                  <li>• Biometric authentication</li>
                  <li>• Hardware key support</li>
                  <li>• Encrypted local storage</li>
                  <li>• Smart contract verification</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* AI Features Overview */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">4. AI Features Overview</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-8">
              BLAZE's AI features represent the cutting edge of cryptocurrency wallet technology, 
              providing users with intelligent assistance that learns and adapts to their needs.
            </p>
            
            <div className="space-y-8">
              <div className="card-glass p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">AI Transaction Assistant</h3>
                </div>
                <p className="mb-4">
                  Transform complex blockchain operations into simple natural language commands. 
                  Users can type "Send 50 USDC to 0x..." and the AI handles all technical details.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Natural language parsing (Dutch & English)</li>
                      <li>• Offline pattern matching</li>
                      <li>• OpenAI integration for advanced queries</li>
                      <li>• Address validation and verification</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Use Cases:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• "Swap all my USDT to ETH"</li>
                      <li>• "What's my biggest holding?"</li>
                      <li>• "Send 100 BLAZE to my friend"</li>
                      <li>• "Show me my staking rewards"</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-glass p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Smart Scam Detector</h3>
                </div>
                <p className="mb-4">
                  Real-time security scanning that analyzes addresses and smart contracts 
                  before users interact with them, providing risk scores and warnings.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Security Checks:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Address validation and checksum verification</li>
                      <li>• Known scam address database</li>
                      <li>• Smart contract analysis</li>
                      <li>• Risk scoring (0-100 scale)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Risk Levels:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• 🟢 Low (80-100): Safe to proceed</li>
                      <li>• 🟡 Medium (60-79): Exercise caution</li>
                      <li>• 🟠 High (30-59): Consider avoiding</li>
                      <li>• 🔴 Critical (0-29): STOP - likely scam</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-glass p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">AI Portfolio Advisor</h3>
                </div>
                <p className="mb-4">
                  Comprehensive portfolio analysis with personalized recommendations 
                  for optimization, diversification, and risk management.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Analytics:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Diversification score calculation</li>
                      <li>• Stablecoin allocation analysis</li>
                      <li>• Risk profile assessment</li>
                      <li>• Performance tracking</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Recommendations:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Rebalancing suggestions</li>
                      <li>• Risk mitigation strategies</li>
                      <li>• Opportunity identification</li>
                      <li>• Tax optimization tips</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-glass p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Predictive Gas Optimizer</h3>
                </div>
                <p className="mb-4">
                  Machine learning-based gas price prediction that helps users 
                  save money by transacting at optimal times.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Predictions:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Gas price trend analysis</li>
                      <li>• Optimal timing recommendations</li>
                      <li>• Cost savings estimation</li>
                      <li>• Historical pattern recognition</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Best Times:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• 2-6 AM UTC (lowest fees)</li>
                      <li>• Weekends (reduced activity)</li>
                      <li>• Avoid US trading hours</li>
                      <li>• Layer 2 alternatives</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="card-glass p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Conversational Crypto Assistant</h3>
                </div>
                <p className="mb-4">
                  A 24/7 AI crypto expert that answers questions, provides explanations, 
                  and offers guidance on all aspects of cryptocurrency and DeFi.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Capabilities:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• Conversational memory</li>
                      <li>• Context-aware responses</li>
                      <li>• Offline mode for common questions</li>
                      <li>• Multi-language support</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Example Questions:</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• "What is gas?"</li>
                      <li>• "Explain impermanent loss"</li>
                      <li>• "Why did my swap fail?"</li>
                      <li>• "What is slippage?"</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Technology Stack */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">5. Technology Stack</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-8">
              BLAZE Wallet is built on a modern, scalable technology stack that ensures 
              performance, security, and maintainability.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Frontend</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Next.js 14</strong> - React framework with App Router</li>
                  <li>• <strong>TypeScript</strong> - Type-safe development</li>
                  <li>• <strong>Tailwind CSS</strong> - Utility-first styling</li>
                  <li>• <strong>Framer Motion</strong> - Smooth animations</li>
                  <li>• <strong>Lucide React</strong> - Professional iconography</li>
                </ul>
              </div>
              
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4 text-green-400">Blockchain</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>ethers.js v6</strong> - Ethereum interaction library</li>
                  <li>• <strong>Web3.js</strong> - Multi-chain support</li>
                  <li>• <strong>BIP39</strong> - Mnemonic phrase generation</li>
                  <li>• <strong>OpenZeppelin</strong> - Secure smart contracts</li>
                  <li>• <strong>Hardhat</strong> - Development environment</li>
                </ul>
              </div>
              
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4 text-purple-400">AI & Security</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>OpenAI API</strong> - Advanced AI capabilities</li>
                  <li>• <strong>WebAuthn</strong> - Biometric authentication</li>
                  <li>• <strong>Crypto-JS</strong> - Encryption utilities</li>
                  <li>• <strong>Zustand</strong> - State management</li>
                  <li>• <strong>PWA</strong> - Progressive web app</li>
                </ul>
              </div>
              
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4 text-orange-400">Infrastructure</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Vercel</strong> - Hosting and deployment</li>
                  <li>• <strong>IPFS</strong> - Decentralized storage</li>
                  <li>• <strong>1inch API</strong> - DEX aggregation</li>
                  <li>• <strong>CoinGecko API</strong> - Price data</li>
                  <li>• <strong>CertiK</strong> - Security audits</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Smart Contract Architecture */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">6. Smart Contract Architecture</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-8">
              BLAZE's smart contract architecture is designed for security, efficiency, 
              and scalability, with comprehensive testing and audit procedures.
            </p>
            
            <div className="card-glass p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">BlazeToken Contract</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Token Specifications:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>Name:</strong> Blaze Token</li>
                    <li>• <strong>Symbol:</strong> BLAZE</li>
                    <li>• <strong>Decimals:</strong> 18</li>
                    <li>• <strong>Total Supply:</strong> 1,000,000,000 BLAZE</li>
                    <li>• <strong>Network:</strong> Binance Smart Chain (BSC)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>Deflationary:</strong> 0.10% burn per transfer</li>
                    <li>• <strong>Staking:</strong> 8-20% APY rewards</li>
                    <li>• <strong>Governance:</strong> 1 token = 1 vote</li>
                    <li>• <strong>Fee Discounts:</strong> Up to 75% off</li>
                    <li>• <strong>Premium Status:</strong> 10,000+ BLAZE threshold</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-glass p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Security Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Access Control:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>Ownable:</strong> Owner-only functions</li>
                    <li>• <strong>Pausable:</strong> Emergency stop capability</li>
                    <li>• <strong>ReentrancyGuard:</strong> Attack prevention</li>
                    <li>• <strong>Multi-sig:</strong> Treasury protection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Audit Status:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>CertiK:</strong> Security audit completed</li>
                    <li>• <strong>OpenZeppelin:</strong> Standard contracts</li>
                    <li>• <strong>Test Coverage:</strong> 100% (39/39 tests)</li>
                    <li>• <strong>Formal Verification:</strong> Mathematical proofs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Token Economics */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">7. Token Economics</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-8">
              BLAZE tokenomics are designed for long-term sustainability, user incentives, 
              and ecosystem growth through carefully balanced distribution and utility mechanisms.
            </p>
            
            <div className="card-glass p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Token Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Allocation Breakdown:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>Public Sale:</strong> 15% (150M BLAZE)</li>
                    <li>• <strong>Liquidity:</strong> 10% (100M BLAZE)</li>
                    <li>• <strong>Founder (Unlocked):</strong> 10% (100M BLAZE)</li>
                    <li>• <strong>Founder (Vesting):</strong> 15% (150M BLAZE)</li>
                    <li>• <strong>Community Rewards:</strong> 20% (200M BLAZE)</li>
                    <li>• <strong>Treasury:</strong> 15% (150M BLAZE)</li>
                    <li>• <strong>Team (3yr vest):</strong> 10% (100M BLAZE)</li>
                    <li>• <strong>Strategic (2yr vest):</strong> 5% (50M BLAZE)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Vesting Schedule:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>Founder:</strong> 6-month cliff, 4-year linear</li>
                    <li>• <strong>Team:</strong> 3-year linear vesting</li>
                    <li>• <strong>Strategic:</strong> 2-year linear vesting</li>
                    <li>• <strong>Liquidity:</strong> 2-year lock via smart contract</li>
                    <li>• <strong>Community:</strong> Immediate unlock for rewards</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="card-glass p-8 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Staking Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">8% APY</div>
                  <div className="text-gray-400 text-sm">Flexible Staking</div>
                  <div className="text-gray-500 text-xs mt-1">No lock period</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">15% APY</div>
                  <div className="text-gray-400 text-sm">6-Month Lock</div>
                  <div className="text-gray-500 text-xs mt-1">180 days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">20% APY</div>
                  <div className="text-gray-400 text-sm">1-Year Lock</div>
                  <div className="text-gray-500 text-xs mt-1">365 days</div>
                </div>
              </div>
            </div>

            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Fee Discount Tiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400 mb-1">10%</div>
                  <div className="text-gray-400 text-sm">1,000 - 9,999 BLAZE</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border-2 border-blue-500/30">
                  <div className="text-2xl font-bold text-orange-400 mb-1">25%</div>
                  <div className="text-gray-400 text-sm">10,000 - 49,999 BLAZE</div>
                  <div className="text-blue-400 text-xs mt-1">+ Premium Status</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border-2 border-purple-500/30">
                  <div className="text-2xl font-bold text-orange-400 mb-1">50%</div>
                  <div className="text-gray-400 text-sm">50,000 - 99,999 BLAZE</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg border-2 border-orange-500/30">
                  <div className="text-2xl font-bold text-orange-400 mb-1">75%</div>
                  <div className="text-gray-400 text-sm">100,000+ BLAZE</div>
                  <div className="text-orange-400 text-xs mt-1">VIP Status</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Security & Audits */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">8. Security & Audits</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-8">
              Security is paramount in the BLAZE ecosystem. We employ multiple layers 
              of protection and undergo rigorous third-party audits to ensure user funds 
              and data remain secure.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4 text-green-400">Smart Contract Security</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>OpenZeppelin:</strong> Battle-tested contracts</li>
                  <li>• <strong>ReentrancyGuard:</strong> Attack prevention</li>
                  <li>• <strong>Pausable:</strong> Emergency controls</li>
                  <li>• <strong>Access Control:</strong> Role-based permissions</li>
                  <li>• <strong>Formal Verification:</strong> Mathematical proofs</li>
                </ul>
              </div>
              
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Wallet Security</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Non-custodial:</strong> User controls keys</li>
                  <li>• <strong>Biometric Auth:</strong> WebAuthn support</li>
                  <li>• <strong>Hardware Keys:</strong> FIDO2 compatible</li>
                  <li>• <strong>Encrypted Storage:</strong> AES-256 encryption</li>
                  <li>• <strong>Local Processing:</strong> No server dependencies</li>
                </ul>
              </div>
            </div>

            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">Audit Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="font-bold mb-2">CertiK Audit</h4>
                  <p className="text-gray-400 text-sm">Security audit completed with no critical issues found</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-blue-400" />
                  </div>
                  <h4 className="font-bold mb-2">Test Coverage</h4>
                  <p className="text-gray-400 text-sm">100% test coverage with 39/39 tests passing</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="font-bold mb-2">Bug Bounty</h4>
                  <p className="text-gray-400 text-sm">Ongoing bug bounty program with rewards up to $50,000</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Roadmap & Milestones */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">9. Roadmap & Milestones</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-8">
              BLAZE's development roadmap is structured to deliver value incrementally 
              while building toward a comprehensive DeFi ecosystem.
            </p>
            
            <div className="space-y-8">
              <div className="card-glass p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Q4 2024 - Foundation (Completed)</h3>
                    <p className="text-gray-400 text-sm">Core infrastructure and security</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm ml-16">
                  <li>• Smart contracts development (39/39 tests passed)</li>
                  <li>• Security architecture & ReentrancyGuard</li>
                  <li>• Multi-chain wallet (18 blockchain networks)</li>
                  <li>• Advanced staking system (8-20% APY)</li>
                  <li>• Testnet deployment & verification</li>
                </ul>
              </div>

              <div className="card-glass p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Q1 2025 - AI Integration (Completed)</h3>
                    <p className="text-gray-400 text-sm">Revolutionary AI features</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm ml-16">
                  <li>• 5 AI features geïmplementeerd</li>
                  <li>• Biometric authentication (WebAuthn)</li>
                  <li>• NFT marketplace & minting</li>
                  <li>• Governance DAO system</li>
                  <li>• Launchpad platform</li>
                </ul>
              </div>

              <div className="card-glass p-6 border-l-4 border-orange-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Q2 2025 - Presale & Mainnet (Active)</h3>
                    <p className="text-gray-400 text-sm">Public launch and ecosystem growth</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm ml-16">
                  <li>• Public presale launch (LIVE)</li>
                  <li>• Mainnet deployment (BSC)</li>
                  <li>• DEX listings (PancakeSwap, Uniswap)</li>
                  <li>• CertiK audit completion</li>
                  <li>• Marketing campaign start</li>
                </ul>
              </div>

              <div className="card-glass p-6 border-l-4 border-blue-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Q3 2025 - Exchange Listings</h3>
                    <p className="text-gray-400 text-sm">Market expansion and accessibility</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm ml-16">
                  <li>• Gate.io listing</li>
                  <li>• MEXC listing</li>
                  <li>• KuCoin application</li>
                  <li>• CoinGecko & CMC tracking</li>
                  <li>• 10,000+ holders target</li>
                </ul>
              </div>

              <div className="card-glass p-6 border-l-4 border-purple-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Coins className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Q4 2025 - Ecosystem Expansion</h3>
                    <p className="text-gray-400 text-sm">Advanced features and integrations</p>
                  </div>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm ml-16">
                  <li>• Cross-chain bridges</li>
                  <li>• Fiat on/off ramps (MoonPay)</li>
                  <li>• Mobile apps (iOS/Android)</li>
                  <li>• Hardware wallet support</li>
                  <li>• 50,000+ users milestone</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Team & Governance */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">10. Team & Governance</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-8">
              BLAZE is built by a dedicated team of crypto enthusiasts and blockchain 
              experts, with governance transitioning to a decentralized autonomous organization (DAO).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card-glass p-6 text-center">
                <div className="w-16 h-16 bg-gradient-blaze rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Founder</h3>
                <p className="text-orange-400 text-sm font-medium mb-3">Founder & CEO</p>
                <p className="text-gray-400 text-sm">Crypto entrepreneur met 5+ jaar ervaring in DeFi</p>
              </div>
              
              <div className="card-glass p-6 text-center">
                <div className="w-16 h-16 bg-gradient-blaze rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Core Team</h3>
                <p className="text-orange-400 text-sm font-medium mb-3">Development</p>
                <p className="text-gray-400 text-sm">Full-stack developers gespecialiseerd in blockchain</p>
              </div>
              
              <div className="card-glass p-6 text-center">
                <div className="w-16 h-16 bg-gradient-blaze rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-orange-400 text-sm font-medium mb-3">Advisors</p>
                <p className="text-gray-400 text-sm">Ervaren crypto advisors en marketing experts</p>
              </div>
            </div>

            <div className="card-glass p-8">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">DAO Governance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Voting System:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>1 Token = 1 Vote:</strong> Democratic participation</li>
                    <li>• <strong>Proposal System:</strong> Community-driven decisions</li>
                    <li>• <strong>Quorum Requirements:</strong> Minimum participation thresholds</li>
                    <li>• <strong>Execution Delays:</strong> Time-locked implementations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Governance Areas:</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• <strong>Protocol Upgrades:</strong> Technical improvements</li>
                    <li>• <strong>Treasury Management:</strong> Fund allocation</li>
                    <li>• <strong>Feature Development:</strong> New functionality</li>
                    <li>• <strong>Partnership Decisions:</strong> Strategic alliances</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Legal & Compliance */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">11. Legal & Compliance</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="mb-8">
              BLAZE operates in compliance with applicable laws and regulations, 
              with a commitment to transparency and user protection.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4 text-green-400">Regulatory Compliance</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>KYC/AML:</strong> Identity verification for fiat services</li>
                  <li>• <strong>Data Protection:</strong> GDPR compliance</li>
                  <li>• <strong>Tax Reporting:</strong> Transaction history export</li>
                  <li>• <strong>Licensing:</strong> Appropriate jurisdiction compliance</li>
                </ul>
              </div>
              
              <div className="card-glass p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-400">User Protection</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• <strong>Terms of Service:</strong> Clear usage guidelines</li>
                  <li>• <strong>Privacy Policy:</strong> Data handling transparency</li>
                  <li>• <strong>Dispute Resolution:</strong> Fair conflict resolution</li>
                  <li>• <strong>Insurance:</strong> Smart contract coverage</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Conclusion */}
        <motion.section
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">12. Conclusion</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-6">
              BLAZE Wallet represents the next evolution in cryptocurrency management, 
              combining cutting-edge AI technology with robust security and user-centric design.
            </p>
            <p className="mb-6">
              With five revolutionary AI features, comprehensive DeFi functionality, and 
              a commitment to security and transparency, BLAZE is positioned to become 
              the leading intelligent crypto wallet in the market.
            </p>
            <div className="card-glass p-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
              <h3 className="text-2xl font-bold mb-4 text-center">Join the BLAZE Revolution</h3>
              <p className="text-center text-gray-300 mb-6">
                Experience the future of cryptocurrency with the most intelligent wallet ever created.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="https://my.blazewallet.io"
                  className="px-8 py-4 bg-gradient-blaze rounded-xl font-bold text-lg hover:scale-105 transition-transform text-center"
                >
                  Try BLAZE Wallet
                </Link>
                <Link 
                  href="/"
                  className="px-8 py-4 card-glass rounded-xl font-bold text-lg hover:bg-white/10 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.div
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-center py-8 border-t border-slate-800"
        >
          <p className="text-gray-500 text-sm">
            © 2024 BLAZE Wallet. All rights reserved. | 
            <Link href="/" className="text-orange-400 hover:text-orange-300 ml-1">blazewallet.io</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
