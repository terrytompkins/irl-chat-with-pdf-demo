import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chatRouter from './routes/chat.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json({ limit: '50mb' }));

app.use('/api', chatRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  // Log env key availability (not the key values)
  console.log(`OPENAI_API_KEY from env: ${process.env.OPENAI_API_KEY ? 'set' : 'not set'}`);
  console.log(`GEMINI_API_KEY from env: ${process.env.GEMINI_API_KEY ? 'set' : 'not set'}`);
});
