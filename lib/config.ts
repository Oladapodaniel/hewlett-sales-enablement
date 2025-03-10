import { EnvConfigType } from "@/types/slide-generation";

export const envConfig:{ [key: string]:  EnvConfigType }  = {
    LOCAL: {
      CLIENT_ID: process.env.NEXT_PUBLIC_LOCAL_CLIENT_ID!,
      CLIENT_SECRET: process.env.NEXT_PUBLIC_LOCAL_CLIENT_SECRET!,
      APP_BASE_URL: process.env.NEXT_PUBLIC_LOCAL_APP_BASE_URL!,
      IMAGE_CLIENT_ID: process.env.NEXT_PUBLIC_LOCAL_IMAGE_CLIENT_ID!,
      IMAGE_CLIENT_SECRET: process.env.NEXT_PUBLIC_LOCAL_IMAGE_CLIENT_SECRET!,
      OPENAI_USERNAME: process.env.NEXT_PUBLIC_LOCAL_OPENAI_USERNAME!,
      OPENAI_PASSWORD: process.env.NEXT_PUBLIC_LOCAL_OPENAI_PASSWORD!,
      OPENAI_TEMPERATURE: process.env.NEXT_PUBLIC_LOCAL_OPENAI_TEMPERATURE!
    }
  };