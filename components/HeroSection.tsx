'use client'

import { banner_bg } from '@/lib/images'
import Image from 'next/image'
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PaperPlaneIcon } from '@radix-ui/react-icons'
import { Badge } from './ui/badge'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import { motion } from 'framer-motion'
import { Separator } from "@/components/ui/separator"


const HeroSection = () => {
    const examplePrompts = [
        'Key Strategies for Remote Team Collaboration',
        'Building an Effective Sales Team',
        'Redefining Office Productivity with AIGC',
        'Create a slide deck for a sales proposal to Microsoft',
    ]
    return (
        <section className="bg-[url('../assets/img/banner_bg.svg')] bg-no-repeat bg-center bg-top bg-cover flex flex-col items-center py-[62px] h-screen">
            {/* <div>

                <motion.h1
                    className="text-4xl font-bold text-gray-900 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    MLMppt.ai
                </motion.h1>
            </div> */}
            <motion.h3
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: .3 }}
                className="font-[700] bg-[url('../assets/img/banner_title_zs.svg')] bg-no-repeat bg-[50%] font-[500] text-[60px] pt-[10px] px-[10px] pb-[10px] mt-8" style={{ backgroundPosition: 'right 70px' }}>AI generates slide instantly</motion.h3>
            <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: .4 }}
            className='mt-3 text-[#585858] text-md'>Enter your Topics, AI automatically generates the slide</motion.p>

            <motion.div className='mt-10 w-[50%]'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: .5 }}
            >
                <Card className='shadow-[0_16px_36px_#542fb814] border-none rounded-[24px]'>
                    <CardHeader>
                        <CardTitle className='text-sm'>Enter topic to generate slide</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        <div>
                            <div className='relative mb-5'>
                                <Input className='p-[23px] rounded-[15px] border-2 border-[rgb(204_204_204)] focus-visible:ring-[#03A983]' type="text" placeholder="Key Strategies for Remote Team Collaboration" />
                                <Button className="absolute top-1 right-1 rounded-[12px] bg-[#03A983] shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#e25ad6] hover:shadow-[#e25ad6]" type="submit"><PaperPlaneIcon /></Button>
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
                                                {/* <SelectLabel>Pages</SelectLabel> */}
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
                                                {/* <SelectLabel>Fruits</SelectLabel> */}
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
                                                {/* <SelectLabel>Fruits</SelectLabel> */}
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
                                                {/* <SelectLabel>Fruits</SelectLabel> */}
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
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    )
}

export default HeroSection