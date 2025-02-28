import { EnterPromptInstructionsProps } from "@/types/slide-generation";

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
      username: "MLM",
      password: "IYO320LXA242",
      temperature: 0.1
    };
  };
  