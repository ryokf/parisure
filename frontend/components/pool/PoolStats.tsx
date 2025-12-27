import React from 'react';
import Card from '@/components/ui/Card';

interface PoolStatsProps {
    balance: string;
    totalMembers: number;
    activePolicies: number;
    totalClaims: number;
}

export default function PoolStats({ balance, totalMembers, activePolicies, totalClaims }: PoolStatsProps) {
    return (
        <Card hover={false} className="animate-slide-up">
            <h3 className="text-xl font-bold mb-4">Pool Statistics</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-gray-400">Pool Balance</span>
                    <span className="text-2xl font-bold text-green-400">{balance}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-gray-400">Total Members</span>
                    <span className="text-xl font-semibold">{totalMembers}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-gray-400">Active Policies</span>
                    <span className="text-xl font-semibold">{activePolicies}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Claims</span>
                    <span className="text-xl font-semibold">{totalClaims}</span>
                </div>
            </div>
        </Card>
    );
}
