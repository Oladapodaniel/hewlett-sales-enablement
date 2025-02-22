"use client";

import SlideDeck from '@/components/themes/purple_theme/SlideDeck';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import HeaderNav from '@/components/HeaderNav';
import Image from 'next/image';
import { logo } from '@/lib/images';

const Page: React.FC = () => {
    const router = useRouter();
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