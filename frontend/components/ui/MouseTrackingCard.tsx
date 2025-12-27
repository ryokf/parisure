'use client'

import { useEffect, useRef } from 'react';

interface MouseTrackingCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function MouseTrackingCard({ children, className = '' }: MouseTrackingCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const spotlight = spotlightRef.current;
        if (!card || !spotlight) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            spotlight.style.background = `radial-gradient(circle 300px at ${x}px ${y}px, rgba(168, 85, 247, 0.2), transparent 60%)`;
        };

        const handleMouseEnter = () => {
            spotlight.style.opacity = '1';
        };

        const handleMouseLeave = () => {
            spotlight.style.opacity = '0';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div ref={cardRef} className={`relative overflow-hidden ${className}`}>
            <div
                ref={spotlightRef}
                className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-0"
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
