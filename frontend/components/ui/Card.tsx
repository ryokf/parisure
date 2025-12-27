import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    style?: React.CSSProperties;
}

export default function Card({ children, className = '', hover = true, style }: CardProps) {
    return (
        <div
            className={`glass-effect rounded-2xl p-8 ${hover ? 'hover-lift cursor-pointer' : ''
                } ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}
