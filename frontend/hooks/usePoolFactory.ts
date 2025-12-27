import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, parseEventLogs } from 'viem';
import contract_address from '@/constant/contract_address';
import { poolFactoryAbi } from '@/constant/abi';
import { useMemo } from 'react';

/**
 * Hook to get the total number of pools
 */
export function usePoolCount() {
    return useReadContract({
        address: contract_address,
        abi: poolFactoryAbi,
        functionName: 'getPoolLength',
    });
}

/**
 * Hook to get pool information by index
 */
export function usePoolByIndex(index: number) {
    return useReadContract({
        address: contract_address,
        abi: poolFactoryAbi,
        functionName: 'poolList',
        args: [BigInt(index)],
    });
}

/**
 * Hook to create a new pool
 */
export function useCreatePool() {
    const {
        data: hash,
        error,
        isPending,
        writeContract,
    } = useWriteContract();

    const {
        isLoading: isConfirming,
        isSuccess: isConfirmed,
        data: receipt,
    } = useWaitForTransactionReceipt({
        hash,
    });

    // Extract the new pool address from transaction receipt
    const newPoolAddress = useMemo(() => {
        if (!isConfirmed || !receipt) return null;

        try {
            const logs = parseEventLogs({
                abi: poolFactoryAbi,
                logs: receipt.logs,
                eventName: 'PoolCreated',
            });

            if (logs.length > 0) {
                return logs[0].args.poolAddress;
            }
        } catch (e) {
            console.error('Error parsing pool creation event:', e);
        }

        return null;
    }, [isConfirmed, receipt]);

    const createPool = (name: string, waitingPeriodDays: number, maxCoverageEth: number) => {
        return writeContract({
            address: contract_address,
            abi: poolFactoryAbi,
            functionName: 'createPool',
            args: [
                name,
                BigInt(waitingPeriodDays) * BigInt(24 * 60 * 60), // Convert days to seconds
                parseEther(maxCoverageEth.toString()),
            ],
        });
    };

    return {
        createPool,
        hash,
        error,
        isPending,
        isConfirming,
        isConfirmed,
        newPoolAddress,
    };
}
