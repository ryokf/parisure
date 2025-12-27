import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useForm } from '@/hooks/useForm';

interface PolicyFormData {
    name: string;
    duration: number;
    price: number;
    [key: string]: string | number;
}

interface CreatePolicyFormProps {
    poolName: string;
    onSubmit: (formData: PolicyFormData) => Promise<void>;
}

export default function CreatePolicyForm({ poolName, onSubmit }: CreatePolicyFormProps) {
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { values, handleChange, handleSubmit, resetForm } = useForm<PolicyFormData>({
        initialValues: {
            name: '',
            duration: 0,
            price: 0,
        },
        onSubmit: async (formData) => {
            setIsLoading(true);
            try {
                await onSubmit(formData);
                resetForm();
                setIsActive(true);
            } finally {
                setIsLoading(false);
            }
        },
    });



    return (
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

                <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Creating Policy...' : 'Create Policy'}
                </Button>
            </form>
        </Card>
    );
}
