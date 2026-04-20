import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MarkdownComponent } from 'ngx-markdown';
import { ApiConfig, ChatMessage, FileRef, DEFAULT_PROMPT } from '../../models';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MarkdownComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @Input() config: ApiConfig | null = null;
  @Input() fileRef: FileRef | null = null;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;

  messages: ChatMessage[] = [];
  currentInput = '';
  isLoading = false;
  errorMessage = '';

  private shouldScrollToBottom = false;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.currentInput = DEFAULT_PROMPT;
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  sendMessage(): void {
    const trimmed = this.currentInput.trim();
    if (!trimmed || this.isLoading || !this.config) {
      return;
    }

    this.errorMessage = '';

    // Add user message
    const userMessage: ChatMessage = { role: 'user', content: trimmed };
    this.messages = [...this.messages, userMessage];
    this.currentInput = '';
    this.isLoading = true;
    this.shouldScrollToBottom = true;

    this.chatService.sendMessage(this.messages, this.config, this.fileRef).subscribe({
      next: (response) => {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.reply
        };
        this.messages = [...this.messages, assistantMessage];
        this.isLoading = false;
        this.shouldScrollToBottom = true;
      },
      error: (err) => {
        this.isLoading = false;
        const message = err?.error?.error || err?.message || 'An error occurred. Please try again.';
        this.errorMessage = message;
        this.shouldScrollToBottom = true;
      }
    });
  }

  clearChat(): void {
    this.messages = [];
    this.currentInput = DEFAULT_PROMPT;
    this.errorMessage = '';
    this.isLoading = false;
  }

  private scrollToBottom(): void {
    try {
      const container = this.messagesContainer?.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    } catch {
      // Ignore scroll errors
    }
  }
}
