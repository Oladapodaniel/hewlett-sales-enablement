'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { AnimatePresence, motion } from 'framer-motion'
import { Separator } from "@/components/ui/separator"
import { themes, ThemesInterface } from '@/constants/placeholder'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext'



const HeroSection = () => {
    const router = useRouter();

    const themeContext = useTheme();
    const { setSelectedTheme } = themeContext;
    const examplePrompts = [
        'Key Strategies for Remote Team Collaboration',
        'Building an Effective Sales Team',
        'Redefining Office Productivity with AIGC',
        'Create a slide deck for a sales proposal to Microsoft',
    ]

    const [isThemeDisplayed, setIsThemeDisplayed] = useState<boolean>(false)
    const [allThemes, setallThemes] = useState<ThemesInterface[]>([])

    const chooseSelectedTheme = (index: number) => {
        setallThemes(prevThemes =>
            prevThemes.map((theme, i) => ({
                ...theme,
                selected: i === index
            }))
        );
        
        setSelectedTheme(allThemes[index])
    }

    useEffect(() => {
        setallThemes(themes)
    }, [themes])
    return (
        <section className="bg-[url('../assets/img/banner_bg.svg')] bg-no-repeat bg-center bg-top bg-cover flex flex-col items-center py-[62px] h-screen">
            <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: .3 }}
                className="font-[700] bg-[url('../assets/img/banner_title_zs.svg')] bg-no-repeat bg-[50%] font-[500] text-[60px] pt-[10px] px-[10px] pb-[10px] mt-8" style={{ backgroundPosition: 'right 70px' }}>AI generates slide instantly</motion.h3>
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: .5 }}
                className='mt-3 text-[#585858] font-[300] text-[24px] text-md'>Enter your Topics, AI automatically generates the slide</motion.p>

            <motion.div className='mt-10 w-[50%]'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: .7 }}
            >
                <motion.div
                    animate={{
                        top: isThemeDisplayed ? -200 : 0,
                        left: isThemeDisplayed ? -100 : 0,
                        height: isThemeDisplayed ? 600 : "auto",
                        width: isThemeDisplayed ? 1100 : "auto",
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{ position: "relative" }}
                >
                    <Card className='shadow-[0_16px_36px_#542fb814] border-none rounded-[24px] w-full h-full p-5'>
                        <CardHeader>
                            <AnimatePresence mode="wait">
                                {!isThemeDisplayed ? (
                                    <motion.div
                                        key={'entertopic'}
                                        initial={{ opacity: 0, x: 80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 80 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CardTitle className='text-sm text-[30px] font-[500]'>Enter topic to generate slide</CardTitle>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={'choosetheme'}
                                        initial={{ opacity: 0, x: 80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 80 }}
                                        transition={{ duration: 0.3, delay: 0.4 }}
                                    >
                                        <CardTitle className='text-sm text-[30px] font-[500]'>Choose your theme</CardTitle>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {/* <CardDescription>Card Description</CardDescription> */}
                        </CardHeader>
                        <CardContent>
                            <AnimatePresence mode="wait">

                                {!isThemeDisplayed ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, x: 80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 80 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className='relative mb-3'>
                                            <Input className='p-[23px] rounded-[15px] border-2 border-[rgb(204_204_204)] focus-visible:ring-[#03A983]' type="text" placeholder="Key Strategies for Remote Team Collaboration" />
                                            <Button onClick={() => setIsThemeDisplayed(!isThemeDisplayed)} className="absolute top-1 right-1 rounded-[12px] bg-[#03A983] shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]" type="submit"><PaperPlaneIcon /></Button>
                                        </div>
                                        <div>
                                            <div className="">
                                                {examplePrompts.map((i, index) => (
                                                    <Badge key={index} className="mt-2 bg-[#F5F5F5]" variant="secondary">{i}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <Separator className='my-7' />
                                        </div>
                                        <div className='flex gap-3'>
                                            <div>
                                                <div className='text-sm font-medium text-neutral-600 mb-1'>Pages</div>
                                                <Select>
                                                    <SelectTrigger className="w-[180px] h-8 bg-secondary border-none rounded-lg">
                                                        <SelectValue placeholder="Pages" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="apple">3 - 6</SelectItem>
                                                            <SelectItem value="banana">5 - 10</SelectItem>
                                                            <SelectItem value="blueberry">10 - 15</SelectItem>
                                                            <SelectItem value="grapes">10 - 20</SelectItem>
                                                            <SelectItem value="pineapple">20 -30</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <div className='text-sm font-medium text-neutral-600 mb-1'>Output Language</div>
                                                <Select>
                                                    <SelectTrigger className="w-[180px] h-8 bg-secondary border-none rounded-lg">
                                                        <SelectValue placeholder="Language" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="apple">Africaans</SelectItem>
                                                            <SelectItem value="banana">Deutsch</SelectItem>
                                                            <SelectItem value="blueberry">German</SelectItem>
                                                            <SelectItem value="grapes">English (US)</SelectItem>
                                                            <SelectItem value="grapes">English (UK)</SelectItem>
                                                            <SelectItem value="pineapple">Español</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <div className='text-sm font-medium text-neutral-600 mb-1'>Tone</div>
                                                <Select>
                                                    <SelectTrigger className="w-[180px] h-8 bg-secondary border-none rounded-lg">
                                                        <SelectValue placeholder="Tone" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="apple">General</SelectItem>
                                                            <SelectItem value="banana">Professional</SelectItem>
                                                            <SelectItem value="blueberry">Formal</SelectItem>
                                                            <SelectItem value="grapes">Informal</SelectItem>
                                                            <SelectItem value="pineapple">Persuasive</SelectItem>
                                                            <SelectItem value="pineafffpple">Inspirational</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <div className='text-sm font-medium text-neutral-600 mb-1'>Audience</div>
                                                <Select>
                                                    <SelectTrigger className="w-[180px] h-8 bg-secondary border-none rounded-lg">
                                                        <SelectValue placeholder="Audience" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="apple">General</SelectItem>
                                                            <SelectItem value="banana">Business</SelectItem>
                                                            <SelectItem value="blueberry">Investor</SelectItem>
                                                            <SelectItem value="grapes">Teacher</SelectItem>
                                                            <SelectItem value="pineapple">Student</SelectItem>
                                                            <SelectItem value="pineapple">Supervisor</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={'themelist'}
                                        initial={{ opacity: 0, x: 80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 80 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className='flex gap-5'>
                                            {allThemes.map((theme, index) => (
                                                <div key={index} onClick={() => chooseSelectedTheme(index)}>
                                                    <motion.div
                                                        key={'themelistcard'}
                                                        initial={{ opacity: 0, x: 80, display: 'none' }}
                                                        animate={{ opacity: 1, x: 0, display: 'block' }}
                                                        exit={{ opacity: 0, x: 80 }}
                                                        transition={{ duration: 0.5, delay: 0.2 * index }}>
                                                        <div className={`${theme.selected ? "border-[#027d61]" : "border-4"} border-4 hover:border-4 rounded-[15px]  overflow-hidden relative`}>
                                                            <Image className='transition-transform duration-300 ease-in-out transform hover:scale-150 hover:cursor-pointer rounded-[10px]' src={theme.preview} alt={theme.name} width={200} height={200} />
                                                            <div className='absolute bottom-0 pt-4 pb-2 px-4 text-white w-full'>
                                                                <div className='bg-gradient-to-t from-black opacity-50 to-transparent absolute inset-0'></div>
                                                                <div className='relative'>{theme.name}</div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            ))}
                                        </div>
                                        <motion.div
                                            key={'buttonactions'}
                                            initial={{ opacity: 0, display: 'none' }}
                                            animate={{ opacity: 1, display: 'block' }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                        >
                                            <div className="flex gap-5 justify-end mt-[80px]">
                                                <div
                                                    className="hover:bg-[#04e1af] hover:text-white border hover:border-transparent rounded-full p-2 cursor-pointer"
                                                    onClick={() => setIsThemeDisplayed(!isThemeDisplayed)}
                                                >
                                                    <motion.div whileHover={{ scale: 1.6 }} className="flex items-center justify-center">
                                                        <ArrowLeft />
                                                    </motion.div>
                                                </div>
                                                <div
                                                    className="rounded-full hover:bg-[#04e1af] border hover:text-white hover:border-transparent p-2 cursor-pointer"
                                                    onClick={() => router.push('/slide-deck')}
                                                >
                                                    <motion.div whileHover={{ scale: 1.6 }} className="flex items-center justify-center">
                                                        <ArrowRight />
                                                    </motion.div>
                                                </div>
                                            </div>

                                        </motion.div>
                                    </motion.div>
                                )
                                }
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </section >
    )
}

export default HeroSection