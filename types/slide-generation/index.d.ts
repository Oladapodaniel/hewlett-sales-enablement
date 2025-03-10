import { SectionProps } from "@/app/slide-deck/page";

export interface Slide {
    title: string;
    id: number;
    templateSlide: string;
    content: string[];
    thumbnail: string;

    // optional properties
    displayMeetingNote?: boolean
    meetingNotes?: string
}

export interface SlideDeck {
    slides: Slide[];
}

declare type SlideDeckProps = {
    type: 'editing' | 'presenting';
    slides: Slide[];
}

export interface SlidesEditorProps {
    mode: 'editing' | 'presenting';
    content: Slide
}

export interface ThumbnailProps {
    content: Slide
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
    slideToUpdate: Slide, 
    user_prompt: string
}

declare type GenerateImageProps = {
    prompt: string;
    processor: string;
    height: number;
    width: number;
}

declare type PollImageProps = {
    polling_url: string
    status?: string;
    result?: {
        sample: string;
    }
}

declare type imageGenerationPromptProps = {
    title: string,
    content: string
}

declare type SlideTypeProps = {
    type: 'TitleSlide' | 'ImageWithCaption' | 'SectionHeader' | 'ClosingSlide' | null
}

declare type contentThemesProps = {
    name: string;
    description: string;
    selected: string;
}

declare type ModifySlideByThemeProps = {
    slides: Slide[];
    theme: contentThemesProps
}

declare type QuestionTypeProps = {
    question: string,
    id: number
}

declare type GenerateInformedSlideInstructionProps = {
    user_prompt: string;
    questions: QuestionTypeProps[],
    user_response: string;
    pages: string;
    tone: string;
    output_language: string;
    audience: string;
}

declare type SpinnerProps = {
    size?: string
}

declare type ModifySlideByUserPromptProps = {
    slides: Slide[];
    user_prompt: string;
}

declare type GenerateSpeakerMeetingNotesProps = {
    slide: Slide
}

declare type EnvConfigType = {
     CLIENT_ID: string;
     CLIENT_SECRET: string;
     APP_BASE_URL: string;
     IMAGE_CLIENT_ID: string;
     IMAGE_CLIENT_SECRET: string;
     OPENAI_USERNAME: string;
     OPENAI_PASSWORD: string;
     OPENAI_TEMPERATURE: string;
    }