'use client'

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { usePoolCount } from '@/hooks/usePoolFactory';
import PoolCard from '@/components/pool/PoolCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const { data: poolCount, isLoading } = usePoolCount();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Aurora Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-50"></div>

        {/* Aurora Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[120px] aurora-1"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-500 rounded-full blur-[100px] aurora-2"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-blue-500 rounded-full blur-[110px] aurora-3"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="container">
            <div className="text-center max-w-5xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-purple-500/30 mb-8 animate-slide-up">
                <span className="text-2xl">✨</span>
                <span className="text-sm font-semibold text-purple-300">The Future of Protection is Here</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Insurance needs{' '}
                <span className="gradient-text-hero">Trustless</span>
                {' '}&{' '}
                <span className="gradient-text-hero">Open</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Say goodbye to bureaucracy and hidden fees. Parisure brings transparent,
                community-driven insurance powered by blockchain technology.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center flex-wrap mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <Link href="/create-pool">
                  <Button variant="primary" className="px-8 py-4 text-lg font-semibold">
                    Create Pool
                  </Button>
                </Link>
                <Link href="#explore">
                  <Button variant="secondary" className="px-8 py-4 text-lg font-semibold">
                    Explore Market
                  </Button>
                </Link>
              </div>

              {/* Floating Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="glass-effect-strong rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <div className="text-4xl font-bold gradient-text mb-2">
                    {isLoading ? '...' : poolCount?.toString() || '0'}
                  </div>
                  <div className="text-gray-400 font-medium">Total Pools</div>
                </div>
                <div className="glass-effect-strong rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                  <div className="text-4xl font-bold gradient-text mb-2">100%</div>
                  <div className="text-gray-400 font-medium">Transparent</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="how-it-works" className="py-24 px-4">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose <span className="gradient-text">Parisure</span>?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience insurance the way it should be: fair, transparent, and community-driven
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="glass-effect-strong rounded-2xl p-8 border border-white/10 hover:border-purple-500/40 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Transparent Funds</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every penny is visible on the blockchain. No hidden reserves, no corporate black boxes.
                  Your money stays in smart contracts you can verify.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-effect-strong rounded-2xl p-8 border border-white/10 hover:border-pink-500/40 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-pink-500 to-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Community Governance</h3>
                <p className="text-gray-400 leading-relaxed">
                  Claims are decided by pool members, not executives in suits.
                  Democratic voting ensures fair treatment for everyone.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-effect-strong rounded-2xl p-8 border border-white/10 hover:border-cyan-500/40 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Instant Payouts</h3>
                <p className="text-gray-400 leading-relaxed">
                  No paperwork, no waiting weeks. Once approved, claims are paid instantly
                  via smart contracts. Automated, fast, and reliable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pool Marketplace Section */}
        <section id="explore" className="py-24 px-4">
          <div className="container">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Explore <span className="gradient-text">Pools</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Browse and join insurance pools created by the community
              </p>
            </div>

            {/* Pool Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {
                isLoading ? (
                  <div className="col-span-full text-center text-gray-500 py-12">
                    <div className="animate-pulse">Loading pools...</div>
                  </div>
                ) :
                  (
                    poolCount && Number(poolCount) > 0 && (
                      Array.from({ length: Number(poolCount) }).map((_, i) => (
                        <PoolCard key={i} index={i} />
                      ))
                    )
                  )
              }
            </div>

            {/* Empty State */}
            {!isLoading && (!poolCount || Number(poolCount) === 0) && (
              <div className="text-center py-20">
                <div className="glass-effect-strong rounded-3xl p-12 max-w-md mx-auto border border-white/10">
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">No Pools Yet</h3>
                  <p className="text-gray-400 mb-6">
                    Be the pioneer! Create the first insurance pool and start a revolution.
                  </p>
                  <Link href="/create-pool">
                    <Button variant="primary" className="px-8 py-3">
                      Create the First Pool
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Governance Section */}
        <section id="governance" className="py-24 px-4">
          <div className="container">
            <div className="glass-effect-strong rounded-3xl p-12 md:p-16 border border-purple-500/20 max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powered by <span className="gradient-text">Smart Contracts</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Every pool operates on Ethereum smart contracts, ensuring complete transparency,
                immutability, and trustless execution. No intermediaries, no manipulation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="px-6 py-3 rounded-full glass-effect border border-purple-500/30">
                  <span className="font-semibold text-purple-300">Decentralized</span>
                </div>
                <div className="px-6 py-3 rounded-full glass-effect border border-pink-500/30">
                  <span className="font-semibold text-pink-300">Trustless</span>
                </div>
                <div className="px-6 py-3 rounded-full glass-effect border border-cyan-500/30">
                  <span className="font-semibold text-cyan-300">Transparent</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

