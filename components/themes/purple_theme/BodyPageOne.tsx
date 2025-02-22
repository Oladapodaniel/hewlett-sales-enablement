'use client'

import { useTheme } from '@/context/ThemeContext';
import { second_slide_image } from '@/lib/images';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

interface BodyPageOneProps {
    mode: 'editing' | 'presenting';
}

const BodyPageOne: React.FC<BodyPageOneProps> = ({ mode }) => {
    const { selectedTheme, setSelectedTheme } = useTheme();


    // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setText(event.target.value);
    // };

    // const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     settitle(event.target.value);
    // };
    // const handleBody = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setbody(event.target.value);
    // };

    // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setText(event.target.value);
    //     setSelectedTheme((prevTheme) => {
    //         if (prevTheme === null) return null;
    //         const updatedSlides = [...prevTheme.slides];
    //         updatedSlides[1].header.text = event.target.value;
    //         return { ...prevTheme, slides: updatedSlides };
    //     });
    // };

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitleText = event.target.value;
        if (selectedTheme === null) return;
        setSelectedTheme((prevTheme) => {
            if (prevTheme === null) return null;
            return {
                ...prevTheme,
                slides: prevTheme.slides.map((slide, index) =>
                    index === 1 ? { ...slide, header: { ...slide.header, text: newTitleText } } : slide
                )
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
                    index === 1 ? { ...slide, body: { ...slide.body, text: newBodyText } } : slide
                )
            };
        });
    };

    const handleTitle2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitleText = event.target.value;
        if (selectedTheme === null) return;
        
        setSelectedTheme((prevTheme) => {
            if (prevTheme === null) return null;
            return {
                ...prevTheme,
                slides: prevTheme.slides.map((slide, index) =>
                    index === 1 ? { ...slide, header2: { ...slide.header2, text: newTitleText } } : slide
                )
            };
        });
    };

    const handleBody2 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newBodyText = event.target.value;
        if (selectedTheme === null) return;
        setSelectedTheme((prevTheme) => {
            if (prevTheme === null) return null;
            return {
                ...prevTheme,
                slides: prevTheme.slides.map((slide, index) =>
                    index === 1 ? { ...slide, body2: { ...slide.body2, text: newBodyText } } : slide
                )
            };
        });
    };

    return (

        <div className={`bg-[#F2F0FF] pl-12 w-full flex space-x-5 ${mode === 'presenting' ? 'h-screen' : ''}`}>
            <div className='w-2/4 py-12'>
                {/* {mode === 'editing' ? (
                    <textarea value={text} onChange={handleChange} className='caret-white text-5xl font-bold bg-transparent' />
                ) : (
                    <div className=' text-5xl font-bold'>{text}</div>
                )} */}
                {mode === 'editing' ? (
                    <input value={selectedTheme?.slides[1]?.header.text} onChange={handleTitle} className='w-full font-bold mt-[30px] text-2xl bg-transparent' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className='mt-[100px] font-bold text-2xl'>{selectedTheme?.slides[1]?.header.text}</motion.div>
                )}
                {mode === 'editing' ? (
                    <textarea value={selectedTheme?.slides[1]?.body.text} onChange={handleBody} rows={4} className='w-2/3 text-2xl bg-transparent' />
                ) : (
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='mt-[30px] w-2/3 text-2xl'>{selectedTheme?.slides[1]?.body.text}</motion.div>
                )}
                {mode === 'editing' ? (
                    <input value={selectedTheme?.slides[1]?.header2?.text} onChange={handleTitle2} className='caret-white w-full font-bold mt-[30px] text-2xl bg-transparent' />
                ) : (
                    <motion.div 
                    initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className='mt-[100px] text-2xl font-bold'>{selectedTheme?.slides[1]?.header2?.text}</motion.div>
                )}
                {mode === 'editing' ? (
                    <textarea value={selectedTheme?.slides[1]?.body2?.text} onChange={handleBody2} rows={4} className='caret-white w-2/3 text-2xl bg-transparent' />
                ) : (
                    <motion.div 
                    initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className='mt-[30px] w-2/3 text-2xl'>{selectedTheme?.slides[1]?.body2?.text}</motion.div>
                )}
            </div>
            <div className='w-2/4'>
                <Image
                    src={second_slide_image}
                    alt='bg'
                    className={mode === 'presenting' ? 'h-screen' : 'h-[600px]'}
                />
            </div>
        </div>
    );
};

export default BodyPageOne;