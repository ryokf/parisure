'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';
import Countdown from '@/components/ui/Countdown';
import {
    getPoolByAddress,
    getPoliciesForPool,
    mockMember,
    mockClaims,
} from '@/lib/mockData';
import { formatDuration, formatAddress } from '@/services/formatting/formatters';
import { ClaimStatus } from '@/lib/types';

export default function PoolDetail() {
    const params = useParams();
    const address = params.address as string;

    const pool = getPoolByAddress(address);
    const policies = getPoliciesForPool(address);

    const [isMember] = useState(true); // Mock member status
    const [claimDescription, setClaimDescription] = useState('');
    const [claimPhotoUrl, setClaimPhotoUrl] = useState('');

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

    const handleSubmitClaim = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Claim submitted!\nDescription: ${claimDescription}\nPhoto URL: ${claimPhotoUrl}`);
        setClaimDescription('');
        setClaimPhotoUrl('');
    };

    const handleVote = (claimId: number, vote: boolean) => {
        alert(`Voted ${vote ? 'YES' : 'NO'} for claim #${claimId}`);
    };

    // Tab A: Buy Policy
    const buyPolicyTab = (
        <div className="space-y-8">
            <div className="mb-10 text-center">
                <h3 className="text-2xl font-bold mb-2">Available Policies</h3>
                <p className="text-gray-400">Choose a policy that fits your needs and join the pool</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {policies.map((policy, index) => (
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
                                        <p className="font-semibold">{formatDuration(policy.duration)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm text-gray-400">Price</p>
                                        <p className="font-semibold">{policy.price} ETH</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            className="w-full"
                            onClick={() => handleJoinPool(index)}
                            disabled={!policy.isActive}
                        >
                            {policy.isActive ? 'Join Pool' : 'Inactive'}
                        </Button>
                    </Card>
                ))}
            </div>

            {policies.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400">No policies available yet. Check back later!</p>
                </div>
            )}
        </div>
    );

    // Tab B: My Dashboard
    const myDashboardTab = (
        <div className="space-y-8">
            {isMember ? (
                <>
                    {/* Member Status */}
                    <Card hover={false}>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold">Membership Status</h3>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${mockMember.isActive
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                                }`}>
                                {mockMember.isActive ? 'Active' : 'Expired'}
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Joined Date</p>
                                <p className="font-semibold">
                                    {new Date(mockMember.joinedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Expiration Date</p>
                                <p className="font-semibold">
                                    {new Date(mockMember.expiredDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="bg-purple-500/10 rounded-xl p-8">
                            <p className="text-sm text-gray-400 mb-4 text-center">Time Until Expiration</p>
                            <Countdown targetDate={mockMember.expiredDate} />
                        </div>
                    </Card>

                    {/* Submit Claim Form */}
                    <Card hover={false}>
                        <h3 className="text-2xl font-bold mb-8">Submit a Claim</h3>
                        <form onSubmit={handleSubmitClaim} className="space-y-6">
                            <Input
                                label="Description"
                                isTextarea
                                placeholder="Describe the incident in detail..."
                                value={claimDescription}
                                onChange={(e) => setClaimDescription(e.target.value)}
                                required
                            />

                            <Input
                                label="Photo Evidence URL (IPFS)"
                                type="url"
                                placeholder="https://ipfs.io/ipfs/..."
                                value={claimPhotoUrl}
                                onChange={(e) => setClaimPhotoUrl(e.target.value)}
                                required
                            />

                            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                                <p className="text-sm text-yellow-400">
                                    <strong>Note:</strong> Upload your evidence photo to IPFS first, then paste the URL here.
                                </p>
                            </div>

                            <Button type="submit" variant="success" className="w-full">
                                Submit Claim
                            </Button>
                        </form>
                    </Card>
                </>
            ) : (
                <Card hover={false} className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Not a Member</h3>
                    <p className="text-gray-400 mb-6">
                        You need to join this pool first to access your dashboard
                    </p>
                    <Button variant="primary" onClick={() => alert('Switch to Buy Policy tab')}>
                        View Available Policies
                    </Button>
                </Card>
            )}
        </div>
    );

    // Tab C: Governance
    const governanceTab = (
        <div className="space-y-8">
            <div className="mb-10 text-center">
                <h3 className="text-2xl font-bold mb-2">Claims Governance</h3>
                <p className="text-gray-400">Vote on pending claims to help the community make fair decisions</p>
            </div>

            {/* Pending Claims */}
            <div>
                <h4 className="text-xl font-semibold mb-6">Pending Claims</h4>
                <div className="space-y-6">
                    {mockClaims
                        .filter(claim => claim.status === ClaimStatus.Pending)
                        .map(claim => {
                            const totalVotes = claim.voteYes + claim.voteNo;
                            const yesPercentage = totalVotes > 0 ? (claim.voteYes / totalVotes) * 100 : 0;
                            const noPercentage = totalVotes > 0 ? (claim.voteNo / totalVotes) * 100 : 0;

                            return (
                                <Card key={claim.id} hover={false}>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* Photo */}
                                        <div className="md:w-48 h-48 rounded-xl overflow-hidden bg-white/5 shrink-0">
                                            <img
                                                src={claim.photoUrl}
                                                alt="Claim evidence"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="grow">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <p className="text-sm text-gray-400 mb-1">Claim #{claim.id}</p>
                                                    <p className="text-sm text-purple-400 font-mono">
                                                        {formatAddress(claim.claimant)}
                                                    </p>
                                                </div>
                                                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                                                    Pending
                                                </span>
                                            </div>

                                            <p className="text-gray-300 mb-4">{claim.description}</p>

                                            {/* Vote Progress */}
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-green-400">Yes: {claim.voteYes}</span>
                                                    <span className="text-red-400">No: {claim.voteNo}</span>
                                                </div>
                                                <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
                                                    <div
                                                        className="bg-green-500"
                                                        style={{ width: `${yesPercentage}%` }}
                                                    />
                                                    <div
                                                        className="bg-red-500"
                                                        style={{ width: `${noPercentage}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Vote Buttons */}
                                            <div className="flex gap-3">
                                                <Button
                                                    variant="success"
                                                    className="flex-1"
                                                    onClick={() => handleVote(claim.id, true)}
                                                >
                                                    Vote Yes
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    className="flex-1"
                                                    onClick={() => handleVote(claim.id, false)}
                                                >
                                                    Vote No
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                </div>
            </div>

            {/* Claim History */}
            <div>
                <h4 className="text-xl font-semibold mb-6 mt-12">Claim History</h4>
                <div className="space-y-6">
                    {mockClaims
                        .filter(claim => claim.status !== ClaimStatus.Pending)
                        .map(claim => (
                            <Card key={claim.id} hover={false} className="opacity-75">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Claim #{claim.id}</p>
                                        <p className="text-sm text-purple-400 font-mono mb-2">
                                            {formatAddress(claim.claimant)}
                                        </p>
                                        <p className="text-gray-300">{claim.description}</p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${claim.status === ClaimStatus.Accept
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-red-500/20 text-red-400'
                                        }`}>
                                        {claim.status === ClaimStatus.Accept ? 'Accepted' : 'Rejected'}
                                    </span>
                                </div>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
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
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{pool.name}</h1>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div>
                                    <span className="text-gray-400">Owner: </span>
                                    <span className="text-purple-400 font-mono">{formatAddress(pool.owner)}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Pool: </span>
                                    <span className="text-cyan-400 font-mono">{formatAddress(pool.poolAddress)}</span>
                                </div>
                            </div>
                        </div>

                        <Link href={`/pool/${address}/admin`}>
                            <Button variant="outline">
                                Admin Panel
                            </Button>
                        </Link>
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
