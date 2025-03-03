import { SectionProps } from "@/app/slide-deck/page";

export interface Slide {
    title: string;
    id: number;
    templateSlide: string;
    content: string[];
    thumbnail: string;
}

export interface SlideDeck {
    slides: Slide[];
}

export interface EnterPromptSlideProps {
    files: any[];
    user_prompt: string | undefined;
    username: string| undefined;
    password: string| undefined;
    temperature: number | slide;
}

declare type EnterPromptInstructionsProps = {
    user_prompt: string,
    pages: string;
    tone: string;
    output_language: string;
    audience: string;
}

declare type RefineSingleSlideInstructionsProps = {
    slideToUpdate: SectionProps, 
    user_prompt: string
}