import { useState, useEffect } from "react";
import { List, ActionPanel, Action, showToast, Toast, Icon, Clipboard } from "@raycast/api";
import { getClipboardText, setClipboardText } from "./utils/clipboard";
import { transformText } from "./utils/ai";
import { DEFAULT_PROMPTS } from "./utils/prompts";

export default function ApplyToClipboard() {
    const [clipboardText, setClipboardTextState] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        async function loadClipboard() {
            try {
                const text = await getClipboardText();
                setClipboardTextState(text);
                setIsLoading(false);
            } catch (error) {
                await showToast({
                    style: Toast.Style.Failure,
                    title: "Error",
                    message: error instanceof Error ? error.message : "Failed to read clipboard",
                });
                setIsLoading(false);
            }
        }
        loadClipboard();
    }, []);

    const filteredPrompts = DEFAULT_PROMPTS.filter((prompt) =>
        prompt.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handlePromptSelect = async (instruction: string) => {
        if (!clipboardText) {
            await showToast({
                style: Toast.Style.Failure,
                title: "Error",
                message: "Clipboard is empty",
            });
            return;
        }

        try {
            await showToast({
                style: Toast.Style.Animated,
                title: "Transforming text...",
                message: "Please wait",
            });

            const transformed = await transformText(clipboardText, instruction);
            await setClipboardText(transformed, true);

            // Update the displayed text
            setClipboardTextState(transformed);
        } catch (error) {
            await showToast({
                style: Toast.Style.Failure,
                title: "Error",
                message: error instanceof Error ? error.message : "Failed to transform text",
            });
        }
    };

    const handlePaste = async () => {
        if (!clipboardText) return;

        try {
            // Copy to clipboard (already done, but ensure it's there)
            await Clipboard.copy(clipboardText);
            await showToast({
                style: Toast.Style.Success,
                title: "Ready to paste",
                message: "Press Cmd+V to paste",
            });
        } catch (error) {
            await showToast({
                style: Toast.Style.Failure,
                title: "Error",
                message: "Failed to prepare for pasting",
            });
        }
    };

    return (
        <List
            isLoading={isLoading}
            searchBarPlaceholder="Search prompts or type custom instruction..."
            onSearchTextChange={setSearchText}
        >
            {clipboardText && (
                <List.Section title="Clipboard Content">
                    <List.Item
                        icon={Icon.Document}
                        title={clipboardText.length > 50 ? `${clipboardText.substring(0, 50)}...` : clipboardText}
                        subtitle={`${clipboardText.length} characters`}
                        actions={
                            <ActionPanel>
                                <Action
                                    title="Copy to Clipboard"
                                    icon={Icon.Clipboard}
                                    onAction={async () => {
                                        await setClipboardText(clipboardText, true);
                                    }}
                                />
                            </ActionPanel>
                        }
                    />
                </List.Section>
            )}

            <List.Section title="Preset Prompts">
                {filteredPrompts.map((prompt) => (
                    <List.Item
                        key={prompt.id}
                        title={prompt.name}
                        subtitle={prompt.instruction}
                        actions={
                            <ActionPanel>
                                <Action
                                    title="Apply Prompt"
                                    icon={Icon.Wand}
                                    onAction={() => handlePromptSelect(prompt.instruction)}
                                />
                            </ActionPanel>
                        }
                    />
                ))}
            </List.Section>

            {searchText && !DEFAULT_PROMPTS.some((p) => p.name.toLowerCase().includes(searchText.toLowerCase())) && (
                <List.Section title="Custom Prompt">
                    <List.Item
                        title={searchText}
                        subtitle="Apply this custom instruction"
                        actions={
                            <ActionPanel>
                                <Action
                                    title="Apply Custom Prompt"
                                    icon={Icon.Wand}
                                    onAction={() => handlePromptSelect(searchText)}
                                />
                            </ActionPanel>
                        }
                    />
                </List.Section>
            )}

            {!searchText && (
                <List.Section title="Actions">
                    <List.Item
                        title="Refresh Clipboard"
                        subtitle="Reload clipboard content"
                        icon={Icon.ArrowClockwise}
                        actions={
                            <ActionPanel>
                                <Action
                                    title="Refresh"
                                    icon={Icon.ArrowClockwise}
                                    onAction={async () => {
                                        setIsLoading(true);
                                        try {
                                            const text = await getClipboardText();
                                            setClipboardTextState(text);
                                            setIsLoading(false);
                                            await showToast({
                                                style: Toast.Style.Success,
                                                title: "Clipboard refreshed",
                                            });
                                        } catch (error) {
                                            setIsLoading(false);
                                            await showToast({
                                                style: Toast.Style.Failure,
                                                title: "Error",
                                                message: "Failed to read clipboard",
                                            });
                                        }
                                    }}
                                />
                            </ActionPanel>
                        }
                    />
                </List.Section>
            )}
        </List>
    );
}

