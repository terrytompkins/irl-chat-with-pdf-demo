export type ApiType = 'openai' | 'gemini';

export interface ApiConfig {
  apiType: ApiType;
  model: string;
  apiKey: string;
}

export interface FileRef {
  fileBase64?: string;
  mimeType?: string;
  fileName: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const OPENAI_MODELS = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' }
];

export const GEMINI_MODELS = [
  { value: 'gemini-2.5-pro-preview-03-25', label: 'Gemini 2.5 Pro Preview' },
  { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
  { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
  { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' }
];

export const DEFAULT_PROMPT = `You are an expert marketing communications specialist for a veterinary diagnostics company. You have been provided with a PDF document detailing veterinary medical diagnostic tests and products. Please analyze the document and provide a comprehensive, marketing-oriented summary that includes:

**Overview**: A brief executive summary highlighting the breadth and value of the diagnostic offerings.

**Featured Tests/Products**: For each diagnostic test or product described, provide:
- Test name and category
- Key clinical applications and what conditions it helps detect or monitor
- Primary benefits for the veterinary practice and their patients
- Any unique differentiators or competitive advantages

**Clinical Impact**: How these diagnostics collectively improve patient outcomes and support veterinary decision-making.

**Practice Benefits**: Operational and business value for veterinary practices (efficiency, client communication, revenue opportunities).

Write in a professional yet accessible tone appropriate for veterinary professionals and practice managers. Emphasize clinical value, reliability, and the positive impact on animal health outcomes.`;
