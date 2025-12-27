import React from 'react';
import Card from '@/components/ui/Card';
import { formatAddress } from '@/services/formatting/formatters';
import { Claim, ClaimStatus } from '@/lib/types';

interface ClaimHistoryProps {
    claims: Claim[];
}

export default function ClaimHistory({ claims }: ClaimHistoryProps) {
    const historyClaims = claims.filter(claim => claim.status !== ClaimStatus.Pending);

    return (
        <div>
            <h4 className="text-xl font-semibold mb-6">Claim History</h4>
            <div className="space-y-6">
                {historyClaims.map(claim => (
                    <Card key={claim.id} hover={false} className="opacity-75">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Claim #{claim.id}</p>
                                <p className="text-sm text-purple-400 font-mono mb-2">
                                    {formatAddress(claim.claimant)}
                                </p>
                                <p className="text-gray-300">{claim.description}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                claim.status === ClaimStatus.Accept
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
    );
}
