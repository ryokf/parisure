'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { getPoolByAddress } from '@/lib/mockData';
import { useForm } from '@/hooks/useForm';

interface PolicyFormData {
    name: string;
    duration: number;
    price: number;
    [key: string]: string | number;
}

export default function AdminPage() {
    const params = useParams();
    const address = params.address as string;

    const pool = getPoolByAddress(address);
    const [isOwner] = useState(true); // Mock owner check
    const [isActive, setIsActive] = useState(true);

    const { values, handleChange, handleSubmit, resetForm } = useForm<PolicyFormData>({
        initialValues: {
            name: '',
            duration: 0,
            price: 0,
        },
        onSubmit: async (formData) => {
            alert(`Policy created!\nName: ${formData.name}\nDuration: ${formData.duration} days\nPrice: ${formData.price} ETH`);
            resetForm();
            setIsActive(true);
        },
    });

    if (!pool) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-md w-full text-center" hover={false}>
                    <h2 className="text-2xl font-bold mb-4">Pool Not Found</h2>
                    <Link href="/">
                        <Button variant="primary">Back to Home</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    if (!isOwner) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="max-w-md w-full text-center" hover={false}>
                    <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                    <p className="text-gray-400 mb-6">
                        Only the pool owner can access this page
                    </p>
                    <Link href={`/pool/${address}`}>
                        <Button variant="primary">Back to Pool</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="container max-w-4xl">
                {/* Header */}
                <div className="mb-16 animate-slide-up">
                    <Link
                        href={`/pool/${address}`}
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mb-6"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Pool
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold">Admin Panel</h1>
                            <p className="text-gray-400">{pool.name}</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Pool Statistics */}
                    <Card hover={false} className="animate-slide-up">
                        <h3 className="text-xl font-bold mb-4">Pool Statistics</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                <span className="text-gray-400">Pool Balance</span>
                                <span className="text-2xl font-bold text-green-400">12.5 ETH</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                <span className="text-gray-400">Total Members</span>
                                <span className="text-xl font-semibold">47</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                                <span className="text-gray-400">Active Policies</span>
                                <span className="text-xl font-semibold">3</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Total Claims</span>
                                <span className="text-xl font-semibold">8</span>
                            </div>
                        </div>
                    </Card>

                    {/* Pool Info */}
                    <Card hover={false} className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-xl font-bold mb-4">Pool Information</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Owner Address</p>
                                <p className="font-mono text-purple-400 break-all">{pool.owner}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Pool Address</p>
                                <p className="font-mono text-cyan-400 break-all">{pool.poolAddress}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Solvency Status</p>
                                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold">
                                    Solvent
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Add Policy Form */}
                <Card hover={false} className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-2xl font-bold mb-8">Create New Policy</h3>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <Input
                            label="Policy Name"
                            name="name"
                            type="text"
                            placeholder="e.g., Premium Coverage Plan"
                            value={values.name}
                            onChange={handleChange}
                            required
                        />

                        <div className="grid md:grid-cols-2 gap-6">
                            <Input
                                label="Duration (days)"
                                name="duration"
                                type="number"
                                placeholder="e.g., 30"
                                value={values.duration}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Price (ETH)"
                                name="price"
                                type="number"
                                step="0.01"
                                placeholder="e.g., 0.5"
                                value={values.price}
                                onChange={handleChange}
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

                        <Button type="submit" variant="primary" className="w-full">
                            Create Policy
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}
