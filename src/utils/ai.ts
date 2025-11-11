import { getPreferenceValues } from "@raycast/api";
import { AI } from "@raycast/api";
import OpenAI from "openai";

interface Preferences {
    openaiApiKey?: string;
    useRaycastAI?: boolean;
    openaiModel?: string;
}

export async function transformText(text: string, instruction: string): Promise<string> {
    const preferences = getPreferenceValues<Preferences>();
    const useRaycastAI = preferences.useRaycastAI ?? false;

    if (useRaycastAI) {
        return transformWithRaycastAI(text, instruction);
    } else {
        return transformWithOpenAI(text, instruction, preferences);
    }
}

async function transformWithRaycastAI(text: string, instruction: string): Promise<string> {
    const prompt = `${instruction}\n\n${text}`;
    const response = await AI.ask(prompt);
    return response.trim();
}

async function transformWithOpenAI(
    text: string,
    instruction: string,
    preferences: Preferences
): Promise<string> {
    const apiKey = preferences.openaiApiKey;
    if (!apiKey) {
        throw new Error(
            "OpenAI API key is required. Please set it in Raycast preferences or enable 'Use Raycast AI'."
        );
    }

    const client = new OpenAI({
        apiKey: apiKey,
    });

    const model = preferences.openaiModel || "gpt-4.1-mini";
    const prompt = `${instruction}\n\n${text}`;

    try {
        const completion = await client.chat.completions.create({
            model: model,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const result = completion.choices[0]?.message?.content;
        if (!result) {
            throw new Error("No response from OpenAI");
        }

        return result.trim();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`OpenAI API error: ${error.message}`);
        }
        throw error;
    }
}

