import React, { useEffect, useState } from 'react';
import { useReadContract, usePublicClient } from 'wagmi';
import { parisurePoolAbi } from '@/constant/abi';
import Card from '../ui/Card';

interface MemberListTabProps {
    poolAddress: `0x${string}`;
}

export default function MemberListTab({ poolAddress }: MemberListTabProps) {
    const [memberAddresses, setMemberAddresses] = useState<string[]>([]);
    const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
    const publicClient = usePublicClient();

    useEffect(() => {
        const fetchMemberAddresses = async () => {
            if (!publicClient) return;

            setIsLoadingAddresses(true);
            try {
                // Get MemberJoined events to find all member addresses
                const logs = await publicClient.getLogs({
                    address: poolAddress,
                    event: {
                        type: 'event',
                        name: 'MemberJoined',
                        inputs: [
                            { name: 'emberAddress', type: 'address', indexed: false },
                            { name: 'policyId', type: 'uint256', indexed: false },
                            { name: 'timestamp', type: 'uint256', indexed: false }
                        ]
                    },
                    fromBlock: 'earliest',
                    toBlock: 'latest'
                });

                // Extract unique member addresses from events
                const addresses = logs.map((log) => {
                    const args = log.args as { emberAddress?: string };
                    return args.emberAddress || '';
                }).filter(addr => addr !== '');
                const uniqueAddresses = Array.from(new Set(addresses));

                setMemberAddresses(uniqueAddresses);
            } catch (error) {
                console.error('Error fetching member addresses:', error);
                setMemberAddresses([]);
            } finally {
                setIsLoadingAddresses(false);
            }
        };

        fetchMemberAddresses();
    }, [poolAddress, publicClient]);

    if (isLoadingAddresses) {
        return (
            <div className="space-y-6">
                <div className="mb-10 text-center">
                    <h3 className="text-2xl font-bold mb-2">Pool Members</h3>
                    <p className="text-gray-400">Loading member information...</p>
                </div>
                <div className="grid gap-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <div className="h-6 w-32 bg-white/10 rounded mb-3"></div>
                            <div className="h-4 w-48 bg-white/10 rounded mb-2"></div>
                            <div className="h-4 w-40 bg-white/10 rounded"></div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="mb-10 text-center">
                <h3 className="text-2xl font-bold mb-2">Pool Members</h3>
                <p className="text-gray-400">
                    {memberAddresses.length === 0
                        ? 'No members have joined this pool yet'
                        : `${memberAddresses.length} ${memberAddresses.length === 1 ? 'member' : 'members'} in this pool`
                    }
                </p>
            </div>

            {memberAddresses.length === 0 ? (
                <Card className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h4 className="text-xl font-semibold mb-2">No Members Yet</h4>
                    <p className="text-gray-400">Be the first to join this insurance pool!</p>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {memberAddresses.map((address, index) => (
                        <MemberCard
                            key={address}
                            poolAddress={poolAddress}
                            memberAddress={address as `0x${string}`}
                            memberIndex={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function MemberCard({
    poolAddress,
    memberAddress,
    memberIndex
}: {
    poolAddress: `0x${string}`,
    memberAddress: `0x${string}`,
    memberIndex: number
}) {
    const { data: memberData, isLoading } = useReadContract({
        address: poolAddress,
        abi: parisurePoolAbi,
        functionName: 's_members',
        args: [memberAddress]
    });

    const { data: policyData } = useReadContract({
        address: poolAddress,
        abi: parisurePoolAbi,
        functionName: 'getPolicyDetail',
        args: memberData ? [memberData[3]] : undefined,
        query: {
            enabled: !!memberData
        }
    });

    if (isLoading || !memberData) {
        return (
            <Card className="animate-pulse">
                <div className="h-6 w-32 bg-white/10 rounded mb-3"></div>
                <div className="h-4 w-48 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-40 bg-white/10 rounded"></div>
            </Card>
        );
    }

    const [isActive, joinedAt, expiredDate, policyId] = memberData;
    const now = BigInt(Math.floor(Date.now() / 1000));
    const isExpired = expiredDate < now;
    const actualStatus = isActive && !isExpired;

    // Format address to show first 6 and last 4 characters
    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <Card className="hover:border-purple-500/30 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-cyan-500 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Member #{memberIndex + 1}</p>
                        <p className="font-mono text-sm text-purple-400">{formatAddress(memberAddress)}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${actualStatus
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                    }`}>
                    {actualStatus ? 'Active' : 'Expired'}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-400 mb-1">Policy</p>
                    <p className="font-semibold">{policyData ? policyData[0] : 'Loading...'}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400 mb-1">Policy ID</p>
                    <p className="font-semibold">#{policyId.toString()}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400 mb-1">Joined</p>
                    <p className="font-semibold text-sm">
                        {new Date(Number(joinedAt) * 1000).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-400 mb-1">Expires</p>
                    <p className="font-semibold text-sm">
                        {new Date(Number(expiredDate) * 1000).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </p>
                </div>
            </div>

            {!isExpired && actualStatus && (
                <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-400">
                            {Math.ceil(Number(expiredDate - now) / 86400)} days remaining
                        </span>
                    </div>
                </div>
            )}
        </Card>
    );
}
