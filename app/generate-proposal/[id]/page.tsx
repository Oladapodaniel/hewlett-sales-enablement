"use client";

import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import Spinner from '@/components/reusables/Spinner';
import Elipsis from '@/components/reusables/Elipsis';
import { ArrowRightIcon, CopyIcon, FileIcon, SquareDashedMousePointer, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableSection from '@/components/reusables/DragAndDropCards';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import { SectionProps } from '@/app/slide-deck/page';
import { Slide } from '@/types/slide-generation';

const GenerateProposalPage: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [selectedTheme, setSelectedTheme] = React.useState("1");
    const { slideStates, setSlideState } = useTheme();
    // const [sections, setSections] = useState([...slideStates])

    const contentThemes = [
        {
            name: "Superficial (High-level overview)",
            description: "Quick, broad summary for executives.",
            selected: "1"
        },
        {
            name: "Focus on Details",
            description: "Deeper explanation tailored to stakeholders.",
            selected: "2"
        },
        {
            name: "Technical Details",
            description: "In-depth specs for IT & technical buyers.",
            selected: "3"
        },
        {
            name: "Return on Investment (ROI)",
            description: "Cost-benefit analysis, financial impact",
            selected: "4"
        },
        {
            name: "Benefits",
            description: "Key advantages & value proposition for the audience.",
            selected: "5"
        },
        {
            name: "Use Case & Case Studies",
            description: "Real-world applications and success stories",
            selected: "6"
        },
    ]
    // interface Section {
    //     title: string;
    //     content: string[];
    // }

    function reorder(list: Slide[], startIndex: number, endIndex: number): Slide[] {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }
    // function reorder(list: any[], startIndex: number, endIndex: number): any[] {
    //     const result = [...list];
    //     const [removed] = result.splice(startIndex, 1);
    //     result.splice(endIndex, 0, removed);
    //     return result;
    // }

    const moveSection = (dragIndex: number, hoverIndex: number) => {
        // setSections((prev) => reorder(prev, dragIndex, hoverIndex));
        const order: Slide[] = reorder(slideStates, dragIndex, hoverIndex);
        setSlideState(order)
    };

    useEffect(() => {
        console.log(slideStates, 'here')
    })


    const headerRight = () => (
        <div className='flex items-center gap-3'>
            <div className='p-1 hover:bg-gray-100 rounded-full flex items-center justify-center'>
                <CopyIcon className="w-4 h-4" />
            </div>
            <div className='p-1 hover:bg-gray-100 rounded-full flex items-center justify-center'>
                <TrashIcon className="w-4 h-4 text-red-500" />
            </div>
        </div>
    )

    const collapsibleContent = (value: string[]) => (
        <>
            {value.map((content, index) => (
                <p key={index} className="text-gray-700 font-[300] text-lg">&#8226; &nbsp;{content}</p>
            ))}
        </>
    )

    const cardVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0 }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [])
    return (
        <>
            {
                loading ? (
                    <main className="bg-gradient-to-t from-primary-foreground flex items-center justify-center w-full min-h-screen">
                        <div className="flex flex-col items-center justify-center h-screen md:w-1/2">
                            <motion.h3
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: .3 }}
                                className="font-[500] bg-no-repeat bg-[50%] text-5xl md:text-[60px] pt-[10px] px-[10px] pb-[10px] mt-8 text-center leading-[4rem]" style={{ backgroundPosition: 'right 70px' }}>Generating a proposal for the structure of the deck<Elipsis /></motion.h3>
                            <div className='mt-10'>
                                <Spinner />
                            </div>
                        </div>
                    </main>
                ) : (
                    <main className='bg-gradient-to-t from-primary-foreground w-full min-h-screen'>
                        <div className="container mx-auto">
                            <div className="grid grid-cols-2 gap-4 py-6">
                                <div className="col-span-2 md:col-span-1">
                                    <div>
                                        <div className='flex items-center gap-3 p-2 mb-5'>
                                            <SquareDashedMousePointer className="w-5 h-5 text-primary" />
                                            <motion.span
                                                className="font-bold text-xl"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5 }}
                                            >Choose your theme</motion.span>
                                        </div>
                                        <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme}>
                                            <div className='grid grid-cols-2 gap-3'>
                                                {contentThemes.map((theme, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial="hidden"
                                                        variants={cardVariants}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.8, delay: (index + .5) * 0.2 }}
                                                        viewport={{ once: true }}
                                                        className='col-span-2 lg:col-span-1'
                                                    >
                                                        <Card className={`${theme.selected === selectedTheme ? "border border-primary" : ""}`}>
                                                            <CardHeader>
                                                                <CardTitle>{theme.name}</CardTitle>
                                                                <CardDescription>{theme.description}</CardDescription>
                                                            </CardHeader>
                                                            <CardContent>
                                                                <div className="flex items-end w-full space-x-2 justify-end mt-3">
                                                                    <RadioGroupItem value={theme.selected} id={index.toString()} onClick={() => setSelectedTheme(theme.selected)} />
                                                                    {/* <Label htmlFor="r1">Default</Label> */}
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </motion.div>)
                                                )}
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <div className='flex flex-col md:flex-row items-center justify-between gap-3 mb-5'>
                                        <div className='flex items-center gap-3'>
                                            <div className='flex items-center gap-3 p-2'>
                                                <FileIcon className="w-5 h-5 text-primary" />
                                                <motion.span
                                                    className="font-bold text-xl"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5 }}
                                                >Presentation Outline</motion.span>
                                            </div>
                                            <div className='bg-secondary px-4 py-1 rounded-full'>{slideStates.length} Slides</div>
                                        </div>
                                        <div>
                                            <Button onClick={() =>router.push("/slide-deck")} className="rounded-full text-lg bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]" type="submit">Generate Presentation
                                                <ArrowRightIcon className="w-6 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <DndProvider backend={HTML5Backend}>
                                        <div className="p-4">
                                            {slideStates.map((section, index) => (
                                                <DraggableSection
                                                    key={index}
                                                    section={section}
                                                    index={index}
                                                    moveSection={moveSection}
                                                    cardVariants={cardVariants}
                                                    headerRight={headerRight}
                                                    collapsibleContent={collapsibleContent(section.content)}
                                                />
                                            ))}
                                        </div>
                                    </DndProvider>

                                    {/* {presentationOutline.map((section, index) => (
                                        <DragAndDropCards key={index} items={section} >
                                        </DragAndDropCards>
                                    ))} */}
                                    {/* {presentationOutline.map((section, index) => (
                                        <motion.div key={index}
                                        className="p-2"
                                        initial="hidden"
                                        variants={cardVariants}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: (index + .5) * 0.2 }}
                                        viewport={{ once: true }}
                                        >
                                        <CollapsibleElement
                                            key={index}
                                            headerText={section.title}
                                            headerRight={headerRight()}
                                            collapsibleContent={collapsibleContent(section.content)}
                                            defaultOpen={index === 0}
                                        />
                                        </motion.div>
                                    ))} */}
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </main>
                )
            }
        </>
    );
};



export default GenerateProposalPage;