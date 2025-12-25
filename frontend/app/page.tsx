import Link from 'next/link';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { mockPools, formatAddress } from '@/lib/mockData';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>

        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="gradient-text">Parisure</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Decentralized Insurance Platform
            </p>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Join the future of insurance with transparent, community-driven coverage pools.
              Create your own insurance pool or join existing ones with complete transparency and governance.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <ConnectButton />
              <Link href="/create-pool">
                <Button variant="secondary">
                  Create Pool
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pool List Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Explore Insurance Pools
            </h2>
            <p className="text-gray-400">
              Browse and join available insurance pools created by the community
            </p>
          </div>

          {/* Pool Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPools.map((pool, index) => (
              <Link href={`/pool/${pool.poolAddress}`} key={pool.poolAddress}>
                <Card
                  className="animate-slide-up h-full border-2 border-purple-500/30"
                  style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
                >
                  <div className="flex flex-col h-full">
                    {/* Pool Icon */}
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>

                    {/* Pool Info */}
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {pool.name}
                    </h3>

                    <div className="space-y-2 text-sm grow">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Owner:</span>
                        <span className="text-purple-400 font-mono">
                          {formatAddress(pool.owner)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pool Address:</span>
                        <span className="text-cyan-400 font-mono">
                          {formatAddress(pool.poolAddress)}
                        </span>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="text-purple-400 font-semibold flex items-center justify-between group">
                        <span>View Details</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {mockPools.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">No insurance pools available yet</div>
              <Link href="/create-pool">
                <Button variant="primary">
                  Create the First Pool
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/5 mt-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Decentralized</h3>
              <p className="text-gray-400">No central authority. Community-governed insurance pools.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-pink-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent</h3>
              <p className="text-gray-400">All claims and votes are visible on the blockchain.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-cyan-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fair Payouts</h3>
              <p className="text-gray-400">Democratic voting ensures fair claim approvals.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

