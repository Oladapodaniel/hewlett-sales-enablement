'use client'

import Image from 'next/image'
import React, { useEffect, useState, ChangeEvent, useRef, useCallback } from 'react'
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
import { ArrowLeft, ArrowRight, ClipboardPaste, ImportIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext'
import DragAndDropUpload from './reusables/DragAndDropFileUpload'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from './ui/textarea'
import { salesforce_logo } from '@/lib/images'
import ResizableTextArea from './reusables/ResizableTextArea'




const HeroSection = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [manualFocus, setManualfocus] = useState<any>(null)



    useEffect(() => {
        textAreaRef.current = manualFocus;
    }, [manualFocus])





    const themeContext = useTheme();
    const { setSelectedTheme } = themeContext;
    const examplePrompts = [
        'Driving Consistent experiences across your hybrid cloud',
        'Deployment Automation Solution',
        // 'Redefining Office Productivity with AIGC',
        // 'Create a slide deck for a sales proposal to Microsoft',
    ]

    const [isThemeDisplayed, setIsThemeDisplayed] = useState<boolean>(false)
    const [allThemes, setallThemes] = useState<ThemesInterface[]>([])
    const [isCustomerDataDisplayed, setIsCustomerDataDisplayed] = useState<boolean>(false)

    const audience = [
        'Large Enterprises',
        'SMBs',
        'Government & Public Sector',
        'Cloud & MSPs',
        'Research & HPC',
        'Industrial & Manufacturing',
        'Healthcare & Life Sciences',
        'Channel Partners'
    ]

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
                className="font-[700] bg-[url('../assets/img/banner_title_zs.svg')] bg-no-repeat bg-[50%] text-[60px] pt-[10px] px-[10px] pb-[10px] mt-8 text-center" style={{ backgroundPosition: 'right 70px' }}>AI generates slide instantly</motion.h3>
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: .5 }}
                className='mt-3 text-[#585858] font-[300] text-[24px] text-md text-center'>Enter your Topics, AI automatically generates the slide</motion.p>

            <motion.div className='mt-10 lg:w-1/2'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: .7 }}
            >
                <div>
                    <Card className='shadow-[0_16px_36px_#542fb814] border-none rounded-[24px] w-full h-full md:p-5'>
                        <CardHeader>
                            <motion.div
                                key={'entertopic'}
                                initial={{ opacity: 0, x: 80 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 80 }}
                                transition={{ duration: 0.3 }}
                            >
                                <CardTitle className='text-sm text-[30px] font-[500]'>Describe which slide deck you need</CardTitle>
                            </motion.div>
                        </CardHeader>
                        <CardContent>
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: 80 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 80 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className='relative mb-3'>
                                    <ResizableTextArea
                                        value={value}
                                        placeholder='Driving Consistent experiences across your hybrid cloud'
                                        onChange={(value: string) => setValue(value)}
                                        setTextAreaRef={(value) => {
                                            setManualfocus(value)
                                        }}

                                    />
                                    <Button onClick={() => router.push('/refine-request-topic')} className="absolute bottom-1 right-1 rounded-[12px] bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]" type="submit"><PaperPlaneIcon /></Button>
                                </div>
                                <div>
                                    <div className="space-x-2">
                                        {examplePrompts.map((i, index) => (
                                            <Badge key={index} onClick={() => {
                                                setValue(i)
                                                textAreaRef.current?.focus();

                                            }} className="mt-2 text-primary text-md font-[400] border border-primary bg-white cursor-pointer" variant="secondary">{i}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Separator className='my-7' />
                                </div>
                                <div className='flex flex-wrap gap-3'>
                                    <div>
                                        <div className='text-sm font-medium text-neutral-600 mb-1'>Slides</div>
                                        <Select>
                                            <SelectTrigger className="w-[160px] bg-secondary border-none rounded-lg">
                                                <SelectValue placeholder="Slides" />
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
                                            <SelectTrigger className="w-[160px] bg-secondary border-none rounded-lg">
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
                                            <SelectTrigger className="w-[160px] bg-secondary border-none rounded-lg">
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
                                            <SelectTrigger className="w-[160px] bg-secondary border-none rounded-lg">
                                                <SelectValue placeholder="Audience" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {audience.map((i, index) => (<SelectItem className='text-lg font-[300]' value={index.toString()}>{i}</SelectItem>))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </motion.div>
                            <Separator className='my-7' />
                            <div className='flex flex-wrap gap-5'>
                                <div>
                                    <Dialog>
                                        <DialogTrigger>
                                            <div className='bg-secondary px-4 py-2 rounded-md flex gap-2 items-center'>
                                                <ImportIcon />
                                                Import files</div>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className='text-2xl leading-tight'>Upload files</DialogTitle>
                                                <DialogDescription className='text-lg font-[300] leading-[0.5]'>
                                                    Drag and drop your files here or click to browse.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className='mt-5'>
                                                <DragAndDropUpload />
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <Dialog>
                                    <DialogTrigger>
                                        <div className='bg-secondary px-4 py-2 rounded-md flex gap-2 items-center'>
                                            <ClipboardPaste />
                                            Paste In Text</div>
                                    </DialogTrigger>
                                    <DialogContent className="h-[80%] min-w-[80%] flex items-start flex-col bg-gradient-to-tr from-white via-white to-green-100">
                                        <DialogHeader>
                                            <DialogTitle className='text-2xl leading-tight'>Paste in text</DialogTitle>
                                            <DialogDescription className='text-lg font-[300] leading-[0.5]'>
                                                Add the notes, outlines, or contents you'd like us to use.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className='mt-5 w-full h-full'>
                                            <Textarea className='w-full h-full' placeholder='Enter your text here ...' />
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <Select>
                                    <SelectTrigger className="w-[180px]  bg-secondary border-none rounded-lg text-md">
                                        <Image src={salesforce_logo} alt='logo' width={30} height={50} />
                                        <SelectValue placeholder="Customer Data" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="apple">Andrew Beck - Anheuser-Busch Companies​</SelectItem>
                                            <SelectItem value="banana">Sam Meyr - Ford Motor Company​</SelectItem>
                                            <SelectItem value="blueberry">Dlynne Schade - Mc Donalds Inc.​</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </section >
    )
}

export default HeroSection