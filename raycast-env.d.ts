/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** OpenAI API Key - Your OpenAI API key (optional if using Raycast AI) */
  "openaiApiKey"?: string,
  /** undefined - Use Raycast AI instead of OpenAI (requires Raycast Pro) */
  "useRaycastAI": boolean,
  /** OpenAI Model - OpenAI model to use (e.g., gpt-4, gpt-3.5-turbo) */
  "openaiModel": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `apply-to-clipboard` command */
  export type ApplyToClipboard = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `apply-to-clipboard` command */
  export type ApplyToClipboard = {}
}

