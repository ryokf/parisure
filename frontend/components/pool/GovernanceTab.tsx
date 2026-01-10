import React, { useEffect, useState } from 'react';
import PendingClaim from './PendingClaim';
import ClaimHistory from './ClaimHistory';
import { Claim, ClaimStatus } from '@/lib/types';
import { useReadContract } from 'wagmi';
import { parisurePoolAbi } from '@/constant/abi';

interface GovernanceTabProps {
    // claims: Claim[];
    onVoteYes: (claimId: number) => void;
    onVoteNo: (claimId: number) => void;
    poolAddress: `0x${string}`
}

export default function GovernanceTab({ onVoteYes, onVoteNo, poolAddress }: GovernanceTabProps) {
    // const pendingClaims = claims.filter(claim => claim.status === ClaimStatus.Pending);

    const [claimsCount, setClaimsCount] = useState()

    const {data: claimsCountData, isLoading} = useReadContract({
        address: poolAddress,
        abi: parisurePoolAbi,
        functionName: 'getClaimsCount',
        query: {
            enabled: !!poolAddress
        }
    })

    console.log(claimsCountData)

    useEffect(() => {
        if(isLoading && claimsCountData !== undefined){
            setClaimsCount(claimsCountData)
        }
    }, [claimsCountData, isLoading])

    console.log(claimsCount)

    return (
        <div className="space-y-8">
            <div className="mb-10 text-center">
                <h3 className="text-2xl font-bold mb-2">Claims Governance</h3>
                <p className="text-gray-400">Vote on pending claims to help the community make fair decisions</p>
            </div>

            {/* Pending Claims */}
            {/* {pendingClaims.length > 0 && (
                <div>
                    <h4 className="text-xl font-semibold mb-6">Pending Claims</h4>
                    <div className="space-y-6">
                        {pendingClaims.map(claim => (
                            <PendingClaim
                                key={claim.id}
                                claim={claim}
                                onVoteYes={onVoteYes}
                                onVoteNo={onVoteNo}
                            />
                        ))}
                    </div>
                </div>
            )} */}

            {/* Claim History */}
            {/* <div className={pendingClaims.length > 0 ? 'mt-12' : ''}>
                <ClaimHistory claims={claims} />
            </div> */}
        </div>
    );
}
