import axiosInstance from "@/lib/axios";
import { EnterPromptSlideProps } from "@/types/slide-generation";


export const EnterPromptSlide = (payload: EnterPromptSlideProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axiosInstance.post('/extract', payload)
            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
}