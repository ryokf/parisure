import { createPublicClient, createWalletClient, custom, http, parseEther } from 'viem';
import { sepolia } from 'viem/chains';
import contract_address from '@/constant/contract_address';
import { poolFactoryAbi, parisurePoolAbi } from '@/constant/abi';

// Create public client for reading blockchain data
const publicClient = createPublicClient({
    chain: sepolia,
    transport: http()
});

// Get wallet client (requires window.ethereum)
function getWalletClient() {
    if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('No ethereum wallet found');
    }

    return createWalletClient({
        chain: sepolia,
        transport: custom(window.ethereum)
    });
}

// Get connected account address
export async function getAccount(): Promise<`0x${string}` | null> {
    try {
        if (typeof window === 'undefined' || !window.ethereum) {
            return null;
        }

        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        }) as string[];

        return accounts[0] as `0x${string}` || null;
    } catch (error) {
        console.error('Error getting account:', error);
        return null;
    }
}

// Request account connection
export async function connectWallet(): Promise<`0x${string}` | null> {
    try {
        if (typeof window === 'undefined' || !window.ethereum) {
            throw new Error('No ethereum wallet found');
        }

        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        }) as string[];

        return accounts[0] as `0x${string}` || null;
    } catch (error) {
        console.error('Error connecting wallet:', error);
        return null;
    }
}

// Pool Factory Functions
export async function getPoolCount(): Promise<bigint> {
    try {
        const count = await publicClient.readContract({
            address: contract_address,
            abi: poolFactoryAbi,
            functionName: 'getPoolLength',
        });
        return count as bigint;
    } catch (error) {
        console.error('Error getting pool count:', error);
        throw error;
    }
}

export async function getPoolByIndex(index: number): Promise<any> {
    try {
        const pool = await publicClient.readContract({
            address: contract_address,
            abi: poolFactoryAbi,
            functionName: 'poolList',
            args: [BigInt(index)],
        });
        return pool;
    } catch (error) {
        console.error('Error getting pool by index:', error);
        throw error;
    }
}

export async function createPool(
    name: string,
    waitingPeriodDays: number,
    maxCoverageEth: number
): Promise<`0x${string}`> {
    try {
        const walletClient = getWalletClient();
        const account = await getAccount();

        if (!account) {
            throw new Error('No account connected');
        }

        const hash = await walletClient.writeContract({
            address: contract_address,
            abi: poolFactoryAbi,
            functionName: 'createPool',
            args: [
                name,
                BigInt(waitingPeriodDays) * BigInt(24 * 60 * 60), // Convert days to seconds
                parseEther(maxCoverageEth.toString()),
            ],
            account,
        });

        return hash;
    } catch (error) {
        console.error('Error creating pool:', error);
        throw error;
    }
}

// Pool Functions
export async function getPoolDetail(poolAddress: `0x${string}`): Promise<any> {
    try {
        const detail = await publicClient.readContract({
            address: poolAddress,
            abi: parisurePoolAbi,
            functionName: 'getPoolDetail',
        });
        return detail;
    } catch (error) {
        console.error('Error getting pool detail:', error);
        throw error;
    }
}

export async function checkIsOwner(
    poolAddress: `0x${string}`,
    userAddress: `0x${string}`
): Promise<boolean> {
    try {
        const detail = await getPoolDetail(poolAddress);
        // detail[3] is the owner address
        return detail[3].toLowerCase() === userAddress.toLowerCase();
    } catch (error) {
        console.error('Error checking owner:', error);
        return false;
    }
}

// Wait for transaction receipt
export async function waitForTransaction(hash: `0x${string}`) {
    try {
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        return receipt;
    } catch (error) {
        console.error('Error waiting for transaction:', error);
        throw error;
    }
}
