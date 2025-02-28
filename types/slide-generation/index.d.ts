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
    user_prompt: string;
    username: string;
    password: string;
    temperature: number;
}

declare type EnterPromptInstructionsProps = {
    user_prompt: string,
    pages: string;
    tone: string;
    output_language: string;
    audience: string;
}