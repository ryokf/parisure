export default function Footer() {
    return (
        <footer className="border-t border-white/10 py-8 mt-20">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                        </svg>
                        <span className="font-medium">Built on Ethereum</span>
                    </div>

                    <div className="text-gray-500 text-sm">
                        © 2024 Parisure. Decentralized Insurance Protocol.
                    </div>
                </div>
            </div>
        </footer>
    );
}
