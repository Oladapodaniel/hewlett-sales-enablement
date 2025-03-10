import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stageName = process.env.NEXT_PUBLIC_ENV_STAGE_NAME || 'LOCAL'

export interface OpenAIResponse {
  choices: {
    message: {
      content: string;
      role: string;
    };
  }[];
}

export const extractOpenAIResponseContent = (response: OpenAIResponse) => {
  return JSON.parse(response.choices[0].message.content);
}