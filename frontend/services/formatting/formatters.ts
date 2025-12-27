/**
 * Format an Ethereum address to a shorter version
 * @param address - Full Ethereum address
 * @returns Shortened address (e.g., "0x1234...5678")
 */
export function formatAddress(address: string): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format duration in seconds to a human-readable string
 * @param seconds - Duration in seconds
 * @returns Formatted duration string (e.g., "30 Days", "1 Year")
 */
export function formatDuration(seconds: number): string {
    const days = Math.floor(seconds / 86400);

    if (days >= 365) {
        const years = Math.floor(days / 365);
        return `${years} Year${years > 1 ? 's' : ''}`;
    }

    return `${days} Day${days > 1 ? 's' : ''}`;
}

/**
 * Format a timestamp to a localized date string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted date string
 */
export function formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString();
}

/**
 * Format ETH value to a readable string
 * @param value - ETH value as string or number
 * @param decimals - Number of decimal places (default: 4)
 * @returns Formatted ETH value
 */
export function formatEther(value: string | number, decimals: number = 4): string {
    const num = typeof value === 'string' ? Number.parseFloat(value) : value;
    return num.toFixed(decimals);
}
