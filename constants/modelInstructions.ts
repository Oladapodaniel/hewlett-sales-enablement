import { envConfig } from "@/lib/config";
import { stageName } from "@/lib/utils";
import { EnterPromptInstructionsProps, GenerateInformedSlideInstructionProps, GenerateSpeakerMeetingNotesProps, imageGenerationPromptProps, ModifySlideByThemeProps, ModifySlideByUserPromptProps, RefineSingleSlideInstructionsProps } from "@/types/slide-generation";

export const EnterPromptInstructions = ({ user_prompt, pages, tone, output_language, audience }: EnterPromptInstructionsProps) => {
  return {
    files: [],
    user_prompt: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a slide content generator. Generate between "${pages}" slides based on the topic from the user: "${user_prompt}". Each slide should include: 'title', 'id', 'templateSlide', 'content' (an array of strings) which is comprehensive information on the topic which can be a detailed explanation on the points under the current section, and a 'thumbnail'. Stick to the JSON schema. Do not add any extra commentary or text beyond the JSON structure. Use "${tone || 'General'}" tone. Give your response in "${output_language || 'English'}". Have in mind that your audience is "${audience || 'General'}"`
        },
        {
          role: "system",
          content: "IMPORTANT: Your response must strictly follow the JSON schema provided below—no additional explanations or data outside the JSON. If no slide content can be generated, return an object with an empty 'slides' array."
        }
      ],
      json_schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "Slide Deck",
        description: "A schema for generating slide content for a slide deck. The output should be an object with a 'slides' array. Each slide should have a 'title', 'id', 'templateSlide', 'content', and 'thumbnail'.",
        type: "object",
        properties: {
          slides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "The title of the slide."
                },
                id: {
                  type: "number",
                  description: "A unique identifier for the slide."
                },
                templateSlide: {
                  type: "string",
                  description: "The template of the slide (e.g., TitleSlide, SectionHeader, BulletList, ImageWithCaption, ClosingSlide)."
                },
                content: {
                  type: "array",
                  items: {
                    type: "string",
                    description: "Content for the slide."
                  },
                  description: "An array of content strings for the slide."
                },
                thumbnail: {
                  type: "string",
                  description: "A URL or identifier for the thumbnail image."
                }
              },
              required: ["title", "id", "templateSlide", "content", "thumbnail"]
            }
          }
        },
        required: ["slides"]
      }
    }),
    username: envConfig[stageName]?.OPENAI_USERNAME,
    password: envConfig[stageName]?.OPENAI_PASSWORD,
    temperature: envConfig[stageName]?.OPENAI_TEMPERATURE
  };
};


export const RefineSlideAIModelEnquiry = ({ user_prompt, audience }: EnterPromptInstructionsProps) => {
  return {
    files: [],
    user_prompt: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a slide content generator. A user has prompt you to generate a slide deck for presentation based on a topic, Here is the user prompt: "${user_prompt}", they are presenting this slide to a "${audience}" audience. Based on your understanding of this prompt, ask the user 3 questions to better refine their prompt and make you understand their specific request. Return this questions in JSON format. The questions should include: 'question', 'id'. Stick to the JSON schema. Do not add any extra commentary or text beyond the JSON structure.`
        },
        {
          role: "system",
          content: "IMPORTANT: Your response must strictly follow the JSON schema provided below, no additional data outside the JSON. Do not wrap your JSON response in triple backticks, do not use Markdown formatting. Return only valid JSON."
        }
      ],
      json_schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "Refine User Request",
        description: "A schema for generating or refining a single slide. The output should be an object with a 'slide' property.",
        type: "object",
        properties: {
          questions: {
            type: "array",
            properties: {
              question: {
                type: "string",
                description: "The question to ask to user."
              },
              id: {
                type: "number",
                description: "A unique identifier for the question."
              },
            },
            required: ["question", "id"]
          }
        },
        required: ["questions"]
      }
    }),
    username: envConfig[stageName]?.OPENAI_USERNAME,
    password: envConfig[stageName]?.OPENAI_PASSWORD,
    temperature: envConfig[stageName]?.OPENAI_TEMPERATURE
  };
}


export const RefineSingleSlideInstructions = ({ slideToUpdate, user_prompt }: RefineSingleSlideInstructionsProps) => {
  return {
    files: [],
    user_prompt: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a slide content generator. You have a single slide to update: "${JSON.stringify(slideToUpdate)}". Here is the user prompt that informs you how you should update this slide: "${user_prompt}". Based on the provided prompt, update the title and the content accordingly. The slide should include: 'title', 'id', 'templateSlide', 'content' (an array of strings) and a 'thumbnail'. Stick to the JSON schema. Do not add any extra commentary or text beyond the JSON structure.`
        },
        {
          role: "system",
          content: "IMPORTANT: Your response must strictly follow the JSON schema provided below, no additional data outside the JSON. If no slide content can be generated, return an object with an empty 'slide' property. Do not wrap your JSON response in triple backticks, do not use Markdown formatting. Return only valid JSON. Let the thumbnail property in the return JSON be set to empty string"
        }
      ],
      json_schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "Single Slide",
        description: "A schema for generating or refining a single slide. The output should be an object with a 'slide' property.",
        type: "object",
        properties: {
          slide: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "The title of the slide."
              },
              id: {
                type: "number",
                description: "A unique identifier for the slide."
              },
              templateSlide: {
                type: "string",
                description: "The template of the slide (e.g., TitleSlide, SectionHeader, BulletList, ImageWithCaption, ClosingSlide)."
              },
              content: {
                type: "array",
                items: {
                  type: "string",
                  description: "Content for the slide."
                },
                description: "An array of content strings for the slide."
              },
              thumbnail: {
                type: "string",
                description: "A URL or identifier for the thumbnail image. Should be initially return an empty string"
              }
            },
            required: ["title", "id", "templateSlide", "content", "thumbnail"]
          }
        },
        required: ["slide"]
      }
    }),
    username: envConfig[stageName]?.OPENAI_USERNAME,
    password: envConfig[stageName]?.OPENAI_PASSWORD,
    temperature: envConfig[stageName]?.OPENAI_TEMPERATURE
  };
};

export const imageGenerationPrompt = ({ title, content }: imageGenerationPromptProps) => (
  `Generate a high-quality, dark green themed image inspired by "${title}" and "${content}". 
  The image should be purely visual with absolutely no text, letters, numbers, or typographic marks. 
  Focus on abstract or symbolic representation, using dark and green shades.
  `
)

export const ModifySlideByTheme = ({ slides, theme }: ModifySlideByThemeProps) => {
  return {
    files: [],
    user_prompt: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a slide content generator. You have generated some slides for me in JSON format, here is the generated slide: "${JSON.stringify(slides)}". Modify the content of the slide to match this theme name: "${theme.name}" and theme description: "${theme.description}" and return it in JSON format.`
        },
        {
          role: "system",
          content: "IMPORTANT: Your response must strictly follow the JSON schema provided below, no additional data outside the JSON. If no slide content can be generated, return an object with an empty 'slide' property. Do not wrap your JSON response in triple backticks, do not use Markdown formatting. Return only valid JSON. Let the thumbnail property in the return JSON be set to empty stringIMPORTANT: Your response must strictly follow the JSON schema provided below, no additional data outside the JSON. If no slide content can be generated, return an object with an empty 'slide' property. Do not wrap your JSON response in triple backticks, do not use Markdown formatting. Return only valid JSON. Let the thumbnail property in the return JSON be set to empty string"
        }
      ],
      json_schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "Slide Deck",
        description: "A schema for generating slide content for a slide deck. The output should be an object with a 'slides' array. Each slide should have a 'title', 'id', 'templateSlide', 'content', and 'thumbnail'.",
        type: "object",
        properties: {
          slides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "The title of the slide."
                },
                id: {
                  type: "number",
                  description: "A unique identifier for the slide."
                },
                templateSlide: {
                  type: "string",
                  description: "The template of the slide (e.g., TitleSlide, SectionHeader, BulletList, ImageWithCaption, ClosingSlide)."
                },
                content: {
                  type: "array",
                  items: {
                    type: "string",
                    description: "Content for the slide."
                  },
                  description: "An array of content strings for the slide."
                },
                thumbnail: {
                  type: "string",
                  description: "A URL or identifier for the thumbnail image."
                }
              },
              required: ["title", "id", "templateSlide", "content", "thumbnail"]
            }
          }
        },
        required: ["slides"]
      }
    }),
    username: envConfig[stageName]?.OPENAI_USERNAME,
    password: envConfig[stageName]?.OPENAI_PASSWORD,
    temperature: envConfig[stageName]?.OPENAI_TEMPERATURE
  };
};

export const GenerateInformedSlideInstruction = ({ user_prompt, questions, user_response, pages, tone, output_language, audience }: GenerateInformedSlideInstructionProps) => {
  return {
    files: [],
    user_prompt: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a slide content generator. Based on the user's prompt: "${user_prompt}", and their responses to the following questions: "${JSON.stringify(questions)}", here are the user's responses: "${JSON.stringify(user_response)}". Generate between "${pages}" slides with the following details. Each slide should include: 'title', 'id', 'templateSlide', 'content' (an array of strings), and a 'thumbnail'. Stick to the JSON schema. Do not add any extra commentary or text beyond the JSON structure. Use "${tone || 'General'}" tone. Give your response in "${output_language || 'English'}". Have in mind that your audience is "${audience || 'General'}".`
        },
        {
          role: "system",
          content: "IMPORTANT: Your response must strictly follow the JSON schema provided below—no additional explanations or data outside the JSON. If no slide content can be generated, return an object with an empty 'slides' array. Do not wrap your JSON response in triple backticks, do not use Markdown formatting. Return only valid JSON."
        }
      ],
      json_schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "Slide Deck",
        description: "A schema for generating slide content for a slide deck. The output should be an object with a 'slides' array. Each slide should have a 'title', 'id', 'templateSlide', 'content', and 'thumbnail'.",
        type: "object",
        properties: {
          slides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "The title of the slide."
                },
                id: {
                  type: "number",
                  description: "A unique identifier for the slide."
                },
                templateSlide: {
                  type: "string",
                  description: "The template of the slide (e.g., TitleSlide, SectionHeader, BulletList, ImageWithCaption, ClosingSlide)."
                },
                content: {
                  type: "array",
                  items: {
                    type: "string",
                    description: "Content for the slide."
                  },
                  description: "An array of content strings for the slide."
                },
                thumbnail: {
                  type: "string",
                  description: "A URL or identifier for the thumbnail image."
                }
              },
              required: ["title", "id", "templateSlide", "content", "thumbnail"]
            }
          }
        },
        required: ["slides"]
      }
    }),
    username: envConfig[stageName]?.OPENAI_USERNAME,
    password: envConfig[stageName]?.OPENAI_PASSWORD,
    temperature: envConfig[stageName]?.OPENAI_TEMPERATURE
  };
}

export const ModifySlideByUserPrompt = ({ slides, user_prompt }: ModifySlideByUserPromptProps) => {
  return {
    files: [],
    user_prompt: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a slide content generator. You have generated some slides for me in JSON format: "${JSON.stringify(slides)}". Modify the content of the slide to match the user prompt, Here is the user prompt: "${user_prompt} and return it in JSON format.`
        },
        {
          role: "system",
          content: "IMPORTANT: Your response must strictly follow the JSON schema provided below, no additional data outside the JSON. If no slide content can be generated, return an object with an empty 'slide' property. Do not wrap your JSON response in triple backticks, do not use Markdown formatting. Return only valid JSON. Let the thumbnail property in the return JSON be set to empty stringIMPORTANT: Your response must strictly follow the JSON schema provided below, no additional data outside the JSON. If no slide content can be generated, return an object with an empty 'slide' property. Do not wrap your JSON response in triple backticks, do not use Markdown formatting. Return only valid JSON. Let the thumbnail property in the return JSON be set to empty string"
        }
      ],
      json_schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "Slide Deck",
        description: "A schema for generating slide content for a slide deck. The output should be an object with a 'slides' array. Each slide should have a 'title', 'id', 'templateSlide', 'content', and 'thumbnail'.",
        type: "object",
        properties: {
          slides: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "The title of the slide."
                },
                id: {
                  type: "number",
                  description: "A unique identifier for the slide."
                },
                templateSlide: {
                  type: "string",
                  description: "The template of the slide (e.g., TitleSlide, SectionHeader, BulletList, ImageWithCaption, ClosingSlide)."
                },
                content: {
                  type: "array",
                  items: {
                    type: "string",
                    description: "Content for the slide."
                  },
                  description: "An array of content strings for the slide."
                },
                thumbnail: {
                  type: "string",
                  description: "A URL or identifier for the thumbnail image."
                }
              },
              required: ["title", "id", "templateSlide", "content", "thumbnail"]
            }
          }
        },
        required: ["slides"]
      }
    }),
    username: envConfig[stageName]?.OPENAI_USERNAME,
    password: envConfig[stageName]?.OPENAI_PASSWORD,
    temperature: envConfig[stageName]?.OPENAI_TEMPERATURE
  };
};


export const GenerateSpeakerMeetingNotes = ({ slide }: GenerateSpeakerMeetingNotesProps) => {
  return {
    files: [],
    user_prompt: JSON.stringify({
      messages: [
        {
          role: "system",
          content: `You are a slide content generator. You have one slide's content which needs speaker or meeting notes. Here is the slide in JSON format: ${JSON.stringify(
            slide
          )}.\n\nGenerate speaker notes that help present this slide effectively. The notes must be a single string, where line breaks or bullet points are separated by \n\n (newline characters).\n\nReturn your response in valid JSON. Do not add extra commentary or explanations outside the JSON. If no note can be generated, return an empty string for 'notes'.`
        }
      ],
      json_schema: {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "SpeakerNotes",
        description: "Schema for AI-generated meeting or speaker notes.",
        type: "object",
        properties: {
          notes: {
            type: "string",
            description: "A single string containing the speaker or meeting notes. Use \n for newlines."
          }
        },
        required: ["notes"]
      }
    }),
    username: envConfig[stageName]?.OPENAI_USERNAME || "",
    password: envConfig[stageName]?.OPENAI_PASSWORD || "",
    temperature: envConfig[stageName]?.OPENAI_TEMPERATURE
  };
};