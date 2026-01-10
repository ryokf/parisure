import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDuration } from '@/services/formatting/formatters';
import { useAccount, useReadContract } from 'wagmi';
import { parisurePoolAbi } from '@/constant/abi';
import PolicyCard from './PolicyCard';

interface Policy {
    name: string;
    duration: number;
    price: number;
    isActive: boolean;
}

interface BuyPolicyTabProps {
    poolAddress: `0x${string}`
    onJoinPool: (policyId: number) => void;
}

export default function BuyPolicyTab({ poolAddress, onJoinPool }: BuyPolicyTabProps) {
    const { data: policyCount, isLoading } = useReadContract({
        address: poolAddress,
        abi: parisurePoolAbi,
        functionName: 'getPolicyCount'
    })

    console.log("policy count: " + policyCount)

    const { address: userAddress, isConnected } = useAccount()
    const [memberData, setMemberData] = useState([
        false, 0, 0, 0
    ])

    const { data: member } = useReadContract({
        address: poolAddress,
        abi: parisurePoolAbi,
        functionName: 's_members',
        args: [userAddress],
        query: {
            enabled: isConnected && !!userAddress
        }
    })

    useEffect(() => {
        if (member) {
            setMemberData(member)
        }
    }, [member])

    if(memberData[0]){
        return "y"
    }

    return (
        <div className="space-y-8">
            <div className="mb-10 text-center">
                <h3 className="text-2xl font-bold mb-2">Available Policies</h3>
                <p className="text-gray-400">Choose a policy that fits your needs and join the pool</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {Array.from({ length: Number(policyCount) }).map((_, index) => (
                    <PolicyCard key={index} index={index} poolAddress={poolAddress}></PolicyCard>
                ))}
            </div>

            {Number(policyCount) === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400">No policies available yet. Check back later!</p>
                </div>
            )}
        </div>
    );
}
