'use client'

import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { motion } from 'framer-motion';
import { green_band, logo_2 } from '@/lib/images';
import Image from 'next/image';
import { SectionProps } from '@/app/slide-deck/page';

interface SectionHeaderProps {
    mode: 'editing' | 'presenting';
    content: SectionProps
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ mode, content }) => {
    const { selectedTheme, setSelectedTheme } = useTheme();


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newLogoText = event.target.value;
        if (selectedTheme === null) return;
        setSelectedTheme((prevTheme) => {
            if (prevTheme === null) return null;
            return {
                ...prevTheme,
                slides: prevTheme.slides.map((slide, index) =>
                    index === 0 ? { ...slide, header: { ...slide.header, text: newLogoText } } : slide
                )
                // slides: [
                //     ...prevTheme.slides,
                //     {
                //         ...prevTheme.slides[0],
                //         logo: newLogoText,
                //     },
                // ],
            };
        });
    };


    const handleTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newTitleText = event.target.value;
        if (selectedTheme === null) return;
        setSelectedTheme((prevTheme) => {
            if (prevTheme === null) return null;
            return {
                ...prevTheme,
                slides: prevTheme.slides.map((slide, index) =>
                    index === 0 ? { ...slide, header: { ...slide.header, text: newTitleText } } : slide
                )
                // slides: [
                //     ...prevTheme.slides,
                //     {
                //         ...prevTheme.slides[0],
                //         header: {
                //             ...prevTheme.slides[0].header,
                //             text: newTitleText,
                //         },
                //     },
                // ],
            };
        });
    };

    const handleBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBodyText = event.target.value;
        if (selectedTheme === null) return;
        setSelectedTheme((prevTheme) => {
            if (prevTheme === null) return null;
            return {
                ...prevTheme,
                slides: prevTheme.slides.map((slide, index) =>
                    index === 0 ? { ...slide, header: { ...slide.header, text: newBodyText } } : slide
                )
                // slides: [
                //     ...prevTheme.slides,
                //     {
                //         ...prevTheme.slides[0],
                //         body: {
                //             ...prevTheme.slides[0].body,
                //             text: newBodyText,
                //         },
                //     },
                // ],
            };
        });
    };


    const handleFooter = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newFooterText = event.target.value;
        if (selectedTheme === null) return;

        setSelectedTheme((prevTheme) => {
            if (prevTheme === null) return null;
            return {
                ...prevTheme,
                slides: prevTheme.slides.map((slide, index) =>
                    index === 0 ? { ...slide, header: { ...slide.header, text: newFooterText } } : slide
                )
                // slides: [
                //     {
                //         ...prevTheme.slides[0],
                //         footer: {
                //             ...prevTheme.slides[0].footer,
                //             text: newFooterText,
                //         },
                //     },
                // ],
            };
        })
    };


    return (
        <div className={`bg-[url(../assets/img/HPE_theme_assets/SectionHeader.jpeg)] bg-cover bg-no-repeat p-12 w-full ${mode === 'presenting' ? 'h-screen' : 'rounded-lg'}`}>
            <div className='w-2/3'>
                {mode === 'editing' ? (
                    <Image src={logo_2} width={150} alt='logo' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className='animate-fadeIn animate-slideIn text-4xl font-medium text-white'
                    >
                        <Image src={logo_2} width={150} alt='logo' />
                    </motion.div>
                )}
                {mode === 'editing' ? (
                    <textarea rows={2} value={content.title} onChange={handleTitle} className='caret-white w-full mt-[30px] text-6xl font-bold bg-transparent text-white' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='mt-[200px] text-9xl font-bold text-white'
                    >
                        {content.title}
                    </motion.div>
                )}
                {mode === 'editing' ? (
                    <textarea value={content.content[0]} onChange={handleBody} className='caret-white w-full mt-[10px] text-3xl bg-transparent text-white' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className='mt-[80px] text-4xl text-white'
                    >
                        {content.content[0]}
                    </motion.div>
                )}
                <Image src={green_band} alt='logo' className='mt-2 w-[50px]' />
            </div>
        </div>
    );
};

export default SectionHeader;