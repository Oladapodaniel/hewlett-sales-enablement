"use client";

import SlideDeck from '@/components/themes/purple_theme/SlideDeck';
import React, { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

const Page: React.FC = () => {
    const { selectedTheme } = useTheme();

    useEffect(() => {
        console.log('Selected Theme:', selectedTheme);
    }, [selectedTheme]);

    const renderTheme = () => {
        switch (selectedTheme?.id) {
            case "modern":
                return <SlideDeck type="editing" />
            //   case "minimal":
            //     return <MinimalTheme content={content} setContent={setContent} />;
            default:
                return <p>Please select a theme.</p>;
        }
    };

    return (
        <div className='container mx-auto flex justify-between py-5'>
            <div className='flex flex-col'>
                {renderTheme()}
            </div>
        </div>
    );
};

export default Page;