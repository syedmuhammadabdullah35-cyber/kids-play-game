# Kids Play Game - Local Setup

This project was built using React, Vite, and Tailwind CSS. To run it locally on your computer, follow these steps:

## Prerequisites
Make sure you have **Node.js** installed on your computer. You can download it from [nodejs.org](https://nodejs.org/).

## Steps to Run
1. **Open the project folder** in VS Code.
2. **Open the Terminal** in VS Code (Press `Ctrl + ` ` or go to Terminal -> New Terminal).
3. **Install dependencies**:
   Type this command and press Enter:
   ```bash
   npm install
   ```
4. **Start the Development Server**:
   Type this command and press Enter:
   ```bash
   npm run dev
   ```
5. **Open the App**:
   Vite will give you a link (usually `http://localhost:3000` or `http://localhost:5173`). Click that link to see your game!

## Why "Go Live" doesn't work?
The "Go Live" extension in VS Code is for simple HTML/CSS websites. Since this is a **React** project, it needs a special "compiler" (Vite) to turn the code into something the browser can understand. Running `npm run dev` starts that compiler.
