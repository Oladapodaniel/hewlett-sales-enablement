import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TitlePage from "./TitlePage";
import SectionHeader from "./SectionHeader";
import BulletList from "./BulletList";
import ImageWithCaption from "./ImageWithCaption";
import ClosingSide from "./ClosingSlide";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlignLeft, ChevronDown, CircleMinus, CirclePlus, Download, Loader2, Play, SparklesIcon, Swords, Volume2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input";
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'framer-motion';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { DragHandleDots2Icon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { useTheme } from "@/context/ThemeContext";
// import { thumbnail_fifth, thumbnail_first, thumbnail_fourth, thumbnail_second, thumbnail_third } from "@/lib/images";
import { Input } from "@/components/ui/input";
import { editWithAIOptions } from "@/constants/util";
import { GenerateSpeakerMeetingNotes, imageGenerationPrompt, RefineSingleSlideInstructions } from "@/constants/modelInstructions";
import { EnterPromptSlide } from "@/lib/actions/slide-generation/enter-prompt-slide";
import { PollImageProps, Slide, SlideDeckProps, SlideTypeProps } from "@/types/slide-generation";
import { extractOpenAIResponseContent, OpenAIResponse } from "@/lib/utils";
import Spinner from "@/components/reusables/Spinner";
import { GenerateImage, PollingImage } from "@/lib/actions/image-generation/generate-image";
import TitleThumbnail from "./thumbnails/TitleThumbnail";
import BulletThumbnail from "./thumbnails/BulletThumbnail";
import ImageCaptionThumbnail from "./thumbnails/ImageCaptionThumbnail";
import SectionHeaderThumbnail from "./thumbnails/SectionHeaderThumbnail";
import ClosingThumbnail from "./thumbnails/ClosingThumbnail";
import { Textarea } from "@/components/ui/textarea";



const SlideDeck: React.FC<SlideDeckProps> = ({ type, slides }) => {
    const router = useRouter();
    const [slidesState] = useState(slides);
    const { slideStates, setSlideState } = useTheme()
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [selectedIndex, setselectedIndex] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null)
    const userPromptInputRef = useRef<HTMLInputElement>(null)
    const [selectedAIAction, setSelectedAIAction] = useState<string>("");
    const [selectedAIActionIndex, setSelectedAIActionIndex] = useState<number>(-1);
    const [userPromptInput, setUserPromptInput] = useState<string>("");
    const [loadingSlideContent, setloadingSlideContent] = useState<boolean>(false);
    const [displayMeetingNote, setDisplayMeetingNote] = useState<boolean>(false);
    const [generatingNotes, setgeneratingNotes] = useState<boolean>(false);
    const [meetingNotes, setmeetingNotes] = useState<string>("");


    const moveSlide = (fromIndex: number, toIndex: number) => {
        const updatedSlides = [...slideStates];
        const [movedSlide] = updatedSlides.splice(fromIndex, 1);
        updatedSlides.splice(toIndex, 0, movedSlide);
        // setSlides(updatedSlides);
        setSlideState(slidesState)
    };

    const duplicateSlide = (index: number) => {
        const newSlides = [...slideStates];
        const slideToDuplicate = newSlides[index];

        const allIds = newSlides.map((slide) => slide.id);
        const maxId = allIds.length > 0 ? Math.max(...allIds) : 0;
        newSlides.splice(index + 1, 0, {
            ...slideToDuplicate,
            id: maxId + 1
        });
        // setSlides(newSlides);
        setSlideState(newSlides)
    }
    const removeSlide = (index: number) => {
        const updatedSlides = slideStates.filter((_, i) => i !== index);
        // setSlides(updatedSlides);
        setSlideState(updatedSlides)
    };

    // const imagesArray = useMemo(() => [
    //     {
    //         thumbnail: thumbnail_first,
    //         templateSlide: 'TitleSlide'
    //     },
    //     {
    //         thumbnail: thumbnail_second,
    //         templateSlide: 'SectionHeader'
    //     },
    //     {
    //         thumbnail: thumbnail_third,
    //         templateSlide: 'BulletList'
    //     },
    //     {
    //         thumbnail: thumbnail_fourth,
    //         templateSlide: 'ImageWithCaption'
    //     },
    //     {
    //         thumbnail: thumbnail_fifth,
    //         templateSlide: 'ClosingSlide'
    //     }
    // ], []);
    // const imagesArray = [
    //     {
    //         thumbnail: thumbnail_first,
    //         templateSlide: 'TitleSlide'
    //     },
    //     {
    //         thumbnail: thumbnail_second,
    //         templateSlide: 'SectionHeader'
    //     },
    //     {
    //         thumbnail: thumbnail_third,
    //         templateSlide: 'BulletList'
    //     },
    //     {
    //         thumbnail: thumbnail_fourth,
    //         templateSlide: 'ImageWithCaption'
    //     },
    //     {
    //         thumbnail: thumbnail_fifth,
    //         templateSlide: 'ClosingSlide'
    //     }
    // ];

    // const slideStateWithThumbnail = useMemo(() => {
    //     return slidesState.map(slide => {
    //         const image = imagesArray.find(img => img.templateSlide === slide.templateSlide);
    //         if (!image) {
    //             return
    //         }
    //         return {
    //             ...slide,
    //             thumbnail: image.thumbnail
    //         };
    //     });
    // }, [slidesState, imagesArray]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userPromptInputRef.current && userPromptInputRef.current.contains(event.target as Node)) {
                return;
            }

            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleToggle = (index: number) => {
        // If you click the same one, close it. Otherwise, set it to the clicked index
        setOpenIndex(openIndex === index ? null : index);
        setselectedIndex(openIndex === index ? null : index);
    };

    const passSingleSlideParamenters = async (index: number, prompt: { text: string }) => {
        console.log(index, 'setting')
        setSelectedAIAction(prompt.text);
        setSelectedAIActionIndex(index);
        setOpenIndex(null);
    }


    useEffect(() => {
        console.log(slideStates, 'here')
        console.log(selectedAIActionIndex, 'here')
        console.log(slideStates[selectedAIActionIndex], 'here')
        const updateSingleSlide = async () => {
            const payload = RefineSingleSlideInstructions({
                slideToUpdate: slideStates[selectedAIActionIndex],
                user_prompt: selectedAIAction || userPromptInput,
            })

            const passedValue = {
                files: payload.files,
                user_prompt: payload.user_prompt,
                username: payload.username,
                password: payload.password,
                temperature: payload.temperature
            }
            setloadingSlideContent(true);
            console.log(loadingSlideContent, 'loadingslidecontent')

            try {
                const updatedSlide = await EnterPromptSlide(passedValue) as OpenAIResponse
                const result = extractOpenAIResponseContent(updatedSlide)
                console.log(result, 'result')
                const updatedSlides = [...slideStates];
                const updateResult = result.slide
                updateResult.thumbnail = updatedSlides[selectedAIActionIndex].thumbnail
                updatedSlides[selectedAIActionIndex] = updateResult;
                console.log(updateResult, 'updated result')
                // setSlides(updatedSlides);
                setSlideState(updatedSlides)
                setUserPromptInput("")
                setloadingSlideContent(false);
                // setSelectedAIAction("");
                // setSelectedAIActionIndex(-1);
                setselectedIndex(null);
                console.log(loadingSlideContent, 'loadingslidecontent')
            } catch (error) {
                console.log(error)
                setloadingSlideContent(false);
                setselectedIndex(null);
                console.log(loadingSlideContent, 'loadingslidecontent')
            }
        }
        if (selectedAIAction) {
            updateSingleSlide()
        }
    }, [selectedAIAction, selectedAIActionIndex])

    // const generateImages = async () => {
    //     const payload = {
    //         prompt: 'A beautiful lady walking down the street being admired by other guys',
    //         processor: 'bfl',
    //         height: 1024,
    //         width: 1024
    //     }
    //     try {
    //         const response = await GenerateImage(payload) as PollImageProps
    //         console.log(response, 'image resonse')
    //         const { polling_url } = response;
    //         pollGeneratedImage(polling_url)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // generateImages()

    // const pollGeneratedImage = async (url: string) => {
    //     const payload = {
    //         polling_url: url
    //     }
    //     try {
    //         const response = await PollingImage(payload);
    //         console.log(response, 'imagepolledsuccesfully');
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // const generateImagesForSlides = async () => {
    //     const slidesToGenerateImages = slidesState.filter(slide => 
    //         slide.templateSlide === 'TitleSlide' || 
    //         slide.templateSlide === 'ImageWithCaption' || 
    //         slide.templateSlide === 'SectionHeader'
    //     );

    //     for (const slide of slidesToGenerateImages) {
    //         const payload = {
    //             prompt: `Generate an image for ${slide.templateSlide}`,
    //             processor: 'bfl',
    //             height: 1024,
    //             width: 1024
    //         };

    //         try {
    //             const response = await GenerateImage(payload) as PollImageProps;
    //             const { polling_url } = response;
    //             const imageUrl = await pollGeneratedImage(polling_url);
    //             if (imageUrl) {
    //                 const updatedSlides = slidesState.map(s => 
    //                     s === slide ? { ...s, thumbnail: imageUrl } : s
    //                 );
    //                 setSlides(updatedSlides);
    //                 setSlideState(updatedSlides);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // };

    // const pollGeneratedImage = async (url: string): Promise<string | null> => {
    //     const payload = { polling_url: url };
    //     try {
    //         while (true) {
    //             const response = await PollingImage(payload);
    //             if (response.status) {
    //                 return response.image_url;
    //             }
    //             await new Promise(resolve => setTimeout(resolve, 2000)); // Poll every 2 seconds
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // };

    // useEffect(() => {
    //     generateImagesForSlides();
    // }, []);


    //     import { useEffect, useState } from 'react';

    // /**
    //  * Example placeholders for your actual GenerateImage and PollingImage calls.
    //  * Adjust these as needed to match your real API signature.
    //  */
    // async function GenerateImage(payload: { prompt: string; processor: string; height: number; width: number }) {
    //   // pretend we return { polling_url: string }
    //   return { polling_url: 'https://api.example.com/poll/12345' };
    // }
    // async function PollingImage(payload: { polling_url: string }) {
    //   // pretend we return { status: boolean; image_url?: string }
    //   // e.g., status = true means done, status = false means still processing
    //   return { status: Math.random() < 0.3, image_url: 'https://cdn.example.com/generated-image.jpg' };
    // }

    // For demonstration
    // interface Slide {
    //   id: number;
    //   templateSlide: string;
    //   thumbnail?: string;
    // }


    //   const [slidesState, setSlides] = useState<Slide[]>([
    //     { id: 1, templateSlide: 'TitleSlide' },
    //     { id: 2, templateSlide: 'BulletList' },
    //     { id: 3, templateSlide: 'ImageWithCaption' },
    //     { id: 4, templateSlide: 'SectionHeader' },
    //   ]);

    // 1) Polling function: Keep calling the PollingImage endpoint until success (or a timeout).
    const pollGeneratedImage = async (pollingUrl: string): Promise<string | null> => {
        // OPTIONAL: Add a maxRetries or timeout to avoid infinite loops
        while (true) {
            try {
                const { status, result } = await PollingImage({ polling_url: pollingUrl }) as PollImageProps;
                if (status?.toLowerCase() === 'ready') {
                    return result?.sample || null;
                }
                // If not ready yet, wait 2 seconds then poll again
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (error) {
                console.error('Error polling image:', error);
                return null;
            }
        }
    };

    // 2) Generate images for each relevant slide and update thumbnail after polling is complete

    //   const generateImagesForSlides = async (type: SlideTypeProps['type']) => {
    //     console.log('generation')

    //     const slidesToGenerateImages = type
    //       ? slidesState.filter((slide) => slide.templateSlide === type)
    //       : slidesState.filter(
    //           (slide) =>
    //             slide.templateSlide === 'TitleSlide' ||
    //             slide.templateSlide === 'ImageWithCaption' ||
    //             slide.templateSlide === 'SectionHeader' ||
    //             slide.templateSlide === 'ClosingSlide'
    //         );
    //     // Filter slides that need an image
    //     // const slidesToGenerateImages = slidesState.filter(
    //     //   (slide) =>
    //     //     slide.templateSlide === 'TitleSlide' ||
    //     //     slide.templateSlide === 'ImageWithCaption' ||
    //     //     slide.templateSlide === 'SectionHeader' ||
    //     //     slide.templateSlide === 'ClosingSlide'
    //     // );

    //     // We'll store a local, mutable copy and update it as we go
    //     const updatedSlides = [...slidesState];

    //     for (const slide of slidesToGenerateImages) {
    //       const payload = {
    //         prompt: imageGenerationPrompt({ title: slide.title, content: slide.content[0] }),
    //         processor: 'bfl',
    //         height: 1024,
    //         width: 1024,
    //       };

    //       try {
    //         // 1) Request a new image generation
    //         const response = (await GenerateImage(payload)) as { polling_url: string };
    //         // 2) Poll until the image is ready
    //         const imageUrl = await pollGeneratedImage(response.polling_url);

    //         if (imageUrl) {
    //             console.log(imageUrl, 'valid image gitten')
    //           // 3) If we got a valid image URL, update the slide's thumbnail
    //           const idx = updatedSlides.findIndex((s) => s.id === slide.id);
    //           if (idx !== -1) {
    //             updatedSlides[idx] = {
    //               ...updatedSlides[idx],
    //               thumbnail: imageUrl,
    //             };
    //           }
    //           // 4) Update state so UI re-renders with the new thumbnail
    //           setSlideState([...updatedSlides]);
    //         }
    //       } catch (error) {
    //         console.error('Error generating image for slide:', error);
    //       }
    //     }
    //   };

    const generateImagesForSlides = async (type: SlideTypeProps["type"]) => {
        console.log("generation");

        // If 'type' is defined, only find slides of that template type
        // Otherwise, find all that match the default set (TitleSlide, etc.)
        const slidesToGenerateImages = type
            ? slidesState.filter((slide) => slide.templateSlide === type)
            : slidesState.filter(
                (slide) =>
                    slide.templateSlide === "TitleSlide" ||
                    slide.templateSlide === "ImageWithCaption" ||
                    slide.templateSlide === "SectionHeader" ||
                    slide.templateSlide === "ClosingSlide"
            );

        for (const slide of slidesToGenerateImages) {
            const payload = {
                prompt: imageGenerationPrompt({ title: slide.title, content: slide.content[0] }),
                processor: "bfl",
                height: 1024,
                width: 1024,
            };

            try {
                // 1) Request a new image generation
                const response = (await GenerateImage(payload)) as { polling_url: string };
                // 2) Poll until the image is ready
                const imageUrl = await pollGeneratedImage(response.polling_url);

                if (imageUrl) {
                    console.log(imageUrl, "valid image retrieved");

                    // 3) Update the single slide's thumbnail in state
                    setSlideState((prevSlides) => {
                        // Make a copy of the previous slides
                        const updatedSlides = [...prevSlides];
                        // Find the target slide
                        const idx = updatedSlides.findIndex((s) => s.id === slide.id);
                        // If found, update only that slide's thumbnail
                        if (idx !== -1) {
                            updatedSlides[idx] = {
                                ...updatedSlides[idx],
                                thumbnail: imageUrl,
                            };
                        }
                        // Return new array to trigger re-render
                        return updatedSlides;
                    });
                }
            } catch (error) {
                console.error("Error generating image for slide:", error);
            }
        }
    };


    // 3) Kick off the generation on mount
    useEffect(() => {
        if (!slidesState.some(i => i.thumbnail)) {
            generateImagesForSlides(null);
        }
    }, []);


    const toggleMeetingNotes = () => setDisplayMeetingNote(!displayMeetingNote)

    const handleMeetingNotes = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setmeetingNotes(e.target.value)
    }

    const generateMeetingNotes = async (slide: Slide) => {
        const payload = GenerateSpeakerMeetingNotes({ slide })
        setgeneratingNotes(true);
        
        const passedValue = {
            files: payload.files,
            user_prompt: payload.user_prompt,
            username: payload.username,
            password: payload.password,
            temperature: payload.temperature
        }
        
        try {
            const updatedSlide = await EnterPromptSlide(passedValue) as OpenAIResponse
            const result = extractOpenAIResponseContent(updatedSlide)
            console.log(result, 'result')
            setgeneratingNotes(false);
            setmeetingNotes(result.notes)
        } catch (error) {
            console.log(error)
            setgeneratingNotes(false);
        }
    }


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex gap-4 justify-end p-4">
                <Button variant={'secondary'} className="rounded-lg text-lg bg-secondary text-black shadow-lg" type="submit">
                    <Swords /> Challenge me
                </Button>
                <Button variant={'secondary'} className="rounded-lg text-lg bg-secondary text-black shadow-lg" type="submit">
                    <Volume2 /> Present it to me
                </Button>
                <Button variant={'secondary'} className="rounded-lg text-lg bg-secondary text-black shadow-lg" type="submit">
                    <Download /> Download
                </Button>
                <Button onClick={() => router.push("/present")} className="rounded-lg text-lg bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]" type="submit">
                    <Play /> Present
                </Button>
            </div>

            <div className="grid grid-cols-5 gap-6">
                <div className="col-span-1">
                    <div className="fixed w-[170px] shadow-[0_16px_36px_#542fb814] border rounded-md max-h-[700px] overflow-scroll bg-white p-2">
                        <div className="flex flex-col gap-4">
                            {(slideStates.length > 0 ? slideStates : slidesState).map((slide, index) => (
                                slide ? (
                                    <SlideThumbnail
                                        key={index}
                                        index={index}
                                        moveSlide={moveSlide}
                                        duplicateSlide={() => duplicateSlide(index)}
                                        removeSlide={() => removeSlide(index)}
                                        content={slide}
                                    />
                                ) : null
                            ))}
                        </div>

                    </div>
                </div>
                <div className="col-span-4 flex flex-col gap-10">
                    {
                        (slideStates.length > 0 ? slideStates : slidesState).map((slide, index) => (
                            <div key={index}>
                                {slide.templateSlide === 'TitleSlide' ? (
                                    <div className="relative group" ref={dropdownRef}>
                                        <DropdownMenu open={openIndex === index}>
                                            <DropdownMenuTrigger>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent aria-disabled={true} className="absolute mt-2 min-w-[250px]">
                                                <DropdownMenuLabel>
                                                    <div className="flex items-center gap-3">
                                                        <SparklesIcon className="w-4 h-4 text-primary" />
                                                        <div className="text-lg">Edit with AI</div>
                                                    </div>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <div className="relative">
                                                    <Input placeholder="Ask AI to..." ref={userPromptInputRef} value={userPromptInput} onChange={(e) => setUserPromptInput(e.target.value)} className="pr-[50px]" />
                                                    <Button onClick={() => passSingleSlideParamenters(index, { text: userPromptInput })} className="absolute top-0 right-0 rounded-[8px] bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]">
                                                        <PaperPlaneIcon />
                                                    </Button>
                                                </div>
                                                {editWithAIOptions.map((i, indexx) => <div key={indexx} className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-lg font-[300] cursor-pointer hover:bg-neutral-100" onClick={() => passSingleSlideParamenters(index, i)}><AlignLeft /> &nbsp;{i.text}</div>)}
                                                <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-lg font-[300] cursor-pointer hover:bg-neutral-100" onClick={() => {
                                                    generateImagesForSlides('TitleSlide')
                                                }}><AlignLeft /> &nbsp;Regenerate Image</div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="absolute  hidden group-hover:block bg-white p-2 rounded shadow-lg text-white">
                                            <div className="flex gap-2 cursor-pointer" onClick={() => handleToggle(index)}>
                                                <SparklesIcon className="w-4 h-4 text-primary" />
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            {(selectedIndex === index) && loadingSlideContent && (
                                                <div className="absolute flex w-full h-full justify-center items-center bg-neutral-50">
                                                    <Spinner />
                                                </div>)}
                                            <TitlePage mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'SectionHeader' ? (
                                    <div className="relative group" ref={dropdownRef}>
                                        <DropdownMenu open={openIndex === index}>
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
                                                <div className="relative">
                                                    <Input placeholder="Ask AI to..." ref={userPromptInputRef} value={userPromptInput} onChange={(e) => setUserPromptInput(e.target.value)} className="pr-[50px]" />
                                                    <Button onClick={() => passSingleSlideParamenters(index, { text: userPromptInput })} className="absolute top-0 right-0 rounded-[8px] bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]">
                                                        <PaperPlaneIcon />
                                                    </Button>
                                                </div>
                                                {editWithAIOptions.map((i, indexx) => <div key={indexx} className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-lg font-[300] cursor-pointer hover:bg-neutral-100" onClick={() => passSingleSlideParamenters(index, i)}><AlignLeft /> &nbsp;{i.text}</div>)}
                                                <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-lg font-[300] cursor-pointer hover:bg-neutral-100" onClick={() => {
                                                    generateImagesForSlides('SectionHeader')
                                                }}><AlignLeft /> &nbsp;Regenerate Image</div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-white">
                                            <div className="flex gap-2 cursor-pointer" onClick={() => handleToggle(index)}>
                                                <SparklesIcon className="w-4 h-4 text-primary" />
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            {(selectedIndex === index) && loadingSlideContent && (
                                                <div className="absolute flex w-full h-full justify-center items-center bg-neutral-50">
                                                    <Spinner />
                                                </div>)}
                                            <SectionHeader mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'BulletList' ? (
                                    <div className="relative group" ref={dropdownRef}>
                                        <DropdownMenu open={openIndex === index}>
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
                                                <div className="relative">
                                                    <Input placeholder="Ask AI to..." ref={userPromptInputRef} value={userPromptInput} onChange={(e) => setUserPromptInput(e.target.value)} className="pr-[50px]" />
                                                    <Button onClick={() => passSingleSlideParamenters(index, { text: userPromptInput })} className="absolute top-0 right-0 rounded-[8px] bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]">
                                                        <PaperPlaneIcon />
                                                    </Button>
                                                </div>
                                                {editWithAIOptions.map((i, indexx) => <div key={indexx} className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-lg font-[300] cursor-pointer hover:bg-neutral-100" onClick={() => passSingleSlideParamenters(index, i)}><AlignLeft /> &nbsp;{i.text}</div>)}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-white">
                                            <div className="flex gap-2 cursor-pointer" onClick={() => handleToggle(index)}>
                                                <SparklesIcon className="w-4 h-4 text-primary" />
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            {(selectedIndex === index) && loadingSlideContent && (
                                                <div className="absolute flex w-full h-full justify-center items-center bg-neutral-50">
                                                    <Spinner />
                                                </div>)}
                                            <BulletList mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'ImageWithCaption' ? (
                                    <div className="relative group" ref={dropdownRef}>
                                        <DropdownMenu open={openIndex === index}>
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
                                                <div className="relative">
                                                    <Input placeholder="Ask AI to..." ref={userPromptInputRef} value={userPromptInput} onChange={(e) => setUserPromptInput(e.target.value)} className="pr-[50px]" />
                                                    <Button onClick={() => passSingleSlideParamenters(index, { text: userPromptInput })} className="absolute top-0 right-0 rounded-[8px] bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]">
                                                        <PaperPlaneIcon />
                                                    </Button>
                                                </div>
                                                {editWithAIOptions.map((i, indexx) => <div key={indexx} className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-lg font-[300] cursor-pointer hover:bg-neutral-100" onClick={() => passSingleSlideParamenters(index, i)}><AlignLeft /> &nbsp;{i.text}</div>)}
                                                <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-lg font-[300] cursor-pointer hover:bg-neutral-100" onClick={() => {
                                                    generateImagesForSlides('ImageWithCaption')
                                                }}><AlignLeft /> &nbsp;Regenerate Image</div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-white">
                                            <div className="flex gap-2 cursor-pointer" onClick={() => handleToggle(index)}>
                                                <SparklesIcon className="w-4 h-4 text-primary" />
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            {(selectedIndex === index) && loadingSlideContent && (
                                                <div className="absolute flex w-full h-full justify-center items-center bg-neutral-50">
                                                    <Spinner />
                                                </div>)}
                                            <ImageWithCaption mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : slide.templateSlide === 'ClosingSlide' ? (
                                    <div className="relative group" ref={dropdownRef}>
                                        <DropdownMenu open={openIndex === index}>
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
                                                <div className="relative">
                                                    <Input placeholder="Ask AI to..." ref={userPromptInputRef} value={userPromptInput} onChange={(e) => setUserPromptInput(e.target.value)} className="pr-[50px]" />
                                                    <Button onClick={() => passSingleSlideParamenters(index, { text: userPromptInput })} className="absolute top-0 right-0 rounded-[8px] bg-primary shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af]">
                                                        <PaperPlaneIcon />
                                                    </Button>
                                                </div>
                                                {editWithAIOptions.map((i, indexx) => <div key={indexx} className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-lg font-[300] cursor-pointer hover:bg-neutral-100" onClick={() => passSingleSlideParamenters(index, i)}><AlignLeft /> &nbsp;{i.text}</div>)}
                                                <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-lg font-[300] cursor-pointer hover:bg-neutral-100" onClick={() => {
                                                    generateImagesForSlides('ClosingSlide')
                                                }}><AlignLeft /> &nbsp;Regenerate Image</div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="absolute hidden group-hover:block bg-white p-2 rounded shadow-lg text-white">
                                            <div className="flex gap-2 cursor-pointer" onClick={() => handleToggle(index)}>
                                                <SparklesIcon className="w-4 h-4 text-primary" />
                                                <ChevronDown className="w-4 h-4 text-gray-500" />
                                            </div>
                                        </div>
                                        <div key={index} className="shadow-[0_16px_36px_#542fb814]">
                                            {(selectedIndex === index) && loadingSlideContent && (
                                                <div className="absolute flex w-full h-full justify-center items-center bg-neutral-50">
                                                    <Spinner />
                                                </div>)}
                                            <ClosingSide mode={type} content={slide} />
                                        </div>
                                    </div>
                                ) : null
                                }
                                <div className="mt-5">
                                    {displayMeetingNote && <Textarea placeholder="Enter your meeting or generate with AI 💫" value={meetingNotes} onChange={handleMeetingNotes} />}
                                    <div className="flex justify-end mt-4">
                                        {!displayMeetingNote && <div className="bg-secondary rounded-full py-1 px-3 flex gap-3 cursor-pointer" onClick={toggleMeetingNotes}><div>Meeting Notes</div></div>}
                                        {displayMeetingNote && <div className="bg-secondary rounded-full py-1 px-3 flex gap-3 cursor-pointer" onClick={() => generateMeetingNotes(slide)}><div>💫 &nbsp;Generate Meeting Notes</div>{generatingNotes && <Loader2 className="animate-spin text-primary" />}</div>}
                                    </div>
                                </div>
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
    index: number;
    moveSlide: (fromIndex: number, toIndex: number) => void;
    duplicateSlide?: () => void;
    removeSlide?: () => void;
    content: Slide
}

const SlideThumbnail: React.FC<SlideThumbnailProps> = ({ index, moveSlide, duplicateSlide, removeSlide, content }) => {
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
                <div className="flex border-5 border-red-900 h-[100px]">
                    <DragHandleDots2Icon className="w-[20px]" />
                    {content.templateSlide === "TitleSlide" && <TitleThumbnail content={content} />}
                    {content.templateSlide === "BulletList" && <BulletThumbnail content={content} />}
                    {content.templateSlide === "ImageWithCaption" && <ImageCaptionThumbnail content={content} />}
                    {content.templateSlide === "SectionHeader" && <SectionHeaderThumbnail content={content} />}
                    {content.templateSlide === "ClosingSlide" && <ClosingThumbnail content={content} />}
                </div>
            </div>
        </motion.div>
    );
}

export default SlideDeck