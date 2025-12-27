import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatAddress } from '@/services/formatting/formatters';
import { Claim } from '@/lib/types';

interface PendingClaimProps {
    claim: Claim;
    onVoteYes: (claimId: number) => void;
    onVoteNo: (claimId: number) => void;
}

export default function PendingClaim({ claim, onVoteYes, onVoteNo }: PendingClaimProps) {
    const totalVotes = claim.voteYes + claim.voteNo;
    const yesPercentage = totalVotes > 0 ? (claim.voteYes / totalVotes) * 100 : 0;
    const noPercentage = totalVotes > 0 ? (claim.voteNo / totalVotes) * 100 : 0;

    return (
        <Card hover={false}>
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
                            onClick={() => onVoteYes(claim.id)}
                        >
                            Vote Yes
                        </Button>
                        <Button
                            variant="secondary"
                            className="flex-1"
                            onClick={() => onVoteNo(claim.id)}
                        >
                            Vote No
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
