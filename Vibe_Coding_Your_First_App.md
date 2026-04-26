# Vibe Coding Your First App
## A Step-by-Step Guide to Building the PDF Chat App on Your Own Computer

> **Who this is for.** You attended the *From Idea to Working App* talk and want to try it yourself. You don't need to be a software engineer. You do need a laptop, an internet connection, about an hour of focused time, and a willingness to read error messages and copy-paste a few commands.

> **What you'll build.** The same web application you saw in the demo: a browser-based tool where you upload a PDF, pick an AI model, and chat with the document. You'll do it by *describing* the application in plain English to an AI coding assistant called Claude Code, which will then write, install, and help you run all the code.

> **What you'll learn.** What "vibe coding" actually feels like. How to give an AI useful instructions. How to respond when it asks clarifying questions. How to handle the inevitable moment something breaks.

---

## Before You Start: A Two-Minute Orientation

A few terms you'll see throughout this guide. Don't memorize them — just know they exist.

- **Terminal** (also called *Command Prompt*, *PowerShell*, or *Shell*). A black window where you type commands instead of clicking buttons. You'll use it to install things and run the app.
- **Node.js**. A piece of software that lets your computer run JavaScript code outside a browser. The app you're building runs on Node.js.
- **API key**. A long secret string from OpenAI or Google that tells their AI you have permission to use it (and to bill you for it). Think of it like a hotel keycard.
- **Claude Code**. The AI coding assistant you'll use. It runs in your terminal and writes code for you based on what you describe.
- **The app**. The thing you're building — a small web application that runs entirely on your own computer.

You will spend almost no time writing code yourself. You will spend most of your time *talking to Claude Code about what you want.*

---

## What You'll Need

| Item | Why | How to get it |
|---|---|---|
| A Mac or Windows PC | To run everything | You probably already have one |
| Internet connection | To install software and call AI APIs | Same |
| About an hour | First sessions take longer than later ones | Block your calendar |
| Node.js (version 20 or higher) | The app runs on Node.js | Step 1 below |
| A Claude account (Pro, Max, Team, or API) | Required to use Claude Code | [claude.com](https://claude.com) — the free tier does *not* include Claude Code |
| Claude Code, installed | The AI assistant that builds the app | Step 2 below |
| An API key from OpenAI **or** Google | The app calls these AIs to read your PDF | Step 3 below |
| A sample PDF | Something to chat with | Any PDF on your computer will do |

> **A note on cost.** API calls to OpenAI and Google are pay-per-use and very inexpensive for personal experimentation — typically pennies per chat. You can set spending limits in both providers' dashboards. Claude Code itself is included with your Claude subscription.

---

## Step 1 — Install Node.js

Node.js is the engine that will run your finished app. The Claude Code installer doesn't strictly require it any more, but the app you're building does.

1. Go to **[nodejs.org](https://nodejs.org)**.
2. Download the **LTS** version (the green button on the left). LTS stands for "Long-Term Support" — it's the stable one.
3. Run the installer. Accept all the defaults by clicking *Next* / *Continue* repeatedly.
4. When it finishes, restart your computer. (This is occasionally necessary so the rest of the system can find Node.js.)

**To check it worked**, open a terminal:
- **Mac:** Press `Cmd + Space`, type `Terminal`, press Enter.
- **Windows:** Press the Windows key, type `PowerShell`, press Enter.

In the terminal window, type:

```
node --version
```

You should see something like `v20.11.0` or higher. If you get an error like *command not found*, restart your computer and try again.

---

## Step 2 — Install Claude Code

This is a one-line command. Open a terminal (same way as above) and paste the line for your operating system.

### macOS

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows

Open **PowerShell** (not Command Prompt) and run:

```powershell
irm https://claude.ai/install.ps1 | iex
```

> **What that command is doing.** It downloads a small installer script from Anthropic's official site and runs it. The installer puts Claude Code on your computer and sets it up so you can launch it from any terminal by typing `claude`.

When the installer finishes, **close your terminal window and open a new one**. (This refreshes the system so it can find the newly installed `claude` command.)

In the new terminal, type:

```
claude --version
```

If you see a version number, you're good. The first time you type just `claude` (without `--version`), it will walk you through signing into your Claude account — follow the prompts.

> If you'd rather use a graphical installer, both platforms also support it. On Mac: `brew install --cask claude-code`. On Windows: `winget install Anthropic.ClaudeCode`. The official installer instructions live at **[code.claude.com/docs/en/setup](https://code.claude.com/docs/en/setup)**.

---

## Step 3 — Get an API Key

You need a key from at least one of the two AI providers. **Pick one to start; you don't need both.**

### Option A — OpenAI

1. Go to **[platform.openai.com/api-keys](https://platform.openai.com/api-keys)**.
2. Sign in (or create an account).
3. You may need to add a payment method and put a small amount of credit on the account ($5 is plenty for experimentation).
4. Click **+ Create new secret key**, give it any name (like `vibe-coding`), and click *Create*.
5. **Copy the key immediately and paste it somewhere safe** — a Notes app, a sticky note. You can never see it again after you close the dialog. It will start with `sk-`.

### Option B — Google Gemini

1. Go to **[aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)**.
2. Sign in with a Google account.
3. Click **Create API key**.
4. Copy the key and store it safely. It will start with `AIza`.

> **Treat your API key like a password.** Don't email it, don't put it in a chat message, don't paste it on screen during a meeting. If you ever suspect it's been seen, go back to the dashboard and revoke it — they're free to regenerate.

---

## Step 4 — Create a Folder for Your App

Decide where on your computer you want your app to live. **Documents** is a fine choice. Inside it, create a new folder called `my-pdf-chat-app` (or anything you like — but keep the name short and avoid spaces).

You can do this in Finder/File Explorer the normal way:
- Right-click in your Documents folder → **New Folder** → name it `my-pdf-chat-app`.

That's it. The folder will be empty for now. Claude Code will fill it with about 28 files over the course of this session.

---

## Step 5 — Start Claude Code in Your New Folder

You need to launch Claude Code *from inside* the folder you just created, so it knows where to write files.

### Mac

1. Open Terminal.
2. Type `cd ` (with a trailing space — note the lower-case letters and the space after).
3. Open Finder, find your `my-pdf-chat-app` folder, and **drag the folder into the Terminal window**. The full folder path will appear after `cd `.
4. Press Enter.
5. Type `claude` and press Enter.

### Windows

1. Open File Explorer, find your `my-pdf-chat-app` folder.
2. Click in the address bar at the top of the window, type `powershell`, and press Enter. PowerShell will open with that folder already selected as the working directory.
3. Type `claude` and press Enter.

You should now see Claude Code's welcome screen in your terminal. The bottom of the window will show a `>` prompt where you'll type to it. **Leave this window open for the rest of the session.**

---

## Step 6 — Give Claude the Initial Prompt

This is the most important step in the entire session. Copy the entire block of text below and paste it into the Claude Code prompt, exactly as written. Then press Enter.

> **Why this prompt is so detailed.** Recall from the talk: vague prompts produce vague results. This prompt names the technology stack, describes every UI element, explains the business use case, and states constraints up front. The original team member wrote a prompt very much like this one — and the quality of the output was a direct consequence.

```
I want to build a small web application that lets a user chat with a PDF
document using a commercial AI model. I am not a professional developer.
Please build this for me, asking me clarifying questions where you need to.

Application overview:
- A web app I run locally on my own computer
- The user uploads a PDF, picks an AI model, enters their API key, and chats
  with the document
- The same PDF stays in the conversation context for follow-up questions

Technical choices:
- Backend: Node.js with Express, written as ES modules
- Frontend: Angular 19 with standalone components
- Use Angular Material for the UI styling
- Render the AI's responses as Markdown (use ngx-markdown)

UI layout (single page):
- A left-hand "Configuration" panel containing:
    - An "AI Provider" selector with two choices: OpenAI and Google Gemini
    - A "Model" dropdown that updates based on the selected provider, and only
      lists models that can read PDF input
    - An "API Key" text field where the user can paste their key
- A "PDF Document" panel under the configuration:
    - A drag-and-drop upload widget that accepts a single PDF
    - Show a green checkmark and the filename once a PDF is uploaded
- A main "Chat" panel taking up most of the screen:
    - A scrollable conversation area
    - A text input pre-filled with a default prompt (see below)
    - Send button, plus Ctrl+Enter as a keyboard shortcut to send
    - A "clear conversation" button at the top right of the chat panel

Default prompt to pre-fill in the chat input:
  "You are an expert marketing communications specialist for a veterinary
  diagnostics company. You have been provided with a PDF document detailing
  veterinary medical diagnostic tests and products. Please analyze the
  document and provide a comprehensive marketing-oriented summary including:
  an overview, featured tests/products, clinical impact, and practice
  benefits. Write in a professional yet accessible tone."

Architecture and security:
- The Angular frontend must NEVER call the AI APIs directly
- All AI API calls must be proxied through the local Node.js backend so the
  API key stays server-side
- The backend should be stateless — no database. The frontend keeps the
  conversation history and sends the full history with each request
- For PDF handling: send the PDF as inline base64 data inside the regular
  chat message body. Do NOT use OpenAI's dedicated Files API endpoint —
  corporate network security tools sometimes block file-upload endpoints.
  The same approach (inline base64) should be used for both OpenAI and
  Gemini for consistency
- Read the API key from a backend .env file by default, but if the user
  enters one in the UI, the UI value takes priority

Models to offer:
- OpenAI: GPT-4o, GPT-4o Mini
- Gemini: Gemini 2.5 Pro, Gemini 2.0 Flash, Gemini 1.5 Pro, Gemini 1.5 Flash

Project structure:
- Two top-level folders: backend/ and frontend/
- Configure the frontend dev server to proxy /api requests to the backend on
  localhost:3000

Deliverables I want from you in this session:
1. All source files written into the current folder
2. A README.md with setup and run instructions
3. A .gitignore that excludes node_modules, .env, and build artifacts
4. A .env.example file showing what keys go in .env (without real values)

Please ask me any clarifying questions before you start coding. When you do
start coding, narrate what you're doing as you go so I can follow along.
```

---

## Step 7 — Answer Claude's Clarifying Questions

Claude Code will almost certainly ask you a handful of questions before it writes any code. **This is good.** Don't skip past it; each answer locks in a real design decision.

You may see questions like the ones below. Answers in italics are reasonable defaults — feel free to use them verbatim.

> *Should I store the API key in a config file, in the UI, or both?*
>
> **Suggested answer:** *Both — read from a backend `.env` file by default, but let the UI field override it.*

> *Should the frontend call the AI APIs directly, or proxy them through the backend?*
>
> **Suggested answer:** *Proxy through the backend. I do not want the API key to ever reach the browser.*

> *Do you need session persistence (a database)?*
>
> **Suggested answer:** *No. Keep the backend stateless. The frontend can hold the conversation in memory.*

> *Which version of Angular should I use?*
>
> **Suggested answer:** *Angular 19, the latest version.*

> *Should I write the default chat prompt now, or leave a placeholder?*
>
> **Suggested answer:** *Use the default prompt I included in my message. We can refine it later.*

If you get a question you don't understand, **just say so** — Claude will explain it in plainer language. A perfectly fine answer is *"I don't know what that means. What would you recommend, and why?"*

---

## Step 8 — Approve Permissions When Asked

As Claude Code starts working, it will ask your permission to do things on your computer:

- **Create files in your folder** — yes, allow.
- **Run terminal commands like `npm install`** — yes, allow. (`npm install` is how Node.js downloads the libraries the app uses.)
- **Read files it just wrote** — yes, allow.

> **Tip — the easy mode for permission prompts.** When Claude asks permission for an action, you'll usually be offered three choices: *Yes once*, *Yes, and don't ask again for this kind of thing in this folder*, and *No*. For your first vibe coding session, the middle option is your friend — it stops the constant interruptions. **It only applies to the current folder**, so you're not granting Claude blanket access to your computer.

If you ever see a permission prompt that surprises you (Claude wants to access something outside your project folder, or talk to an unfamiliar website), **say no and ask Claude what it was trying to do.** It will explain, and you can approve a more limited version.

---

## Step 9 — Let Claude Generate the Code

Sit back. This is the part that feels the most magical. Claude Code will:

1. Create the folder structure (`backend/`, `frontend/`, plus subfolders).
2. Write all the source files — about 28 of them.
3. Run `npm install` in both folders to download dependencies. This step takes 1–3 minutes; you'll see a lot of scrolling text. It's normal.
4. Tell you when it's done and what the next step is.

You'll see filenames flash by like `server.js`, `chat.component.ts`, `package.json`, `README.md`. You don't need to understand any of them. Resist the urge to interrupt — let Claude finish what it's doing.

> **What if it makes a mistake?** It might. The original session in the talk had three small bugs — a missing package, a network issue, and a CSS layout problem. Don't panic if something breaks; we'll handle it in Step 11.

---

## Step 10 — Run the App

When Claude finishes generating the code, ask it to start the app for you. You can paste this:

```
Great. Now please start the backend and the frontend so I can try the app.
Tell me what URL to open in my browser.
```

Claude will run two commands in two terminals (it knows how). When both are running, it will tell you to open something like `http://localhost:4200` in your web browser.

**Open that URL in Chrome, Edge, or Safari.** You should see your application — the configuration panel on the left, the upload area below it, and the chat window taking up most of the screen.

---

## Step 11 — Try It

1. **Configure**: Pick OpenAI or Gemini. Pick a model. Paste your API key.
2. **Upload a PDF**: Drag any PDF onto the upload area. Wait for the green checkmark.
3. **Send the default prompt**: It's already filled in. Press the send button or hit Ctrl+Enter.
4. **Read the response.** The AI will analyze your PDF and write back a marketing summary, formatted with headings and bullet points.
5. **Ask a follow-up.** Try something like *"Rewrite that for a non-technical audience"* or *"What are the three most important points?"* The PDF stays in context — you don't need to re-upload.

---

## Step 12 — When (Not If) Something Breaks

This is the part of vibe coding that separates a productive session from a frustrating one. Things will break. Here's how to handle it.

### The pattern that always works

1. **Look at the error message.** Don't try to interpret it — just locate where it appeared (browser? terminal? a red box on the page?).
2. **Take a screenshot or copy the exact text.**
3. **Paste it back to Claude Code with one sentence of context.** For example:
   > *"When I try to upload a PDF I get this error in the browser. What do you think is going on?"* (paste the screenshot or error text)
4. **Let Claude diagnose.** It will read the error, often identify the cause immediately, and propose a fix. Approve the fix.
5. **Try again.**

That's it. That's the whole loop. The more context you give Claude (full error text, where it appeared, what you were doing when it happened), the faster it diagnoses.

### Common things that go wrong

- **"Cannot find module" or "Module not found"** — A package wasn't installed. Tell Claude *"I'm getting a 'cannot find module' error — see if anything is missing from the dependencies."*
- **A 403 or "blocked" error when calling the AI** — Likely a corporate network security tool. Tell Claude what error you see; it knows how to work around several common ones.
- **Layout looks broken in the browser** — Take a screenshot of the page, paste it to Claude, and say *"the layout looks wrong — see screenshot."* Claude is genuinely good at reading screenshots and fixing CSS issues.
- **The AI response is empty or weird** — Check that you actually entered an API key, that the key is valid, and that you have credit on your account. Tell Claude what you see in the chat window and in the backend terminal.

### A golden rule

**Don't start over.** Whatever happens, the conversation is the asset. Stay in the same Claude Code session and keep iterating. Starting fresh loses all the context Claude has built up about your project.

---

## Step 13 — Make It Yours

Once the basic app works, try extending it. Vibe coding shines for small modifications. Try asking Claude things like:

- *"Add a button to download the conversation as a text file."*
- *"Change the default prompt to summarize the PDF as a one-page legal brief."*
- *"Add a dark mode toggle."*
- *"Let me upload Word documents in addition to PDFs."*

Each request is a new little vibe coding session in miniature. The same rules apply: be specific, answer the clarifying questions, approve the permissions, look at what breaks.

---

## Stopping Claude Code

When you're done for the day:

- In the Claude Code terminal window, type `/exit` and press Enter, or just close the terminal window.
- In the terminals where the app is running, press `Ctrl+C` to stop the backend and frontend.

Your code is saved on disk. Next time you want to work on it, open a terminal in the same folder and run `claude` again — it will pick up where you left off.

---

## What to Do If You Get Truly Stuck

- **Re-read the error message slowly.** Often the answer is right there.
- **Ask Claude.** "I am stuck. Here is what I tried, here is what happened, here is what I expected. What should I try next?"
- **Use the talk's example app as a reference.** The completed application from the demo lives at `irl-chat-with-pdf-demo` and includes a full README explaining how every piece works.
- **Email me.** *(speaker contact here)*

---

## A Final Word

The first session is the hardest. The second is noticeably easier. By the third or fourth, the rhythm — describe, clarify, approve, run, fix — will feel natural.

You won't become a software engineer this afternoon. But you will discover that the gap between "I have an idea" and "I have a working prototype" is much smaller than you thought. That alone is worth the hour.

Have fun.

---

*Built as a take-home companion to the talk* From Idea to Working App: A Live Walk-Through of AI-Assisted Development.

Sources:
- [Claude Code official setup documentation](https://code.claude.com/docs/en/setup)
- [Install Claude Desktop — Claude Help Center](https://support.claude.com/en/articles/10065433-install-claude-desktop)
- [Node.js downloads](https://nodejs.org)
- [OpenAI API keys dashboard](https://platform.openai.com/api-keys)
- [Google AI Studio API keys](https://aistudio.google.com/app/apikey)
