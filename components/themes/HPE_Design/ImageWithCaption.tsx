'use client'

import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { motion } from 'framer-motion';
import { box_green_band, green_band, image_placeholder_theme } from '@/lib/images';
import Image from 'next/image';
import { SectionProps } from '@/app/slide-deck/page';

interface ImageWithCaptionProps {
    mode: 'editing' | 'presenting';
    content: SectionProps
}

const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({ mode, content }) => {
        const { setSlideState } = useTheme();


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
       const updatedContent = [...content.content];
               const findUpdatedContent = updatedContent.findIndex((item, indexx) => indexx === index);
               if (findUpdatedContent !== -1) {
                   updatedContent[findUpdatedContent] = event.target.value;
               }
       
               setSlideState((prevState: SectionProps[]) =>
                   prevState.map(section =>
                       section === content ? { ...section, content: updatedContent } : section
                   )
               );
    };



    return (
        <div className={`bg-white py-12 w-full ${mode === 'presenting' ? 'h-screen' : 'rounded-lg'}`}>
            <div className='h-full relative'>
                <div className='px-12'>
                    <div className='text-3xl font-[600]'>{content.title}</div>
                    <Image src={green_band} alt='logo' className='w-[50px] mt-1' />
                </div>
                <div className='mt-7'>
                    <Image src={image_placeholder_theme} alt='logo' className='w-full h-[350px] mt-1 object-cover' />
                </div>
                <div className='mt-7 w-2/3'>
                    {mode === 'editing' ? (
                        <div className='flex flex-col px-12'>
                            {content.content.map((i, index) => (
                                <div className='flex gap-7 w-full' key={index}>
                                    <textarea value={i} onChange={(evt) => handleChange(evt, index)} className='text-2xl font-medium bg-transparent mt-5 w-full' />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='px-12'>
                            {content.content.map((i, index) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    key={index}
                                    className='animate-fadeIn animate-slideIn text-4xl font-medium text-white'
                                >
                                    <div className='flex gap-7 w-full' key={index}>
                                        <div className='text-3xl font-medium bg-transparent mt-5 text-black'>{i}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                </div>
                <div className='px-12'>
                    <Image src={box_green_band} alt='logo' className='mt-5 w-[50px] absolute -bottom-5' />
                </div>
            </div>
        </div>
    );
};

export default ImageWithCaption;