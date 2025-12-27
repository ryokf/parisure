import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDuration } from '@/services/formatting/formatters';

interface Policy {
    name: string;
    duration: number;
    price: number;
    isActive: boolean;
}

interface BuyPolicyTabProps {
    policies: Policy[];
    onJoinPool: (policyId: number) => void;
}

export default function BuyPolicyTab({ policies, onJoinPool }: BuyPolicyTabProps) {
    return (
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
                            onClick={() => onJoinPool(index)}
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
}
