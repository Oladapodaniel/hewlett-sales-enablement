'use client'

import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { motion } from 'framer-motion';

interface StartPageProps {
    mode: 'editing' | 'presenting';
}

const StartPage: React.FC<StartPageProps> = ({ mode }) => {
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
        <div className={`bg-[url(../assets/img/start_deck_bg.png)] bg-cover bg-no-repeat p-12 w-full ${mode === 'presenting' ? 'h-screen' : ''}`}>
            <div className='w-2/3'>
                *{mode === 'editing' ? (
                    <textarea value={selectedTheme?.slides[0]?.logo} onChange={handleChange} className='caret-white text-4xl font-medium text-white bg-transparent' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className='animate-fadeIn animate-slideIn text-4xl font-medium text-white'
                    >
                        {selectedTheme?.slides[0]?.logo}
                    </motion.div>
                    // <div className='animate-fadeIn animate-slideIn text-4xl font-medium text-white'>{selectedTheme?.slides[0]?.logo}</div>
                    // <div className=' text-4xl font-medium text-white'>{selectedTheme?.slides[0]?.logo}</div>
                )} *
                {mode === 'editing' ? (
                    <textarea value={selectedTheme?.slides?.[0]?.header?.text} onChange={handleTitle} className='caret-white w-full mt-[30px] text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9886FC] to-[#5E9BFB]' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='mt-[200px] text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9886FC] to-[#5E9BFB]'
                    >
                        {selectedTheme?.slides?.[0]?.header?.text}
                    </motion.div>
                    // <div className='mt-[200px] text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9886FC] to-[#5E9BFB]'>{selectedTheme?.slides?.[0]?.header?.text}</div>
                )}
                {mode === 'editing' ? (
                    <input value={selectedTheme?.slides[0]?.body?.text} onChange={handleBody} className='caret-white w-full mt-[40px] text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#4AA1FA] to-[#C2DFFD]' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className='mt-[100px] text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#4AA1FA] to-[#C2DFFD]'
                    >
                        {selectedTheme?.slides[0]?.body?.text}
                    </motion.div>
                    // <div className='mt-[100px] text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[#4AA1FA] to-[#C2DFFD]'>{selectedTheme?.slides[0]?.body?.text}</div>
                )}
                {mode === 'editing' ? (
                    <textarea value={selectedTheme?.slides[0]?.footer?.text} onChange={handleFooter} className='mt-5 caret-white text-white bg-transparent text-4xl' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className='mt-5 text-white text-4xl'
                    >
                        {selectedTheme?.slides[0]?.footer?.text}
                    </motion.div>
                    // <div className='mt-5 text-white text-4xl'>{selectedTheme?.slides[0]?.footer?.text}</div>
                )}
            </div>
        </div>
    );
};

export default StartPage;