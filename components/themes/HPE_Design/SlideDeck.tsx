import React, { useState } from "react";
import Image from "next/image";
import { purple_theme_thumbnail, purple_theme_thumbnail_2, thumbnail_fifth, thumbnail_first, thumbnail_fourth, thumbnail_second, thumbnail_third } from "@/lib/images";
import { SectionProps } from "@/app/slide-deck/page"
import TitlePage from "./TitlePage";
import SectionHeader from "./SectionHeader";
import BulletList from "./BulletList";
import ImageWithCaption from "./ImageWithCaption";
import ClosingSide from "./ClosingSlide";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlignLeft, ArrowRightIcon, ChevronDown, SparklesIcon } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";


interface SlideDeckProps {
    type: 'editing' | 'presenting';
    slides: SectionProps[];
}

const SlideDeck: React.FC<SlideDeckProps> = ({ type, slides }) => {
    const router = useRouter();
    const [titleOpen, setTitleOpen] = useState<boolean>(false);
    const [sectionHeaderOpen, setsectionHeaderOpen] = useState<boolean>(false);
    const [bulletListOpen, setbulletListOpen] = useState<boolean>(false);
    const [imageWithCaptionOpen, setimageWithCaptionOpen] = useState<boolean>(false);
    const [closingSlideOpen, setclosingSlideOpen] = useState<boolean>(false);

    const editWithAIOptions = [
        { text: "Improve Writing" },
        { text: "Fix Spelling & Grammar" },
        { text: "Translate" },
        { text: "Make Longer" },
        { text: "Make Shorter" },
        { text: "Simplify Language" },
        { text: "Be more specific" },
        { text: "Add a smart summary" },
    ]

    return (
        <>
            <div className="flex justify-end p-4">
                <Button onClick={() => router.push("/present")} className="rounded-full text-lg bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]" type="submit">Present
                    <ArrowRightIcon className="w-6 h-5" />
                </Button>
            </div>
            <div className="grid grid-cols-5 gap-6">
                <div className="col-span-1">
                    <div className="fixed w-[155px] shadow-[0_16px_36px_#542fb814] max-h-[700px] overflow-scroll mt-[70px] bg-white p-2">
                        <div className="flex flex-col gap-4">
                            <Image src={thumbnail_first} alt="logo" width={155} height={155} className="rounded-md" />
                            <Image src={thumbnail_second} alt="logo" width={155} height={155} className="rounded-md" />
                            <Image src={thumbnail_third} alt="logo" width={155} height={155} className="rounded-md" />
                            <Image src={thumbnail_fourth} alt="logo" width={155} height={155} className="rounded-md" />
                            <Image src={thumbnail_fifth} alt="logo" width={155} height={155} className="rounded-md" />
                        </div>
                    </div>
                </div>
                {/* <div className="w-[400px] h-[700px] mt-[70px]"></div> */}
                <div className="col-span-3 flex flex-col gap-10">
                    {
                        slides.map((slide, index) => (
                            <div key={index}>
                                {slide.templateSlide === 'TitleSlide' ? (
                                    <div className="relative group" >
                                        <DropdownMenu open={titleOpen}>
                                            <DropdownMenuTrigger>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="absolute mt-2 min-w-[250px]">
                                                <DropdownMenuLabel>
                                                    <div className="flex items-center gap-3">
                                                        <SparklesIcon className="w-4 h-4 text-primary" />
                                                        <div className="text-lg">Edit with AI</div>
                                                    </div>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <Input placeholder="Ask AI to..." />
                                                {editWithAIOptions.map((i, index) => <DropdownMenuItem key={index} className="text-lg font-[300] cursor-pointer" onClick={() => setTitleOpen(false)}><AlignLeft /> &nbsp;{i.text}</DropdownMenuItem>)}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="absolute  hidden group-hover:block bg-white p-2 rounded shadow-lg text-white">
                                            <div className="flex gap-2" onClick={() => setTitleOpen(!titleOpen)}>
                                                <SparklesIcon className="w-4 h-4 text-primary" />
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            <TitlePage mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'SectionHeader' ? (
                                    <div className="relative group">
                                        <DropdownMenu open={sectionHeaderOpen}>
                                            <DropdownMenuTrigger>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="absolute mt-2 min-w-[250px]">
                                                <DropdownMenuLabel>
                                                    <div className="flex items-center gap-3">
                                                        <SparklesIcon className="w-4 h-4 text-primary" />
                                                        <div className="text-lg">Edit with AI</div>
                                                    </div>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <Input placeholder="Ask AI to..." />
                                                {editWithAIOptions.map((i, index) => <DropdownMenuItem key={index} className="text-lg font-[300] cursor-pointer" onClick={() => setsectionHeaderOpen(false)}><AlignLeft /> &nbsp;{i.text}</DropdownMenuItem>)}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-white">
                                            <div className="flex gap-2" onClick={() => setsectionHeaderOpen(!sectionHeaderOpen)}>
                                                <SparklesIcon className="w-4 h-4 text-primary" />
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            <SectionHeader mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'BulletList' ? (
                                    <div className="relative group">
                                        <DropdownMenu open={bulletListOpen}>
                                            <DropdownMenuTrigger>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="absolute mt-2 min-w-[250px]">
                                                <DropdownMenuLabel>
                                                    <div className="flex items-center gap-3">
                                                        <SparklesIcon className="w-4 h-4 text-primary" />
                                                        <div className="text-lg">Edit with AI</div>
                                                    </div>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <Input placeholder="Ask AI to..." />
                                                {editWithAIOptions.map((i, index) => <DropdownMenuItem key={index} className="text-lg font-[300] cursor-pointer" onClick={() => setbulletListOpen(false)}><AlignLeft /> &nbsp;{i.text}</DropdownMenuItem>)}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-white">
                                            <div className="flex gap-2" onClick={() => setbulletListOpen(!bulletListOpen)}>
                                                <SparklesIcon className="w-4 h-4 text-primary" />
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            <BulletList mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'ImageWithCaption' ? (
                                    <div className="relative group">
                                        <DropdownMenu open={imageWithCaptionOpen}>
                                            <DropdownMenuTrigger>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="absolute mt-2 min-w-[250px]">
                                                <DropdownMenuLabel>
                                                    <div className="flex items-center gap-3">
                                                        <SparklesIcon className="w-4 h-4 text-primary" />
                                                        <div className="text-lg">Edit with AI</div>
                                                    </div>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <Input placeholder="Ask AI to..." />
                                                {editWithAIOptions.map((i, index) => <DropdownMenuItem key={index} className="text-lg font-[300] cursor-pointer" onClick={() => setimageWithCaptionOpen(false)}><AlignLeft /> &nbsp;{i.text}</DropdownMenuItem>)}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-white">
                                            <div className="flex gap-2" onClick={() => setimageWithCaptionOpen(!imageWithCaptionOpen)}>
                                                <SparklesIcon className="w-4 h-4 text-primary" />
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            <ImageWithCaption mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'ClosingSlide' ? (
                                    <div className="relative group">
                                        <DropdownMenu open={closingSlideOpen}>
                                            <DropdownMenuTrigger>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="absolute mt-2 min-w-[250px]">
                                                <DropdownMenuLabel>
                                                    <div className="flex items-center gap-3">
                                                        <SparklesIcon className="w-4 h-4 text-primary" />
                                                        <div className="text-lg">Edit with AI</div>
                                                    </div>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <Input placeholder="Ask AI to..." />
                                                {editWithAIOptions.map((i, index) => <DropdownMenuItem key={index} className="text-lg font-[300] cursor-pointer" onClick={() => setclosingSlideOpen(false)}><AlignLeft /> &nbsp;{i.text}</DropdownMenuItem>)}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-white">
                                            <div className="flex gap-2" onClick={() => setclosingSlideOpen(!closingSlideOpen)}>
                                                <SparklesIcon className="w-4 h-4 text-primary" />
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            <ClosingSide mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : null
                                }
                            </div>
                        )
                        )
                    }
                </div>
                <div className="col-span-1">

                </div>
            </div>
        </>
    );
}

export default SlideDeck