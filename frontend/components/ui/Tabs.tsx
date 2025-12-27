'use client';

import React, { useState } from 'react';

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex gap-2 border-b border-white/10 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'text-purple-400 border-b-2 border-purple-400'
                            : 'text-gray-400 hover:text-gray-300'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
}
