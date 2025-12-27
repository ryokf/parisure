import { poolFactoryAbi } from '@/constant/abi'
import contract_address from '@/constant/contract_address'
import React from 'react'
import { useReadContract } from 'wagmi'
import Card from './Card'
import Link  from 'next/link';

const PoolCardItem = ({ index }: { index: number }) => {
    const { data: pool, isLoading } = useReadContract({
        address: contract_address,
        abi: poolFactoryAbi,
        functionName: "poolList",
        args: [BigInt(index)]
    })

    if (isLoading || !pool) {
        return (
            <Card className="h-full border-2 border-white/5 animate-pulse">
                <div className="h-12 w-12 bg-white/10 rounded-xl mb-4"></div>
                <div className="h-6 w-3/4 bg-white/10 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-white/10 rounded"></div>
            </Card>
        );
    }

    const [poolAddress, owner, name] = pool

    return (
        <Link href={`/pool/${poolAddress}`}>
            <Card className="animate-slide-up h-full border-2 border-purple-500/30 hover:border-purple-400 transition-colors">
                <div className="flex flex-col h-full">
                    {/* Pool Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>

                    {/* Pool Info */}
                    <h3 className="text-xl font-bold mb-3 text-white">
                        {name}
                    </h3>

                    <div className="space-y-2 text-sm grow">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Owner:</span>
                            <span className="text-purple-400 font-mono">
                                {/* Format Address: 0x123...abc */}
                                {owner.substring(0, 6)}...{owner.substring(owner.length - 4)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Pool Address:</span>
                            <span className="text-cyan-400 font-mono">
                                {poolAddress.substring(0, 6)}...{poolAddress.substring(poolAddress.length - 4)}
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
    )
}

export default PoolCardItem