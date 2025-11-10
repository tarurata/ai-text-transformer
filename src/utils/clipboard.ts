import { Clipboard, showToast, Toast } from "@raycast/api";

export async function getClipboardText(): Promise<string> {
    try {
        const text = await Clipboard.readText();
        if (!text) {
            throw new Error("Clipboard is empty");
        }
        return text;
    } catch (error) {
        throw new Error("Failed to read clipboard");
    }
}

export async function setClipboardText(text: string, showSuccess = true): Promise<void> {
    try {
        await Clipboard.copy(text);
        if (showSuccess) {
            await showToast({
                style: Toast.Style.Success,
                title: "Copied to clipboard",
                message: "Transformed text has been copied to clipboard",
            });
        }
    } catch (error) {
        throw new Error("Failed to write to clipboard");
    }
}

export async function pasteText(text: string): Promise<void> {
    try {
        await Clipboard.copy(text);
        // Small delay to ensure clipboard is updated
        await new Promise((resolve) => setTimeout(resolve, 100));
        // Note: Raycast doesn't have a direct paste function, but we can copy and user can paste
        await showToast({
            style: Toast.Style.Success,
            title: "Ready to paste",
            message: "Press Cmd+V to paste the transformed text",
        });
    } catch (error) {
        throw new Error("Failed to prepare text for pasting");
    }
}

