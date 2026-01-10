import React, { useState } from 'react'
import Card from '../ui/Card'
import { useReadContract } from 'wagmi'
import { parisurePoolAbi } from '@/constant/abi'
import Button from '../ui/Button'
import { formatDuration } from '@/services/formatting/formatters'
import { formatEther } from 'viem'
import BuyPolicyConfirmModal from './BuyPolicyConfirmModal'

const PolicyCard = ({ index, poolAddress }: { index: number, poolAddress: `0x${string}` }) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const { data: policy, isLoading } = useReadContract({
        address: poolAddress,
        abi: parisurePoolAbi,
        functionName: "getPolicyDetail",
        args: [BigInt(index)]
    })

    const handleJoinClick = () => {
        setIsConfirmModalOpen(true);
    };

    const handleConfirmPurchase = () => {
        // TODO: Implement actual purchase logic here
        console.log('Purchase confirmed for policy:', policy?.name);
        setIsConfirmModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsConfirmModalOpen(false);
    };

    console.log(policy)

    if (isLoading || !policy) {
        return (
            <Card className="h-full border-2 border-white/5 animate-pulse">
                <div className="h-12 w-12 bg-white/10 rounded-xl mb-4"></div>
                <div className="h-6 w-3/4 bg-white/10 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-white/10 rounded"></div>
            </Card>
        );
    }

    return (
        <>
            <Card key={index} className="flex flex-col">
                <div className="grow">
                    <div className="flex items-start justify-between mb-4">
                        <h4 className="text-xl font-bold">{policy.name}</h4>
                        {policy.isActive && (
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                                Active
                            </span>
                        )}
                    </div>

                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-sm text-gray-400">Duration</p>
                                <p className="font-semibold">{formatDuration(Number(policy.duration))}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-sm text-gray-400">Price</p>
                                <p className="font-semibold">{formatEther(policy.price)} ETH</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleJoinClick}
                    disabled={!policy.isActive}
                >
                    {policy.isActive ? 'Join Pool' : 'Inactive'}
                </Button>

            </Card>
            <BuyPolicyConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseModal}
                policy={policy}
                poolAddress={poolAddress}
                policyIndex={index}
            />
        </>
    )
}

export default PolicyCard