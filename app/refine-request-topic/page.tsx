'use client';

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion";
import ResizableTextArea from "@/components/reusables/ResizableTextArea";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { GenerateInformedSlideInstruction, RefineSlideAIModelEnquiry } from "@/constants/modelInstructions";
import { EnterPromptSlide } from "@/lib/actions/slide-generation/enter-prompt-slide";
import { extractOpenAIResponseContent, OpenAIResponse } from "@/lib/utils";
import Elipsis from "@/components/reusables/Elipsis";
import { QuestionTypeProps, Slide } from "@/types/slide-generation";
import Spinner from "@/components/reusables/Spinner";
import { useTheme } from "@/context/ThemeContext";

const RefineRequestPrompt: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [generatingSlides, setgeneratingSlides] = useState<boolean>(false);
    const { setSlideState } = useTheme();
    // const AIResponseQuestions = [
    //     'Time Horizon: Are you looking for insights on B2B customer service in the next 5 - 10 years, or a long term vision beyond that?',
    //     'AI Scope: Should the focus be on existing AI advancements or more speculative, futuristic AI capabilities?',
    //     'What is the target audience of your request? What is the desired length of your request?What is the desired format of your request? '
    // ]
    const [value, setValue] = React.useState<string>('');
    const [AIResponseQuestions, setAIResponseQuestions] = useState<QuestionTypeProps[]>([])
    const [userResponse, setUserResponse] = useState<string>("");

    const handleChange = (value: string) => {
        setValue(value);
    };

    const refineUserPromptQuestions = async () => {
        setLoading(true);

        const query = new URLSearchParams(window.location.search);
        const encodedPrompt = query.get('user_prompt');
        if (!encodedPrompt) {
            console.error('No user prompt found in the query string');
            return;
        }
        const userPrompt = atob(encodedPrompt);

        const payload = RefineSlideAIModelEnquiry(userPrompt);

        const passedValue = {
            files: payload.files,
            user_prompt: payload.user_prompt,
            username: payload.username,
            password: payload.password,
            temperature: payload.temperature
        }
        try {

            const result = await EnterPromptSlide(passedValue) as OpenAIResponse;
            setLoading(false);

            const generatedSlideContent = extractOpenAIResponseContent(result);
            console.log(generatedSlideContent, 'your questions')
            setAIResponseQuestions(generatedSlideContent.questions)
        } catch (error) {
            setLoading(false);
            console.error(error)
        }
    }

    const generateInformedSlideContent = async () => {
        setUserResponse(value);
        setValue("")
        setgeneratingSlides(true);
        const query = new URLSearchParams(window.location.search);
        const encodedPrompt = query.get('user_prompt');
        const pages = query.get('pages') || "";
        const tone = query.get('tone') || "";
        const output_language = query.get('output_language') || "";
        const audience = query.get('audience') || "";
        if (!encodedPrompt) {
            console.error('No user prompt found in the query string');
            return;
        }
        const user_prompt = atob(encodedPrompt);
        const values = {
            user_prompt,
            questions: AIResponseQuestions,
            user_response: value,
            pages: atob(pages),
            tone: atob(tone),
            output_language: atob(output_language),
            audience: atob(audience)
        }

        const payload = GenerateInformedSlideInstruction(values);

        const passedValue = {
            files: payload.files,
            user_prompt: payload.user_prompt,
            username: payload.username,
            password: payload.password,
            temperature: payload.temperature
        }
        try {

            const result = await EnterPromptSlide(passedValue) as OpenAIResponse;
            const generatedSlideContent = extractOpenAIResponseContent(result);
            setgeneratingSlides(false);
            setSlideState(generatedSlideContent.slides.map((i: Slide) => ({ ...i, thumbnail: "" })))
            router.push('/generate-proposal/hewlett-sales-enablementblobmaincomponentshemesHPE_DesignSlideDeck')
            
        } catch (error) {
            setgeneratingSlides(false);
            console.error(error)
        }
    }

    useEffect(() => {
        refineUserPromptQuestions();
    }, [])

    return (
        <div className="container mx-auto">
            <main className="flex items-center justify-center w-full">
                <div className="flex flex-col items-center justify-center w-full  pb-[200px] xl:w-3/5">
                    <motion.h3
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: .3 }}
                        className="font-[700] bg-[url('../assets/img/banner_title_zs.svg')] bg-no-repeat bg-[50%] font-[500] text-[60px] pt-[10px] px-[10px] pb-[10px] mt-8 text-center" style={{ backgroundPosition: 'right 70px' }}>Let me ask you some questions {loading && <Elipsis />}</motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: .5 }}
                        className='text-black font-[400] text-[24px] text-md text-center'>To better understand which content you need,  I need to ask you a few questions.</motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="mt-8 text-[#585858] font-[400] text-[24px] text-md"
                    >
                        {loading && (<div className="flex justify-center ">
                            <Spinner />
                        </div>)}
                        {AIResponseQuestions.map(({ question, id }) => (
                            <motion.div
                                key={id}
                                className="mt-5 flex gap-4 items-start"
                                style={{ overflow: "hidden" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: id * 0.5 }}
                            >
                                <div className="text-3xl">&#8226;</div>
                                <div>
                                    {question.split(" ").map((word, index) => (
                                        <motion.span
                                            key={index}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            // Each word in the item is revealed at 100ms intervals
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="inline-block mr-1"
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    {userResponse && (
                        <div className="flex justify-end w-full">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-1/2 bg-gray-100 mt-8 text-black font-[400] text-[20px] text-md p-3 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                            >
                                {userResponse}
                            </motion.div>
                        </div>
                    )}
                    {generatingSlides && (
                        <div className="flex w-full justify-end mt-3">
                            <Spinner size="5" />
                        </div>
                    )}
                    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg pb-10">
                        <div className="relative w-4/5 xl:w-1/2 mx-auto">
                            <ResizableTextArea
                                value={value}
                                onChange={handleChange}
                                placeholder="Enter your response here..."
                            />
                            <Button onClick={generateInformedSlideContent} className="absolute bottom-1 border-2 border-[#04e1af] right-1 w-[40px] h-[40px] rounded-lg bg-[#03A983] shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]" type="submit"><PaperPlaneIcon /></Button>
                        </div>
                    </div>
                    {/* </motion.div> */}
                </div>
            </main>
        </div>
    );
}


export default RefineRequestPrompt