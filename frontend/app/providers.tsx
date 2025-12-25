'use client'

import React from 'react'
import { WagmiProvider } from 'wagmi';
import config from '@/config';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const queryClient = new QueryClient()

// Custom RainbowKit theme matching Parisure design
const customTheme = darkTheme({
    accentColor: '#667eea',
    accentColorForeground: 'white',
    borderRadius: 'medium',
    fontStack: 'system',
    overlayBlur: 'small',
});

// Merge with custom CSS variables
customTheme.colors.modalBackground = 'rgba(10, 10, 15, 0.95)';
customTheme.colors.modalBorder = 'rgba(102, 126, 234, 0.3)';
customTheme.colors.connectButtonBackground = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
customTheme.colors.connectButtonText = '#ffffff';

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={customTheme}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default Providers