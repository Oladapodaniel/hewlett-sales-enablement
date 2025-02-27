"use client";


import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import SlideDeck from '@/components/themes/HPE_Design/SlideDeck';

export interface SectionProps {
    title: string;
    id: number;
    templateSlide: string;
    content: string[];
}
const Page: React.FC = () => {
    const { selectedTheme } = useTheme();

    
    const [sections, setSections] = useState<SectionProps[]>([
            {
                title: "SPOCK SYSTEMS ARCHITECTURE",
                id: 1,
                templateSlide: "TitleSlide",
                content: [
                    'Joe Glenski',
                    'May 20, 2021'
                ]
            },
            {
                title: "Introduction",
                id: 2,
                templateSlide: "SectionHeader",
                content: [
                    'A brief overview of spoke systems architecture.',
                ]
            },
            {
                title: "Key benefits of Sustainable Data Centers",
                id: 3,
                templateSlide: "BulletList",
                content: [
                    'Cost Savings: Reduced energy consumption leads to significant cost reductions.',
                    'Resilience: Use of renewable energy and efficient cooling systems enhances operational resilience.',
                    'Compliance: Aligns with global sustainability goals and regulations.',
                    'Resilience: Use of renewable energy and efficient cooling systems enhances operational resilience.',
                ]
            },
            {
                title: "Energy Efficiency Technologies",
                id: 4,
                templateSlide: "ImageWithCaption",
                content: [
                    'Free Cooling: Utilizes outside air to cool data centers, reducing reliance on traditional cooling systems.',
                    // 'Virtualization: Increases server utilization rates, decreasing the number of physical servers needed.'
                ]
            },
            {
                title: "Thank You",
                id: 5,
                templateSlide: "ClosingSlide",
                content: [
                    'glenski@hpe.com',
                ]
            }
        ])

    useEffect(() => {
        console.log('Selected Theme:', selectedTheme);
    }, [selectedTheme]);

    const renderTheme = () => {
        // switch (selectedTheme?.id) {
        //     case "modern":
                return <SlideDeck type="editing" slides={sections} />
            //   case "minimal":
            //     return <MinimalTheme content={content} setContent={setContent} />;
            // default:
                // return <p>Please select a theme.</p>;
        // }
    };

    return (
        <div className='bg-gradient-to-t from-primary-foreground via-primary-foreground to-white'>
        <div className='container mx-auto flex justify-between py-5'>
            <div className='flex flex-col'>
                {renderTheme()}
            </div>
        </div>

        </div>
    );
};

export default Page;