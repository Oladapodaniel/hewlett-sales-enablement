'use client';

import React from "react"
import { motion } from "framer-motion";
import ResizableTextArea from "@/components/reusables/ResizableTextArea";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

const RefineRequestPrompt: React.FC = () => {
    const router = useRouter();
    const AIResponseQuestions = [
        'Before we get started, I need to ask you a few questions to better understand which content you need.',
        'Time Horizon: Are you looking for insights on B2B customer service in the next 5 - 10 years, or a long term vision beyond that? AI Scope: Should the focus be on existing AI advancements or more speculative, futuristic AI capabilities? What is the target audience of your request? What is the desired length of your request?What is the desired format of your request? ',
        'What is the desired level of detail in your request? What is the purpose of your request? the desired level of detail in your request? What is the purpose of your request? ',
    ]
    const [value, setValue] = React.useState<string>('');
    const handleChange = (value: string) => {
        setValue(value);
    };
    return (
        <main className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center justify-center md:w-1/2">
                <motion.h3
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: .3 }}
                    className="font-[700] bg-[url('../assets/img/banner_title_zs.svg')] bg-no-repeat bg-[50%] font-[500] text-[60px] pt-[10px] px-[10px] pb-[10px] mt-8 text-center" style={{ backgroundPosition: 'right 70px' }}>Let me ask you some questions</motion.h3>
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: .5 }}
                    className='mt-3 text-[#585858] font-[400] text-[24px] text-md'>To better understand which content you need</motion.p>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: .7 }}
                    className='mt-8 text-[#585858] font-[300] text-[24px] text-md pb-28'>
                    {AIResponseQuestions.map((question, index) => (
                        <div key={index} className="mt-5">{question}</div>
                    ))}
                </motion.div>
                {/* <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: .7 }}
                    className='mt-8 text-[#585858] font-[300] text-[24px] text-md w-full'> */}
                    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg pb-10">
                        <div className="relative md:w-1/2 mx-auto">
                            <ResizableTextArea
                                value={value}
                                onChange={handleChange}
                                placeholder="Enter your response here..."
                            />
                            <Button onClick={() => router.push('/generate-proposal/ks388sqz512g1oc?mode=doc#card-wslygcru2f2yfpb')} className="absolute bottom-1 right-1 w-[40px] h-[40px] rounded-full bg-[#03A983] shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]" type="submit"><PaperPlaneIcon /></Button>
                        </div>
                    </div>
                {/* </motion.div> */}
            </div>
        </main>
    );
}

export default RefineRequestPrompt