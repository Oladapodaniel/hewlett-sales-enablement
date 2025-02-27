'use client'

import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { motion } from 'framer-motion';
import { green_band, logo_2 } from '@/lib/images';
import Image from 'next/image';
import { SectionProps } from '@/app/slide-deck/page';

interface TitlePageProps {
    mode: 'editing' | 'presenting';
    content: SectionProps
}

const TitlePage: React.FC<TitlePageProps> = ({ mode, content }) => {
    const { selectedTheme, setSelectedTheme } = useTheme();


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

    const handleBody = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <div className={`bg-[url(../assets/img/HPE_theme_assets/start_deck_bg.png)] bg-cover bg-no-repeat p-12 w-full ${mode === 'presenting' ? 'h-screen ' : 'rounded-lg'}`}>
            <div className='w-2/3'>
                {mode === 'editing' ? (
                    // <textarea value={'LOGO'} onChange={handleChange} className='caret-white text-4xl font-medium text-white bg-transparent' />
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
                    <textarea value={content.title} onChange={handleTitle} className='caret-white w-full mt-[30px] text-6xl font-bold bg-transparent text-white' />
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
                <Image src={green_band} alt='logo' className='mt-5 w-[50px]' />
                {mode === 'editing' ? (
                    <input value={content.content[0]} onChange={handleBody} className='caret-white w-full mt-[40px] text-3xl bg-transparent text-white' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className='mt-[100px] text-4xl text-white'
                    >
                        {content.content[0]}
                    </motion.div>
                )}
                {mode === 'editing' ? (
                    <textarea value={content.content[1]} onChange={handleFooter} className='caret-white text-white bg-transparent text-2xl font-[400]' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className='mt-3 text-white text-3xl'
                    >
                        {content.content[1]}
                    </motion.div>
                    // <div className='mt-5 text-white text-4xl'>{selectedTheme?.slides[0]?.footer?.text}</div>
                )}
            </div>
        </div>
    );
};

export default TitlePage;