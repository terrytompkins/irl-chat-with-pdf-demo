# IRL Chat with PDF Demo

A full-stack tutorial application demonstrating how to build an AI-powered chat interface that can read and discuss uploaded PDF documents. Supports both the OpenAI and Google Gemini APIs.

This app is intended as a learning resource for developers who are new to working with Large Language Model (LLM) APIs. It covers:

- Connecting to commercial LLM APIs (OpenAI, Google Gemini)
- Sending a file (PDF) as part of a conversation
- Maintaining multi-turn chat context across a session
- Proxying LLM API calls through a Node.js backend

---

## How It Works

```
Browser (Angular 19)
    │
    │  HTTP (localhost)
    ▼
Node.js / Express backend        ← your API key lives here
    │
    │  HTTPS
    ├──▶  api.openai.com   (if OpenAI selected)
    └──▶  generativelanguage.googleapis.com   (if Gemini selected)
```

The Angular frontend never calls the LLM APIs directly. All requests are proxied through the local Express backend. This is the recommended pattern for production apps — it keeps API keys off the client and gives you a place to add logging, rate limiting, or auth later.

**PDF handling:** When you upload a PDF, the backend converts it to a base64 string in memory (no disk writes). That base64 payload is attached to the first message of every conversation so the model has the document in context. No database or vector store is involved — context is held in the browser for the duration of your session.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 19 (standalone components, Angular Material) |
| Backend | Node.js 20+ with Express (ES modules) |
| OpenAI integration | `openai` npm package |
| Gemini integration | `@google/generative-ai` npm package |
| Markdown rendering | `ngx-markdown` |
| File uploads | `multer` (memory storage) |

---

## Prerequisites

- **Node.js 20 or higher** — [nodejs.org](https://nodejs.org)
- **npm** (included with Node.js)
- An API key for **OpenAI** and/or **Google Gemini**
  - OpenAI: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
  - Gemini: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

## Setup

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Configure API keys (recommended)

Copy the example environment file and add your keys:

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and fill in one or both keys:

```
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...
```

> **Note:** You can leave these blank and enter the key directly in the app's UI instead. The UI field takes priority over `.env` if both are provided.

### 3. Install frontend dependencies

```bash
cd frontend
npm install
```

---

## Running the App

You need two terminal windows — one for the backend, one for the frontend.

**Terminal 1 — Backend:**

```bash
cd backend
npm run dev      # auto-restarts on file changes
# or
npm start        # plain node, no auto-restart
```

The backend starts on **http://localhost:3000**.

**Terminal 2 — Frontend:**

```bash
cd frontend
npm start
```

The frontend starts on **http://localhost:4200** and automatically proxies `/api` requests to the backend (configured in `frontend/proxy.conf.json`).

Open **http://localhost:4200** in your browser.

---

## Using the App

### Step 1 — Configure the AI

In the **Configuration** panel on the left:

1. Select your **AI API** — OpenAI or Google Gemini
2. Select a **Model** from the dropdown (only PDF-capable models are listed)
3. Enter your **API Key** if you did not add it to `backend/.env`

### Step 2 — Upload a PDF

In the **Upload PDF Document** panel:

- Drag and drop a PDF file onto the upload area, or click it to browse
- Wait for the upload to complete — you'll see a green checkmark and the filename

The PDF is processed by the backend and held in memory. It will be sent to the model as part of every message in your chat session.

> **Tip:** Changing the selected API (OpenAI ↔ Gemini) after uploading will clear the file — you'll need to re-upload.

### Step 3 — Chat

The **Chat** panel starts with a sample prompt asking the model to produce a marketing-oriented summary of a veterinary diagnostics PDF. You can:

- Send the default prompt as-is
- Edit it before sending
- Ask follow-up questions — the PDF stays in context for the whole session
- Use the clear button (top-right of the chat panel) to start a new conversation
- Press **Ctrl+Enter** to send without clicking the button

AI responses are rendered with full Markdown formatting (headings, bold, lists, code blocks).

---

## Available Models

Only models with native PDF support are offered.

| API | Model | Notes |
|---|---|---|
| OpenAI | GPT-4o | Most capable |
| OpenAI | GPT-4o Mini | Faster, lower cost |
| Gemini | Gemini 2.5 Pro Preview | Most capable |
| Gemini | Gemini 2.0 Flash | Fast, efficient |
| Gemini | Gemini 1.5 Pro | High context window |
| Gemini | Gemini 1.5 Flash | Fast, efficient |

---

## Project Structure

```
irl-chat-with-pdf-demo/
├── backend/
│   ├── package.json
│   ├── server.js          # Express app entry point
│   ├── .env.example       # API key template (copy to .env)
│   └── routes/
│       └── chat.js        # /api/upload and /api/chat endpoints
├── frontend/
│   ├── package.json
│   ├── angular.json
│   ├── proxy.conf.json    # Proxies /api → localhost:3000
│   └── src/
│       └── app/
│           ├── models.ts                        # Shared interfaces and constants
│           ├── app.config.ts                    # Angular app providers
│           ├── app.ts                           # Root component (layout)
│           ├── services/
│           │   └── chat.service.ts              # HTTP calls to backend
│           └── components/
│               ├── config-panel/                # API/model/key selector
│               ├── file-upload/                 # Drag-and-drop PDF uploader
│               └── chat/                        # Chat interface
├── claude-code-session.log   # Development session telemetry
└── README.md
```

---

## Key Implementation Notes

### Why does the backend proxy LLM calls?

Calling LLM APIs directly from the browser would expose your API key in network requests visible to anyone with DevTools open. The backend acts as a secure proxy: the key stays on your server, and the frontend only talks to `localhost`.

### Why no Files API for OpenAI?

OpenAI offers a dedicated Files API endpoint for pre-uploading documents. However, corporate network proxies (such as Zscaler) may block POST requests to file-upload endpoints under DLP (Data Loss Prevention) policies. This app avoids that endpoint entirely by sending the PDF as inline base64 data within the chat message body — the same approach used for Gemini.

### How does context persist across turns?

The frontend keeps the full message history in memory and sends the complete conversation array to the backend with every request. The PDF (as base64) is re-attached to the first message of each request. The backend is stateless — it receives everything it needs to reconstruct the conversation each time.

### Why only PDF-capable models?

LLMs that are text-only cannot accept binary file inputs. The model list is filtered to those that support multimodal input including PDF documents.
