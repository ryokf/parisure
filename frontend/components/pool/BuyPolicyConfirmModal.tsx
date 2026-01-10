import React, { useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { formatEther } from 'viem';
import { formatDuration } from '@/services/formatting/formatters';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { parisurePoolAbi } from '@/constant/abi';

interface Policy {
    name: string;
    duration: bigint;
    price: bigint;
    isActive: boolean;
}

interface BuyPolicyConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    policy: Policy | null;
    poolAddress: `0x${string}`
    policyIndex: number
}

export default function BuyPolicyConfirmModal({
    isOpen,
    onClose,
    policy,
    poolAddress,
    policyIndex
}: Readonly<BuyPolicyConfirmModalProps>) {
    // if (!policy) return null;

    const { data: hash, isPending, writeContract, error: writeError } = useWriteContract()

    const { isSuccess, error: receiptError } = useWaitForTransactionReceipt({ hash })

    useEffect(() => {
        if (isSuccess) {
            onClose()
        }
    }, [isSuccess, onClose])

    const onConfirm = (e: React.FormEvent) => {
        e.preventDefault()

        writeContract({
            address: poolAddress,
            abi: parisurePoolAbi,
            functionName: "memberJoinPool",
            args: [BigInt(policyIndex)],
            value: policy?.price
        })
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold mb-2">Confirm Policy Purchase</h3>
                        <p className="text-gray-400 text-sm">
                            Please review the policy details before confirming your purchase
                        </p>
                    </div>

                    {/* Policy Details */}
                    <div className="bg-white/5 rounded-xl p-4 mb-6 space-y-4">
                        <div>
                            <p className="text-sm text-gray-400 mb-1">Policy Name</p>
                            <p className="font-semibold text-lg">{policy?.name}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Duration</p>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="font-semibold">{formatDuration(Number(policy?.duration))}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400 mb-1">Price</p>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {
                                        policy?.price ? (
                                            <p className="font-semibold text-cyan-400">{formatEther(policy?.price)} ETH</p>
                                        ) : (
                                            <p className="font-semibold text-cyan-400">Loading...</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Warning Notice */}
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <p className="text-yellow-400 font-semibold text-sm mb-1">Important Notice</p>
                                <p className="text-gray-300 text-sm">
                                    By confirming, you will join this insurance pool and the payment will be processed through your connected wallet.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1"
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={onConfirm}
                            className="flex-1"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <div className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </div>
                            ) : (
                                'Confirm Purchase'
                            )}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Success Modal */}
            <Modal isOpen={isSuccess} onClose={onClose}>
                <div className="p-8 text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
                        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Success Message */}
                    <h3 className="text-2xl font-bold mb-3">Policy Purchase Successful!</h3>
                    <p className="text-gray-400 mb-6">
                        You have successfully joined the pool with <span className="text-purple-400 font-semibold">{policy?.name}</span> policy.
                    </p>

                    {/* Transaction Info */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-300">
                            Your transaction has been confirmed on the blockchain.
                        </p>
                    </div>

                    {/* Action Button */}
                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={onClose}
                    >
                        Close
                    </Button>
                </div>
            </Modal>

            {/* Error Modal */}
            <Modal isOpen={!!(writeError || receiptError)} onClose={onClose}>
                <div className="p-8 text-center">
                    {/* Error Icon */}
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
                        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    {/* Error Message */}
                    <h3 className="text-2xl font-bold mb-3">Transaction Failed</h3>
                    <p className="text-gray-400 mb-6">
                        Unfortunately, your policy purchase could not be completed.
                    </p>

                    {/* Error Details */}
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-left">
                        <p className="text-sm text-gray-300 font-semibold mb-2">Error Details:</p>
                        <p className="text-sm text-gray-400 break-words">
                            {writeError?.message || receiptError?.message || 'An unknown error occurred'}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            className="flex-1"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            className="flex-1"
                            onClick={() => {
                                // Reset errors and try again
                                onClose();
                            }}
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
