export interface PoolInfo {
    poolAddress: string;
    owner: string;
    name: string;
}

export interface Policy {
    name: string;
    duration: number; // in seconds
    price: string; // in ETH
    isActive: boolean;
}

export interface Member {
    isActive: boolean;
    joinedAt: number; // timestamp
    expiredDate: number; // timestamp
    policyId: number;
}

export enum ClaimStatus {
    Pending = 0,
    Accept = 1,
    Reject = 2,
}

export interface Claim {
    id: number;
    claimant: string;
    photoUrl: string;
    description: string;
    voteYes: number;
    voteNo: number;
    status: ClaimStatus;
}
