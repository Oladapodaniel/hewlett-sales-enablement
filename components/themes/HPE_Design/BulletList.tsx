'use client'

import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { motion } from 'framer-motion';
import { box_green_band, green_band } from '@/lib/images';
import Image from 'next/image';
import { Slide, SlidesEditorProps } from '@/types/slide-generation';


const BulletList: React.FC<SlidesEditorProps> = ({ mode, content }) => {
    const { setSlideState } = useTheme();

    const handleTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedTitle = event.target.value;

        setSlideState((prevState: Slide[]) =>
            prevState.map(section =>
            section === content ? { ...section, title: updatedTitle } : section
            )
        );
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const updatedContent = [...content.content];
        const findUpdatedContent = updatedContent.findIndex((item, indexx) => indexx === index);
        console.log(index)
        if (findUpdatedContent !== -1) {
            updatedContent[findUpdatedContent] = event.target.value;
        }

        setSlideState((prevState: Slide[]) =>
            prevState.map(section =>
                section === content ? { ...section, content: updatedContent } : section
            )
        );
    };



    return (
        <div className={`bg-white p-12 w-full ${mode === 'presenting' ? 'h-screen' : 'rounded-lg'}`}>
            <div className='relative h-full w-2/3'>
                <div>
                    {mode === 'editing' ? (
                        <div className='flex flex-col'>
                                <textarea value={content.title} onChange={handleTitle} className='text-2xl font-medium bg-transparent mt-5 w-full' />
                        </div>
                    ) : (
                        <div className='mt-[100px]'>
                                <div className='text-3xl font-[600]'>{content.title}</div>
                        </div>
                    )}
                    <Image src={green_band} alt='logo' className='w-[50px] mt-1' />
                </div>
                <div className='mt-7'>
                    {mode === 'editing' ? (
                        <div className='flex flex-col'>
                            {content.content.map((i, index) => (
                                <div className='flex gap-7 w-full' key={index}>
                                    <div className='text-6xl'>
                                        &#8226;
                                    </div>

                                    <textarea value={i} onChange={(evt) => handleChange(evt, index)} className='text-2xl font-medium bg-transparent mt-5 w-full' />
                                </div>
                            ))}

                        </div>
                    ) : (
                        <div className='mt-[100px]'>
                            {content.content.map((i, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className='animate-fadeIn animate-slideIn text-4xl font-medium text-white'
                                >
                                    <div className='flex gap-7 w-full' >
                                        <div className='text-black text-6xl'>
                                            &#8226;
                                        </div>
                                        <div className='text-3xl font-medium bg-transparent mt-5 text-black'>{i}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                </div>
                <Image src={box_green_band} alt='logo' className='mt-5 w-[50px] absolute -bottom-5' />
            </div>
        </div>
    );
};

export default BulletList;