import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig, ChatMessage, FileRef } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {}

  /**
   * Upload a PDF file to the backend.
   * For OpenAI: returns { fileId, fileName }
   * For Gemini: returns { fileBase64, mimeType, fileName }
   */
  uploadFile(file: File, config: ApiConfig): Observable<FileRef> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('apiType', config.apiType);
    formData.append('apiKey', config.apiKey || '');

    return this.http.post<FileRef>('/api/upload', formData);
  }

  /**
   * Send a chat message with conversation history.
   */
  sendMessage(
    messages: ChatMessage[],
    config: ApiConfig,
    fileRef: FileRef | null
  ): Observable<{ reply: string }> {
    const body = {
      apiType: config.apiType,
      apiKey: config.apiKey || '',
      model: config.model,
      messages,
      fileRef: fileRef ?? null
    };

    return this.http.post<{ reply: string }>('/api/chat', body);
  }
}
