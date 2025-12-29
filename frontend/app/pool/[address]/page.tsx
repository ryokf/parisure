'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import BuyPolicyTab from '@/components/pool/BuyPolicyTab';
import MyDashboardTab from '@/components/pool/MyDashboardTab';
import GovernanceTab from '@/components/pool/GovernanceTab';
import {
    mockMember,
    mockClaims,
} from '@/lib/mockData';
import { formatAddress } from '@/services/formatting/formatters';
import { useAccount, useReadContract } from 'wagmi';
import { parisurePoolAbi } from '@/constant/abi';

export default function PoolDetail() {
    const params = useParams();
    const address = params.address as `0x${string}`;

    const [isOwner, setIsOwner] = useState(false);

    const { data: pool, isLoading } = useReadContract({
        address: address as `0x${string}`,
        abi: parisurePoolAbi,
        functionName: "getPoolDetail"
    })

    const { address: userAddress, isConnected } = useAccount()

    useEffect(() => {
        const checkIsOwner = () => {
            if (isConnected && pool && userAddress == pool[3]) {
                setIsOwner(true)
            } else {
                setIsOwner(false)
            }
        }

        checkIsOwner()
    }, [pool, isConnected, userAddress])

    console.log(pool)

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-md w-full text-center" hover={false}>
                    <h2 className="text-2xl font-bold mb-4">Loading...</h2>
                </Card>
            </div>
        )
    }

    if (!pool) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-md w-full text-center" hover={false}>
                    <h2 className="text-2xl font-bold mb-4">Pool Not Found</h2>
                    <p className="text-gray-400 mb-6">The pool address you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/">
                        <Button variant="primary">Back to Home</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const handleJoinPool = (policyId: number) => {
        alert(`Joining pool with policy ${policyId}. This will trigger Web3 integration.`);
    };

    const handleSubmitClaim = (description: string, photoUrl: string) => {
        alert(`Claim submitted!\nDescription: ${description}\nPhoto URL: ${photoUrl}`);
    };

    const handleVote = (claimId: number, vote: boolean) => {
        alert(`Voted ${vote ? 'YES' : 'NO'} for claim #${claimId}`);
    };

    // Tab A: Buy Policy
    const buyPolicyTab = (
        <BuyPolicyTab
            poolAddress={address}
            onJoinPool={handleJoinPool}
        />
    );

    // Tab B: My Dashboard
    const myDashboardTab = (
        <MyDashboardTab
            isMember={isOwner}
            member={mockMember}
            onSubmitClaim={handleSubmitClaim}
        />
    );

    // Tab C: Governance
    const governanceTab = (
        <GovernanceTab
            claims={mockClaims}
            onVoteYes={(claimId) => handleVote(claimId, true)}
            onVoteNo={(claimId) => handleVote(claimId, false)}
        />
    );

    const tabs = [
        { id: 'buy', label: 'Buy Policy', content: buyPolicyTab },
        { id: 'dashboard', label: 'My Dashboard', content: myDashboardTab },
        { id: 'governance', label: 'Governance', content: governanceTab },
    ];

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="container max-w-6xl">
                {/* Header */}
                <div className="mb-16 animate-slide-up">
                    <Link href="/" className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Pools
                    </Link>

                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{pool[0]}</h1>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div>
                                    <span className="text-gray-400">Owner: </span>
                                    <span className="text-purple-400 font-mono">{formatAddress(pool[3])}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Pool: </span>
                                    <span className="text-cyan-400 font-mono">{formatAddress(address)}</span>
                                </div>
                            </div>
                        </div>

                        {isOwner &&
                            <Link href={`/pool/${address}/admin`}>
                                <Button variant="outline">
                                    Admin Panel
                                </Button>
                            </Link>}
                    </div>
                </div>

                {/* Tabs */}
                <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <Tabs tabs={tabs} />
                </div>
            </div>
        </div>
    );
}
