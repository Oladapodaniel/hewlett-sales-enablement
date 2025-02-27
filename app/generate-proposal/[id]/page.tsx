"use client";

import React, { useEffect, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion";
import Spinner from '@/components/reusables/Spinner';
import Elipsis from '@/components/reusables/Elipsis';
import DragAndDropCards from '@/components/reusables/DragAndDropCards';
import CollapsibleElement from '@/components/reusables/Collapsible';
import { ArrowRightIcon, CopyIcon, FileIcon, SquareDashedMousePointer, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableSection from '@/components/reusables/DragAndDropCards';
import { useRouter } from 'next/navigation';

const GenerateProposalPage: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [selectedTheme, setSelectedTheme] = React.useState("1");
    const [sections, setSections] = useState([
        {
            title: "Introduction",
            content: [
                'Sustainable data centers: are designed to minimize environmental impact by optimizing energy efficiency and utilizing renewable energy sources.',
                '2% of global CO2 emissions:  Additionally, many sustainable data centers implement advanced cooling technologies and innovative waste management practices to further decrease their ecological footprint. They play a crucial role in reducing the carbon footprint of the IT industry, which accounts for approximately'
            ]
        },
        {
            title: "Importance of Sustainability",
            content: [
                'Growing awareness about climate change and resource depletion drives the need for sustainable practices.',
                'Sustainable data centers help companies meet regulatory requirements and enhance corporate reputation.'
            ]
        },
        {
            title: "Key benefits of Sustainable Data Centers",
            content: [
                'Cost Savings: Reduced energy consumption leads to significant cost reductions.',
                'Resilience: Use of renewable energy and efficient cooling systems enhances operational resilience.',
                'Compliance: Aligns with global sustainability goals and regulations.'
            ]
        },
        {
            title: "Energy Efficiency Technologies",
            content: [
                'Free Cooling: Utilizes outside air to cool data centers, reducing reliance on traditional cooling systems.',
                'Virtualization: Increases server utilization rates, decreasing the number of physical servers needed.'
            ]
        },
        {
            title: "Renewable Energy Sources",
            content: [
                'Growing awareness about climate change and resource depletion drives the need for sustainable practices.',
                'Sustainable data centers help companies meet regulatory requirements and enhance corporate reputation.'
            ]
        },
        {
            title: "Renewable Energy Sources",
            content: [
                'Installation of on-site solar panels and wind turbines to power data centers.',
                'Partnerships with renewable energy providers to ensure a green energy supply.'
            ]
        },
        {
            title: "Innovative Cooling System",
            content: [
                'Liquid Cooling: Transfers heat more efficiently than air cooling, reducing energy consumption.',
                'Submersion Cooling: Servers are submerged in a non-conductive liquid, facilitating efficient heat dissipation.'
            ]
        },
        {
            title: "Case Study: Google Data Centers",
            content: [
                'Google aims to operate on 100% renewable energy and improve energy efficiency by constantly innovating.',
                'Their data centers are twice as energy-efficient as a typical enterprise data center.'
            ]
        },
    ])

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

    function reorder(list: any[], startIndex: number, endIndex: number): any[] {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    const moveSection = (dragIndex: number, hoverIndex: number) => {
        setSections((prev) => reorder(prev, dragIndex, hoverIndex));
    };


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
                                className="font-[500] bg-no-repeat bg-[50%] text-5xl md:text-[60px] pt-[10px] px-[10px] pb-[10px] mt-8 text-center leading-[4rem]" style={{ backgroundPosition: 'right 70px' }}>Generating a proposal for the struture of the deck<Elipsis /></motion.h3>
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
                                            <div className='flex flex-wrap justify-center md:justify-start gap-3'>
                                                {contentThemes.map((theme, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial="hidden"
                                                        variants={cardVariants}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.8, delay: (index + .5) * 0.2 }}
                                                        viewport={{ once: true }}
                                                    >
                                                        <Card className={`w-[350px] ${theme.selected === selectedTheme ? "border border-primary" : ""}`}>
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
                                            <div className='bg-secondary px-4 py-1 rounded-full'>{sections.length} Slides</div>
                                        </div>
                                        <div>
                                            <Button onClick={() =>router.push("/slide-deck")} className="rounded-full text-lg bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]" type="submit">Generate Presentation
                                                <ArrowRightIcon className="w-6 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                    <DndProvider backend={HTML5Backend}>
                                        <div className="p-4">
                                            {sections.map((section, index) => (
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