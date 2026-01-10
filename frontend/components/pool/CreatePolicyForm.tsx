import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { parisurePoolAbi } from '@/constant/abi';
import { parseEther } from 'viem';

interface CreatePolicyFormProps {
    poolName: string;
    poolAddress: `0x${string}`;
}

export default function CreatePolicyForm({ poolName, poolAddress }: CreatePolicyFormProps) {
    const [isActive, setIsActive] = useState(true);
    const router = useRouter();

    console.log("pool : " + poolAddress)

    const [formData, setFormData] = useState({
        name: "",
        duration: "",
        price: ""
    })

    const { data: hash, writeContract } = useWriteContract()

    const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

    // Auto redirect after 3 seconds when transaction is successful
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                router.push(`/pool/${poolAddress}`);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isSuccess, poolAddress, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const { name, duration, price } = formData

        writeContract({
            address: poolAddress,
            abi: parisurePoolAbi,
            functionName: "createPolicy",
            args: [name, BigInt(duration) * (86400n), parseEther(price), isActive]
        })
    }

    return (
        <>
            <Card hover={false} className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-bold mb-8">Create New Policy</h3>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <Input
                        label="Policy Name"
                        name="name"
                        type="text"
                        placeholder="e.g., Premium Coverage Plan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            label="Duration (days)"
                            name="duration"
                            type="number"
                            placeholder="e.g., 30"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            required
                        />

                        <Input
                            label="Price (ETH)"
                            name="price"
                            type="number"
                            step="0.01"
                            placeholder="e.g., 0.5"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="w-5 h-5 rounded bg-white/5 border border-white/10 checked:bg-purple-500"
                        />
                        <label htmlFor="isActive" className="text-gray-300 cursor-pointer">
                            Set policy as active immediately
                        </label>
                    </div>

                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Policy Guidelines
                        </h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                            <li>• Duration is converted to seconds in the smart contract</li>
                            <li>• Price should be competitive and fair for members</li>
                            <li>• Inactive policies won&apos;t be visible to potential members</li>
                            <li>• You can modify policy status later</li>
                        </ul>
                    </div>

                    <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Creating Policy...' : 'Create Policy'}
                    </Button>
                </form>
            </Card>

            {/* Success Modal */}
            <Modal isOpen={isSuccess} onClose={() => { }}>
                <div className="p-8 text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
                        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Success Message */}
                    <h3 className="text-2xl font-bold mb-3">Policy Created Successfully!</h3>
                    <p className="text-gray-400 mb-6">
                        Your policy <span className="text-purple-400 font-semibold">{formData.name}</span> has been created and is now available in the pool.
                    </p>

                    {/* Redirect Info */}
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                        <p className="text-sm text-gray-300">
                            Redirecting to pool page in 3 seconds...
                        </p>
                    </div>

                    {/* Action Button */}
                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => router.push(`/pool/${poolAddress}`)}
                    >
                        Go to Pool Now
                    </Button>
                </div>
            </Modal>
        </>
    );
}
