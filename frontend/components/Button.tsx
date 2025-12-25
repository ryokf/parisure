import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'success';
    children: React.ReactNode;
    isLoading?: boolean;
}

export default function Button({
    variant = 'primary',
    children,
    isLoading = false,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = 'px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg hover:shadow-xl hover:scale-105',
        secondary: 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105',
        outline: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400',
        success: 'bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl hover:scale-105',
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <span className="animate-pulse">●</span>
                    Loading...
                </span>
            ) : (
                children
            )}
        </button>
    );
}
