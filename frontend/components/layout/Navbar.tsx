import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/10 backdrop-blur">
            <div className="container">
                <div className="flex items-center justify-between h-20">
                    {/* Logo & Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold gradient-text">Parisure</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="#explore"
                            className="text-gray-300 hover:text-white transition-colors font-medium"
                        >
                            Explore
                        </Link>
                        <Link
                            href="#how-it-works"
                            className="text-gray-300 hover:text-white transition-colors font-medium"
                        >
                            How it Works
                        </Link>
                        <Link
                            href="#governance"
                            className="text-gray-300 hover:text-white transition-colors font-medium"
                        >
                            Governance
                        </Link>
                    </div>

                    {/* Connect Wallet Button */}
                    <div className="flex items-center gap-4">
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}
