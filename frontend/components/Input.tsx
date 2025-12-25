import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    error?: string;
    isTextarea?: boolean;
}

export default function Input({
    label,
    error,
    isTextarea = false,
    className = '',
    ...props
}: InputProps) {
    const baseStyles = 'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all';

    return (
        <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-gray-300">{label}</label>
            {isTextarea ? (
                <textarea
                    className={`${baseStyles} ${className} min-h-32`}
                    {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
                />
            ) : (
                <input
                    className={`${baseStyles} ${className}`}
                    {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
                />
            )}
            {error && <span className="text-sm text-red-400 mt-1">{error}</span>}
        </div>
    );
}
