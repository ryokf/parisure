'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import PoolStats from '@/components/pool/PoolStats';
import PoolInfo from '@/components/pool/PoolInfo';
import CreatePolicyForm from '@/components/pool/CreatePolicyForm';
import { getPoolByAddress } from '@/lib/mockData';

export default function AdminPage() {
    const params = useParams();
    const address = params.address as string;

    const pool = getPoolByAddress(address);
    const [isOwner] = useState(true); // Mock owner check

    const handleCreatePolicy = async (formData: any) => {
        alert(`Policy created!\nName: ${formData.name}\nDuration: ${formData.duration} days\nPrice: ${formData.price} ETH`);
    };

    if (!pool) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-md w-full text-center" hover={false}>
                    <h2 className="text-2xl font-bold mb-4">Pool Not Found</h2>
                    <Link href="/">
                        <Button variant="primary">Back to Home</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (!isOwner) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-md w-full text-center" hover={false}>
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                    <p className="text-gray-400 mb-6">
                        Only the pool owner can access this page
                    </p>
                    <Link href={`/pool/${address}`}>
                        <Button variant="primary">Back to Pool</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="container max-w-4xl">
                {/* Header */}
                <div className="mb-16 animate-slide-up">
                    <Link
                        href={`/pool/${address}`}
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Pool
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold">Admin Panel</h1>
                            <p className="text-gray-400">{pool.name}</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Pool Statistics */}
                    <PoolStats
                        balance="12.5 ETH"
                        totalMembers={47}
                        activePolicies={3}
                        totalClaims={8}
                    />

                    {/* Pool Info */}
                    <PoolInfo
                        owner={pool.owner}
                        poolAddress={pool.poolAddress}
                        solvencyStatus="Solvent"
                    />
                </div>

                {/* Add Policy Form */}
                <CreatePolicyForm
                    poolName={pool.name}
                    onSubmit={handleCreatePolicy}
                />
            </div>
        </div>
    );
}
