# AI Text Transformer

A Raycast extension that applies AI prompts to clipboard content. Transform text instantly with preset prompts or custom instructions.

## Features

- **Apply Prompt to Clipboard**: Read clipboard content, transform it, and write the result back to clipboard
- **Prompt Picker**: Choose from preset prompts like "Polish English", "Summarize", "Bullet Points", etc.
- **Custom Prompts**: Type your own custom instruction directly in the search bar
- **Dual AI Support**: Use OpenAI (with your own API key) or Raycast AI (requires Raycast Pro)

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Icon** (Optional but recommended)
   - Create an `icon.png` file (512x512px) in the root directory
   - Or use Raycast's default icon by skipping this step

3. **Configure API**
   
   Open Raycast preferences and go to Extensions → AI Text Transformer:
   
   - **Option 1: Use OpenAI** (Recommended for full control)
     - Enter your OpenAI API key in the preferences
     - Set the model (default: `gpt-3.5-turbo`, or use `gpt-4` for better quality)
     - Leave "Use Raycast AI" unchecked
   
   - **Option 2: Use Raycast AI**
     - Check "Use Raycast AI" checkbox
     - Requires Raycast Pro subscription
     - No API key needed

4. **Development**
   ```bash
   npm run dev
   ```

5. **Build**
   ```bash
   npm run build
   ```

## Usage

### Apply Prompt to Clipboard

1. Copy text to clipboard (Cmd+C)
2. Open Raycast and run "Apply Prompt to Clipboard"
3. Choose a preset prompt or type a custom instruction
4. The transformed text will be copied to clipboard automatically
5. Paste it wherever you need (Cmd+V)

## Preset Prompts

- **Polish English**: Fix grammar, spelling, and style
- **Summarize in 150 words**: Create concise summaries
- **Bullet Points**: Convert to bullet points
- **Expand**: Add more detail and context
- **Simplify**: Use simpler language
- **Make Formal**: Professional tone
- **Make Casual**: Friendly tone
- **Translate to English**: Translation
- **Fix Grammar**: Grammar and spelling fixes
- **Extract Key Points**: Extract main ideas

## Custom Prompts

Type any instruction in the search bar when no matching preset is found. For example:
- "Rewrite in third person"
- "Convert to markdown format"
- "Make it more persuasive"
- "Add emojis to make it fun"

## Requirements

- macOS
- Raycast
- OpenAI API key (if using OpenAI) OR Raycast Pro (if using Raycast AI)

## License

MIT

