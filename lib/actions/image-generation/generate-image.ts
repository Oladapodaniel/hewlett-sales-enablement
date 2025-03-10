import { envConfig } from "@/lib/config";
import { stageName } from "@/lib/utils";
import { GenerateImageProps, PollImageProps } from "@/types/slide-generation";
import axios from "axios";


export const GenerateImage = (payload: GenerateImageProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post("https://acaendfacttools.lemonhill-d6b8f62d.swedencentral.azurecontainerapps.io/api/v1/image_generation_service_000121_1_0_0/prompt-image", payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Id': envConfig[stageName]?.IMAGE_CLIENT_ID,
                    'X-Client-Secret': envConfig[stageName]?.IMAGE_CLIENT_SECRET
                }
            })
            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
}

export const PollingImage = ({ polling_url }: PollImageProps) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(polling_url, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Client-Id': envConfig[stageName]?.IMAGE_CLIENT_ID,
                    'X-Client-Secret': envConfig[stageName]?.IMAGE_CLIENT_SECRET
                }
            })
            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
}