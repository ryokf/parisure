import React from 'react';
import Card from '@/components/ui/Card';

interface PoolInfoProps {
    owner: string;
    poolAddress: string;
    solvencyStatus: 'Solvent' | 'At Risk' | 'Insolvent';
}

export default function PoolInfo({ owner, poolAddress, solvencyStatus }: PoolInfoProps) {
    const statusColor = {
        'Solvent': 'text-green-400 bg-green-500/20',
        'At Risk': 'text-yellow-400 bg-yellow-500/20',
        'Insolvent': 'text-red-400 bg-red-500/20',
    }[solvencyStatus];

    return (
        <Card hover={false} className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-xl font-bold mb-4">Pool Information</h3>
            <div className="space-y-3">
                <div>
                    <p className="text-sm text-gray-400 mb-1">Owner Address</p>
                    <p className="font-mono text-purple-400 break-all">{owner}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400 mb-1">Pool Address</p>
                    <p className="font-mono text-cyan-400 break-all">{poolAddress}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400 mb-1">Solvency Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
                        {solvencyStatus}
                    </span>
                </div>
            </div>
        </Card>
    );
}
