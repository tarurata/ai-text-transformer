export interface Prompt {
    id: string;
    name: string;
    instruction: string;
}

export const DEFAULT_PROMPTS: Prompt[] = [
    {
        id: "natural-english",
        name: "Natural English",
        instruction: "Make the following text more natural and human-like. Fix grammar, spelling, and style issues in English:",
    },
    {
        id: "summarize-150",
        name: "Summarize in 150 words",
        instruction: "Summarize the following text in approximately 150 words, capturing the key points:",
    },
    {
        id: "bullet-points",
        name: "Bullet Points",
        instruction: "Convert the following text into clear, concise bullet points:",
    },
    {
        id: "extract-phrases",
        name: "Extract Phrases",
        instruction: "Extract and list useful and natural sentences from following text:",
    },
    {
        id: "dirty-joke",
        name: "Dirty Joke",
        instruction: "Replace the following text with a related dirty joke:",
    },
    {
        id: "simplify",
        name: "Simplify",
        instruction: "Simplify the following text to make it easier to understand, using simpler language:",
    },
    {
        id: "formal",
        name: "Make Formal",
        instruction: "Rewrite the following text in a formal, professional tone:",
    },
    {
        id: "casual",
        name: "Make Casual",
        instruction: "Rewrite the following text in a casual, friendly tone:",
    },
    {
        id: "translate-english",
        name: "Translate to English",
        instruction: "Translate the following text to English:",
    },
    {
        id: "make-task-list",
        name: "Make Task List",
        instruction: "Create a task list in markdown from the following text:",
    },
    {
        id: "extract-key-points",
        name: "Extract Key Points",
        instruction: "Extract and list the key points from the following text:",
    },
    {
        id: "add-emojis",
        name: "Add Emojis",
        instruction: "Add emojis to the following text to make it more fun and engaging:",
    },
    {
        id: "emoji",
        name: "Emoji",
        instruction: "Replace the following text with single emoji that best represents the text:",
    },
];
export const CUSTOM_PROMPT_ID = "custom";

