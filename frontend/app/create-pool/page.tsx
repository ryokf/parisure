'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useCreatePool } from '@/hooks/usePoolFactory';
import { useForm } from '@/hooks/useForm';

interface CreatePoolFormData {
    name: string;
    waitingPeriod: number;
    maxCoverage: number;
    [key: string]: string | number;
}

export default function CreatePool() {
    const { createPool, isPending, isConfirming, isConfirmed, newPoolAddress } = useCreatePool();

    const { values, handleChange, handleSubmit } = useForm<CreatePoolFormData>({
        initialValues: {
            name: '',
            waitingPeriod: 0,
            maxCoverage: 0,
        },
        onSubmit: async (formData) => {
            createPool(formData.name, formData.waitingPeriod, formData.maxCoverage);
        },
    });

    // Success state - pool created
    if (isConfirmed && newPoolAddress) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-2xl w-full text-center" hover={false}>
                    <div className="mb-6">
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-green-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Pool Created Successfully!</h2>
                        <p className="text-gray-400 mb-6">
                            Your insurance pool has been deployed to the blockchain
                        </p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-400 mb-2">Pool Address:</p>
                        <p className="text-purple-400 font-mono break-all">{newPoolAddress}</p>
                    </div>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href={`/pool/${newPoolAddress}`}>
                            <Button variant="primary">View Pool</Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline">Back to Home</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="container max-w-2xl">
                {/* Header */}
                <div className="mb-16 animate-slide-up">
                    <Link href="/" className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Create Insurance Pool
                    </h1>
                    <p className="text-gray-400">
                        Set up a new decentralized insurance pool and become a pool creator
                    </p>
                </div>

                {/* Form */}
                <Card hover={false} className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <Input
                            label="Pool Name"
                            name="name"
                            type="text"
                            placeholder="e.g., Health Insurance Pool"
                            value={values.name}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Waiting Period (days)"
                            name="waitingPeriod"
                            type="number"
                            placeholder="e.g., 7"
                            value={values.waitingPeriod}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Max Coverage Amount (ETH)"
                            name="maxCoverage"
                            type="number"
                            step="0.01"
                            placeholder="e.g., 1.5"
                            value={values.maxCoverage}
                            onChange={handleChange}
                            required
                        />

                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Important Information
                            </h3>
                            <ul className="text-sm text-gray-400 space-y-1">
                                <li>• You will become the owner of this pool</li>
                                <li>• You can create policies and manage the pool</li>
                                <li>• Waiting period is the time before claims can be submitted</li>
                                <li>• Max coverage is the maximum payout per claim</li>
                            </ul>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            isLoading={isPending || isConfirming}
                        >
                            {isPending
                                ? 'Check Wallet...'
                                : isConfirming
                                    ? 'Confirming Transaction...'
                                    : 'Create Pool'
                            }
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
