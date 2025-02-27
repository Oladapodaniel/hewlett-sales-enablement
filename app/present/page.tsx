'use client';

import BulletList from '@/components/themes/HPE_Design/BulletList';
import ClosingSide from '@/components/themes/HPE_Design/ClosingSlide';
import ImageWithCaption from '@/components/themes/HPE_Design/ImageWithCaption';
import SectionHeader from '@/components/themes/HPE_Design/SectionHeader';
import TitlePage from '@/components/themes/HPE_Design/TitlePage';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const Page: React.FC = () => {
    const [currentSlide, setCurrentSlide] = React.useState(1);
    const { slideStates } = useTheme();
  

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
                slideStates.map((section, index) => (
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