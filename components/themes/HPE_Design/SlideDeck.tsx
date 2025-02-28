import React, { useRef, useState, useMemo } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Image, { StaticImageData } from "next/image";
import { SectionProps } from "@/app/slide-deck/page"
import TitlePage from "./TitlePage";
import SectionHeader from "./SectionHeader";
import BulletList from "./BulletList";
import ImageWithCaption from "./ImageWithCaption";
import ClosingSide from "./ClosingSlide";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CircleMinus, CirclePlus, Download, Play, SparklesIcon } from "lucide-react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input";
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { useTheme } from "@/context/ThemeContext";
import { thumbnail_fifth, thumbnail_first, thumbnail_fourth, thumbnail_second, thumbnail_third } from "@/lib/images";


interface SlideDeckProps {
    type: 'editing' | 'presenting';
    slides: SectionProps[];
}

const SlideDeck: React.FC<SlideDeckProps> = ({ type, slides }) => {
    const router = useRouter();
    const [slidesState, setSlides] = useState(slides);
    const { slideStates, setSlideState } = useTheme()
    // const [titleOpen, setTitleOpen] = useState<boolean>(false);
    // const [sectionHeaderOpen, setsectionHeaderOpen] = useState<boolean>(false);
    // const [bulletListOpen, setbulletListOpen] = useState<boolean>(false);
    // const [imageWithCaptionOpen, setimageWithCaptionOpen] = useState<boolean>(false);
    // const [closingSlideOpen, setclosingSlideOpen] = useState<boolean>(false);

    // const editWithAIOptions = [
    //     { text: "Improve Writing" },
    //     { text: "Fix Spelling & Grammar" },
    //     { text: "Translate" },
    //     { text: "Make Longer" },
    //     { text: "Make Shorter" },
    //     { text: "Simplify Language" },
    //     { text: "Be more specific" },
    //     { text: "Add a smart summary" },
    // ]


    const moveSlide = (fromIndex: number, toIndex: number) => {
        const updatedSlides = [...slidesState];
        const [movedSlide] = updatedSlides.splice(fromIndex, 1);
        updatedSlides.splice(toIndex, 0, movedSlide);
        setSlides(updatedSlides);
        setSlideState(slidesState)
    };

    const duplicateSlide = (index: number) => {
        const newSlides = [...slidesState];
        const slideToDuplicate = newSlides[index];
        newSlides.splice(index + 1, 0, { ...slideToDuplicate });
        setSlides(newSlides);
    }
    const removeSlide = (index: number) => {
        const updatedSlides = slidesState.filter((_, i) => i !== index);
        setSlides(updatedSlides);
    };

    const imagesArray = [
        {
            thumbnail: thumbnail_first,
            templateSlide: 'TitleSlide'
        },
        {
            thumbnail: thumbnail_second,
            templateSlide: 'SectionHeader'
        },
        {
            thumbnail: thumbnail_third,
            templateSlide: 'BulletList'
        },
        {
            thumbnail: thumbnail_fourth,
            templateSlide: 'ImageWithCaption'
        },
        {
            thumbnail: thumbnail_fifth,
            templateSlide: 'ClosingSlide'
        }
    ];

    const slideStateWithThumbnail = useMemo(() => {
        return slidesState.map(slide => {
            const image = imagesArray.find(img => img.templateSlide === slide.templateSlide);
            if (!image) {
                return
            }
            return {
                ...slide,

                thumbnail: image.thumbnail
            };
        });
    }, [slidesState, imagesArray]);


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex gap-4 justify-end p-4">
                <Button onClick={() => router.push("/present")} variant={'secondary'} className="rounded-full text-lg bg-secondary text-black shadow-lg" type="submit">
                    <Download /> Download
                </Button>
                <Button onClick={() => router.push("/present")} className="rounded-full text-lg bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]" type="submit">
                    <Play /> Present
                </Button>
            </div>

            <div className="grid grid-cols-5 gap-6">
                <div className="col-span-1">
                    <div className="fixed w-[170px] shadow-[0_16px_36px_#542fb814] border rounded-md max-h-[700px] overflow-scroll bg-white p-2">
                        <div className="flex flex-col gap-4">
                            {(slideStateWithThumbnail.length > 0 ? slideStateWithThumbnail : slidesState).map((slide, index) => (
                                slide ? (
                                    <SlideThumbnail
                                        key={index}
                                        index={index}
                                        src={slide.thumbnail}
                                        alt={`Slide ${index + 1}`}
                                        moveSlide={moveSlide}
                                        duplicateSlide={() => duplicateSlide(index)}
                                        removeSlide={() => removeSlide(index)}
                                    />
                                ) : null
                                // <div key={index}>side deck</div>
                            ))}
                        </div>

                    </div>
                </div>
                <div className="col-span-4 flex flex-col gap-10">
                    {
                        (slideStates.length > 0 ? slideStates : slidesState).map((slide, index) => (
                            <div key={index}>
                                {slide.templateSlide === 'TitleSlide' ? (
                                    <div className="relative group">
                                        {/* <DropdownMenu open={titleOpen}>
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
                                        </div> */}
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            <TitlePage mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'SectionHeader' ? (
                                    <div className="relative group">
                                        {/* <DropdownMenu open={sectionHeaderOpen}>
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
                                        </div> */}
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            <SectionHeader mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'BulletList' ? (
                                    <div className="relative group">
                                        {/* <DropdownMenu open={bulletListOpen}>
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
                                        </div> */}
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            <BulletList mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'ImageWithCaption' ? (
                                    <div className="relative group">
                                        {/* <DropdownMenu open={imageWithCaptionOpen}>
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
                                        </div> */}
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            <ImageWithCaption mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'ClosingSlide' ? (
                                    <div className="relative group">
                                        {/* <DropdownMenu open={closingSlideOpen}>
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
                                        </div> */}
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
            </div>
            <div className="col-span-1">
            </div>
        </DndProvider>

    );
}

const ItemType = {
    SLIDE: 'slide',
};

interface SlideThumbnailProps {
    src: StaticImageData;
    alt: string;
    index: number;
    moveSlide: (fromIndex: number, toIndex: number) => void;
    duplicateSlide?: () => void;
    removeSlide?: () => void;
}

const SlideThumbnail: React.FC<SlideThumbnailProps> = ({ src, alt, index, moveSlide, duplicateSlide, removeSlide }) => {
    const [, ref] = useDrag({
        type: ItemType.SLIDE,
        item: { index },
    });

    const node = useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: ItemType.SLIDE,
        hover: (draggedItem: { index: number }) => {
            if (draggedItem.index !== index) {
                moveSlide(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    ref(drop(node));

    return (
        <motion.div
            ref={node}
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}

            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="cursor-pointer"
        >
            <div className="relative group">
                <div className="absolute right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger onClick={duplicateSlide}>
                                    <CirclePlus className="text-primary w-4 mr-1" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Duplicate this slide</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                    <span>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger onClick={removeSlide}>
                                    <CircleMinus className="text-red-700 w-4" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Remove this slide</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                </div>
                <div className="flex">
                    <DragHandleDots2Icon className="w-[20px]" />
                    <Image src={src} alt={alt} width={135} height={135} className="rounded-md border-2" />
                </div>
            </div>
        </motion.div>
    );
}

export default SlideDeck