import { PoolInfo, Policy, Member, Claim, ClaimStatus } from './types';

// Mock Pool List
export const mockPools: PoolInfo[] = [
    {
        poolAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1',
        owner: '0x1234567890123456789012345678901234567890',
        name: 'Health Insurance Pool',
    },
    {
        poolAddress: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        owner: '0x2345678901234567890123456789012345678901',
        name: 'Vehicle Insurance Pool',
    },
    {
        poolAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        owner: '0x3456789012345678901234567890123456789012',
        name: 'Property Insurance Pool',
    },
    {
        poolAddress: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        owner: '0x4567890123456789012345678901234567890123',
        name: 'Travel Insurance Pool',
    },
];

// Mock Policies for each pool
export const mockPolicies: Record<string, Policy[]> = {
    '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1': [
        {
            name: 'Basic Health Coverage',
            duration: 2592000, // 30 days in seconds
            price: '0.1',
            isActive: true,
        },
        {
            name: 'Premium Health Coverage',
            duration: 7776000, // 90 days in seconds
            price: '0.25',
            isActive: true,
        },
        {
            name: 'Annual Health Coverage',
            duration: 31536000, // 365 days in seconds
            price: '0.8',
            isActive: true,
        },
    ],
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063': [
        {
            name: 'Basic Vehicle Protection',
            duration: 2592000,
            price: '0.15',
            isActive: true,
        },
        {
            name: 'Comprehensive Vehicle Coverage',
            duration: 7776000,
            price: '0.4',
            isActive: true,
        },
    ],
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': [
        {
            name: 'Home Protection Plan',
            duration: 7776000,
            price: '0.3',
            isActive: true,
        },
        {
            name: 'Premium Property Coverage',
            duration: 31536000,
            price: '1.0',
            isActive: true,
        },
    ],
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': [
        {
            name: 'Short Trip Coverage',
            duration: 604800, // 7 days
            price: '0.05',
            isActive: true,
        },
        {
            name: 'Extended Travel Protection',
            duration: 2592000,
            price: '0.2',
            isActive: true,
        },
    ],
};

// Mock Member Data
export const mockMember: Member = {
    isActive: true,
    joinedAt: Date.now() - 86400000 * 5, // 5 days ago
    expiredDate: Date.now() + 86400000 * 25, // 25 days from now
    policyId: 0,
};

// Mock Claims
export const mockClaims: Claim[] = [
    {
        id: 0,
        claimant: '0x5678901234567890123456789012345678901234',
        photoUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400',
        description: 'Medical emergency - hospitalization required for 3 days due to accident',
        voteYes: 8,
        voteNo: 2,
        status: ClaimStatus.Pending,
    },
    {
        id: 1,
        claimant: '0x6789012345678901234567890123456789012345',
        photoUrl: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=400',
        description: 'Car accident - front bumper and headlight damage',
        voteYes: 5,
        voteNo: 3,
        status: ClaimStatus.Pending,
    },
    {
        id: 2,
        claimant: '0x7890123456789012345678901234567890123456',
        photoUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400',
        description: 'House fire damage - kitchen area affected',
        voteYes: 12,
        voteNo: 1,
        status: ClaimStatus.Accept,
    },
    {
        id: 3,
        claimant: '0x8901234567890123456789012345678901234567',
        photoUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400',
        description: 'Lost luggage during international travel',
        voteYes: 3,
        voteNo: 9,
        status: ClaimStatus.Reject,
    },
];

// Helper functions
export function getPoliciesForPool(poolAddress: string): Policy[] {
    return mockPolicies[poolAddress] || [];
}

export function getPoolByAddress(address: string): PoolInfo | undefined {
    return mockPools.find(pool => pool.poolAddress === address);
}
