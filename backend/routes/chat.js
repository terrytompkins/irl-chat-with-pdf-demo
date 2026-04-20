import express from 'express';
import multer from 'multer';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Readable } from 'stream';

const router = express.Router();

// Multer with memory storage — no disk writes
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are accepted'));
    }
  }
});

/**
 * Resolve the effective API key:
 * - Request body key takes priority over env var
 */
function resolveKey(bodyKey, envKey) {
  const key = (bodyKey && bodyKey.trim()) ? bodyKey.trim() : (envKey || '');
  return key;
}

// ---------------------------------------------------------------------------
// POST /api/upload
// ---------------------------------------------------------------------------
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { apiType, apiKey } = req.body;

    if (!apiType || !['openai', 'gemini'].includes(apiType)) {
      return res.status(400).json({ error: 'apiType must be "openai" or "gemini"' });
    }

    const fileName = req.file.originalname;
    const fileBuffer = req.file.buffer;
    const mimeType = req.file.mimetype || 'application/pdf';

    // Both APIs use inline base64 — avoids the OpenAI Files API endpoint which
    // corporate DLP (Zscaler) blocks as an external file upload.
    const base64 = fileBuffer.toString('base64');
    return res.json({ fileBase64: base64, mimeType, fileName });

  } catch (err) {
    console.error('Upload error:', err);
    const message = err?.message || 'Upload failed';
    const status = err?.status || err?.statusCode || 500;
    return res.status(status).json({ error: message });
  }
});

// ---------------------------------------------------------------------------
// POST /api/chat
// ---------------------------------------------------------------------------
router.post('/chat', async (req, res) => {
  try {
    const { apiType, apiKey, model, messages, fileRef } = req.body;

    if (!apiType || !['openai', 'gemini'].includes(apiType)) {
      return res.status(400).json({ error: 'apiType must be "openai" or "gemini"' });
    }
    if (!model) {
      return res.status(400).json({ error: 'model is required' });
    }
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages array is required and must not be empty' });
    }

    // ------------------------------------------------------------------
    // OpenAI
    // ------------------------------------------------------------------
    if (apiType === 'openai') {
      const effectiveKey = resolveKey(apiKey, process.env.OPENAI_API_KEY);
      if (!effectiveKey) {
        return res.status(400).json({ error: 'OpenAI API key is required (set in .env or provide in UI)' });
      }

      const openai = new OpenAI({ apiKey: effectiveKey });

      // Build messages — include file inline (base64) in first user message only.
      // Using file_data avoids the Files API endpoint which corporate DLP blocks.
      const openaiMessages = messages.map((msg, i) => {
        if (i === 0 && fileRef?.fileBase64) {
          return {
            role: msg.role,
            content: [
              {
                type: 'file',
                file: {
                  filename: fileRef.fileName,
                  file_data: `data:${fileRef.mimeType || 'application/pdf'};base64,${fileRef.fileBase64}`
                }
              },
              { type: 'text', text: msg.content }
            ]
          };
        }
        return { role: msg.role, content: msg.content };
      });

      const response = await openai.chat.completions.create({
        model,
        messages: openaiMessages
      });

      const reply = response.choices[0].message.content;
      return res.json({ reply });

    // ------------------------------------------------------------------
    // Gemini
    // ------------------------------------------------------------------
    } else {
      const effectiveKey = resolveKey(apiKey, process.env.GEMINI_API_KEY);
      if (!effectiveKey) {
        return res.status(400).json({ error: 'Gemini API key is required (set in .env or provide in UI)' });
      }

      const genAI = new GoogleGenerativeAI(effectiveKey);
      const geminiModel = genAI.getGenerativeModel({ model });

      // Build history: all messages except the last one
      const history = [];
      messages.slice(0, -1).forEach((msg, i) => {
        const parts = [];
        // Attach file inline to the very first message
        if (i === 0 && fileRef?.fileBase64) {
          parts.push({
            inlineData: {
              mimeType: fileRef.mimeType || 'application/pdf',
              data: fileRef.fileBase64
            }
          });
        }
        parts.push({ text: msg.content });
        history.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts
        });
      });

      const chat = geminiModel.startChat({ history });

      // Build the current (last) user message parts
      const lastMsg = messages[messages.length - 1];
      const parts = [];

      // If this is the only message (no history), attach the file here
      if (messages.length === 1 && fileRef?.fileBase64) {
        parts.push({
          inlineData: {
            mimeType: fileRef.mimeType || 'application/pdf',
            data: fileRef.fileBase64
          }
        });
      }
      parts.push({ text: lastMsg.content });

      const result = await chat.sendMessage(parts);
      const reply = result.response.text();

      return res.json({ reply });
    }

  } catch (err) {
    console.error('Chat error:', err);
    const message = err?.message || 'Chat request failed';
    const status = err?.status || err?.statusCode || 500;
    return res.status(status).json({ error: message });
  }
});

export default router;
