import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { parisurePoolAbi } from '@/constant/abi';

interface ClaimFormProps {
    onSubmit: (description: string, poolAddress: string) => void;
}

// https://www.oto.com/en/mobil-yang-akan-datang

export default function ClaimForm({ onSubmit, poolAddress }: ClaimFormProps) {
    const [claimDescription, setClaimDescription] = useState('');
    const [claimPhotoUrl, setClaimPhotoUrl] = useState("https://www.oto.com/en/mobil-yang-akan-datang");

    const { data: hash, writeContract } = useWriteContract()

    const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        writeContract({
            address: poolAddress,
            abi: parisurePoolAbi,
            functionName: 'submitClaim',
            args: [claimPhotoUrl, claimDescription]
        })

        setClaimDescription('');
        setClaimPhotoUrl('');
    };

    useEffect(() => {
        if (isSuccess) {
            onSubmit(claimDescription, claimPhotoUrl);
        }
    }, [isSuccess, claimDescription, claimPhotoUrl, onSubmit])

    return (
        <Card hover={false}>
            <h3 className="text-2xl font-bold mb-8">Submit a Claim</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                // required
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
    );
}
