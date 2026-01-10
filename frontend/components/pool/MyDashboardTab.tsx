import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import MembershipStatus from './MembershipStatus';
import ClaimForm from './ClaimForm';
import { Member } from '@/lib/types';
import { useAccount, useReadContract } from 'wagmi';
import { parisurePoolAbi } from '@/constant/abi';

interface MyDashboardTabProps {
    onSubmitClaim: (description: string, photoUrl: string) => void;
    poolAddress: `0x${string}`
}

export default function MyDashboardTab({ onSubmitClaim, poolAddress }: MyDashboardTabProps) {

    const { address: userAddress, isConnected } = useAccount()
    const [memberData, setMemberData] = useState([
        false, 0, 0, 0
    ])

    const { data: member, isLoading } = useReadContract({
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


    console.log(memberData)
    console.log(userAddress)
    console.log(memberData)

    if (!memberData[0]) {
        return (
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
        );
    }

    return (
        <div className="space-y-8">
            <MembershipStatus member= {{
                    isActive: Boolean(memberData[0]),
                    joinedAt: new Date(Number(memberData[1]) * 1000).toISOString(),
                    expiredDate: new Date(Number(memberData[2]) * 1000).toISOString(),
                    targetDate: Number(memberData[2]) * 1000

                }} 
            />
            <ClaimForm onSubmit={onSubmitClaim} />
        </div>
    );
}
