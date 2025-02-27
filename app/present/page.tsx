'use client';

import BulletList from '@/components/themes/HPE_Design/BulletList';
import ClosingSide from '@/components/themes/HPE_Design/ClosingSlide';
import ImageWithCaption from '@/components/themes/HPE_Design/ImageWithCaption';
import SectionHeader from '@/components/themes/HPE_Design/SectionHeader';
import TitlePage from '@/components/themes/HPE_Design/TitlePage';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { SectionProps } from '../slide-deck/page';
import { thumbnail_fifth, thumbnail_first, thumbnail_fourth, thumbnail_second, thumbnail_third } from '@/lib/images';

const Page: React.FC = () => {
    const [currentSlide, setCurrentSlide] = React.useState(1);
    const { slideStates } = useTheme();

    const sections: SectionProps[] = [
        {
            title: "SUSTAINABLE DATA CENTERS",
            id: 1,
            templateSlide: "TitleSlide",
            content: [
                'Joe Glenski',
                'May 20, 2021'
            ],
            thumbnail: thumbnail_first
        },
        {
            title: "Introduction",
            id: 2,
            templateSlide: "SectionHeader",
            content: [
                'A brief overview of spoke systems architecture.',
            ],
            thumbnail: thumbnail_second
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
            ],
            thumbnail: thumbnail_third
        },
        {
            title: "Energy Efficiency Technologies",
            id: 4,
            templateSlide: "ImageWithCaption",
            content: [
                'Free Cooling: Utilizes outside air to cool data centers, reducing reliance on traditional cooling systems.',
                // 'Virtualization: Increases server utilization rates, decreasing the number of physical servers needed.'
            ],
            thumbnail: thumbnail_fourth
        },
        {
            title: "Thank You",
            id: 5,
            templateSlide: "ClosingSlide",
            content: [
                'glenski@hpe.com',
            ],
            thumbnail: thumbnail_fifth
        }
    ]


    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(slideStates.length - 1)
            if ((event.key === 'ArrowRight' || event.key === 'ArrowDown') && currentSlide > 0 && currentSlide < slideStates.length) {
                setCurrentSlide((prev) => prev + 1);
            }
        };
        const handleKeyUp = (event: KeyboardEvent) => {

            if ((event.key === 'ArrowLeft' || event.key === 'ArrowUp') && currentSlide >= 2) {
                setCurrentSlide((prev) => prev - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [currentSlide, slideStates.length]);

    return (
        <div>
            {
                (slideStates.length > 0 ? slideStates : sections).map((section, index) => (
                    <div key={index}>
                        {currentSlide === index + 1 && section.templateSlide === "TitleSlide" && <TitlePage mode='presenting' content={section} />}
                        {currentSlide === index + 1 && section.templateSlide === "SectionHeader" && <SectionHeader mode='presenting' content={section} />}
                        {currentSlide === index + 1 && section.templateSlide === "BulletList" && <BulletList mode='presenting' content={section} />}
                        {currentSlide === index + 1 && section.templateSlide === "ImageWithCaption" && <ImageWithCaption mode='presenting' content={section} />}
                        {currentSlide === index + 1 && section.templateSlide === "ClosingSlide" && <ClosingSide mode='presenting' content={section} />}
                    </div>
                ))
            }
        </div>
    );
};

export default Page;