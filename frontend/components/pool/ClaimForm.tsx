import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface ClaimFormProps {
    onSubmit: (description: string, photoUrl: string) => void;
}

export default function ClaimForm({ onSubmit }: ClaimFormProps) {
    const [claimDescription, setClaimDescription] = useState('');
    const [claimPhotoUrl, setClaimPhotoUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(claimDescription, claimPhotoUrl);
        setClaimDescription('');
        setClaimPhotoUrl('');
    };

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
    );
}
