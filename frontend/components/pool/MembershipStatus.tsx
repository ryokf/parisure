import React from 'react';
import Card from '@/components/ui/Card';
import Countdown from '@/components/ui/Countdown';

interface Member {
    isActive: boolean;
    joinedAt: string;
    expiredDate: string;
}

interface MembershipStatusProps {
    member: Member;
}

export default function MembershipStatus({ member }: MembershipStatusProps) {
    return (
        <Card hover={false}>
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Membership Status</h3>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    member.isActive
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                }`}>
                    {member.isActive ? 'Active' : 'Expired'}
                </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <p className="text-sm text-gray-400 mb-1">Joined Date</p>
                    <p className="font-semibold">
                        {new Date(member.joinedAt).toLocaleDateString()}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-400 mb-1">Expiration Date</p>
                    <p className="font-semibold">
                        {new Date(member.expiredDate).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <div className="bg-purple-500/10 rounded-xl p-8">
                <p className="text-sm text-gray-400 mb-4 text-center">Time Until Expiration</p>
                <Countdown targetDate={member.expiredDate} />
            </div>
        </Card>
    );
}
