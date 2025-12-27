import React from 'react';
import Link from 'next/link';
import { usePoolByIndex } from '@/hooks/usePoolFactory';
import Card from '@/components/ui/Card';
import { formatAddress } from '@/services/formatting/formatters';

interface PoolCardProps {
    index: number;
}

export default function PoolCard({ index }: PoolCardProps) {
    const { data: pool, isLoading } = usePoolByIndex(index);

    if (isLoading || !pool) {
        return (
            <Card className="h-full border-2 border-white/5 animate-pulse">
                <div className="h-12 w-12 bg-white/10 rounded-xl mb-4"></div>
                <div className="h-6 w-3/4 bg-white/10 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-white/10 rounded"></div>
            </Card>
        );
    }

    const [poolAddress, owner, name] = pool;

    return (
        <Link href={`/pool/${poolAddress}`}>
            <Card className="animate-slide-up h-full glass-effect-strong border-2 border-purple-500/20 hover:border-purple-400/60 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] group">
                <div className="flex flex-col h-full">
                    {/* Status Badge & Icon */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40">
                            <span className="text-xs font-semibold text-green-400">Active</span>
                        </div>
                    </div>

                    {/* Pool Info */}
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                        {name}
                    </h3>

                    <div className="space-y-3 text-sm grow">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Owner:</span>
                            <span className="text-purple-400 font-mono font-semibold">
                                {formatAddress(owner)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Pool Address:</span>
                            <span className="text-cyan-400 font-mono font-semibold">
                                {formatAddress(poolAddress)}
                            </span>
                        </div>
                    </div>

                    {/* View Details Button */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="text-purple-400 font-semibold flex items-center justify-between group-hover:text-purple-300 transition-colors">
                            <span>View Details</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
