# 🎨 Y1 Theme Editor User Manual

https://theme-editor-pmrbiwuoy-ismileblue.vercel.app/

⚠️ **Note:** This manual and the themes created are only compatible with **Launcher version 0.8 or higher**.

The Y1 Theme Editor is a powerful web-based tool that allows you to intuitively design and build custom themes for your Android device directly from your smartphone or PC browser. Even without coding knowledge, you can create a complete theme package (.zip) simply by dragging, dropping, and adjusting properties.

---

## 🚀 1. Basic Interface (Modes)

You can toggle between two main modes using the buttons at the top left of the editor.

* 🛠️ **Edit Mode:** A design mode where you can click to select elements and freely move them around the screen using **drag and drop**.
* ▶️ **Play Mode:** A mode to simulate how elements will react to wheel scrolling or touching on the actual device. Hover over buttons to preview their focused colors and icon changes.

---

## 🌍 2. Global Settings

Define the core rules and color palette that apply to the entire theme.

* **Theme Name:** Name your theme. (This will also be used as the generated `.zip` file name.)
* **Custom Font:** Upload a custom font (`.ttf`, `.otf`, etc.) to use on the device. It will be applied to the preview window immediately.
* **Colors & Styles (Android Hex):** Set colors using Android's Hex format (`#AARRGGBB`). The editor provides a slider to easily adjust transparency (Alpha).
    * *Text Primary / Secondary:* Main and sub-text colors.
    * *Bg Overlay:* A translucent overlay color placed over the main background wallpaper.
    * *Status Bar Bg:* Background color of the top status bar.
    * *Btn Normal / Focused:* Button background colors for default and selected (focused) states.
* **Default Button Radius:** The default corner roundness applied to all buttons in the theme.

---

## 🧩 3. Element Settings & Types

These are the components (elements) you can place on the screen. Click **[Add New Element]** and change the `Type` to use them. 
*(Note: The editor automatically renders overlapping items in this order: **Design Box ➔ Widget ➔ Button**)*

### 1) Standard Button
* Interactive elements that the user can click or navigate to.
* You can add text and icons, and dictate the wheel scrolling order using the `Focus Index`.

### 2) Widgets
* **Digital Clock:** Displays the current time and date in text format.
* **Analog Clock:** An analog clock with a smooth second hand that inherits your theme's color settings.
* **Circular Battery:** A circular battery gauge with the percentage in the center.
* **Battery Bar:** A horizontal, pill-shaped battery bar.
* **Album Art:** Displays the cover, title, and artist of the currently playing track. You can flexibly align the text relative to the album image (Top, Bottom, Left, Right).

### 3) Design Box
* A pure design element used to partition the screen or create an aesthetic background/frame behind buttons.
* Beyond solid colors, you can **upload high-resolution photos from your PC**. The editor will automatically optimize (compress) them to prevent device overload and create a perfect 'Center Crop' frame matching the box's radius.

---

## 🎯 4. Key Properties Guide

### 📌 Layout & Coordinates
* **Gravity (Anchor):** Determines the reference point for the element's position. (e.g., Selecting `bottom|center_horizontal` and setting Y to 15 will fix the element 15px above the bottom-center of the screen).
* **X / Y:** The offset distance from the chosen Gravity anchor point.
* **Width / Height:** The dimensions of the element. Entering `0` will automatically adjust the size based on its contents (Auto).

### 📌 Text Align
* Specifies the alignment and position of the text inside a button or widget (`Left`, `Center`, `Right`, `Top`, `Bottom`).

### 📌 Focus Index
* A crucial setting exclusively for standard buttons (`Type: button`)!
* It explicitly dictates **the exact order in which the focus moves when spinning the physical wheel** on the Android device. Start from `0` and assign numbers sequentially (`1, 2, 3...`).

### 📌 Action
The direct shortcut command executed on the device when a button is clicked.
* `Now Playing` (Current playback screen)
* `Music Library` (Audio browser)
* `Root Folder` (Device's overall file manager)
* `Bluetooth`, `Wi-Fi Settings`, `Settings Menu` 
* `Web Server` (Wireless file transfer server)
* `Display Brightness`, `Storage Info`, `Date & Time Settings`, etc.

---

## 💾 5. Export & Application

1. Once your design is complete, click the **[Download Theme (.zip)]** button at the bottom right.
2. The editor will gather all the custom fonts, icons, and background images you uploaded and bundle them perfectly into a single `.zip` file.
3. **Unzip (extract)** the downloaded `.zip` file, and move the extracted folder into the `/Y1_Themes/` directory on your Android device. Then, open the app's theme settings and select your new theme to apply it instantly!

💡 **Tip (Import Config):** If you want to modify a theme later, simply extract your downloaded `.zip` file and load the `config.json` file inside it using the **[Import Config]** button. Your workspace and layout will be perfectly restored!




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
