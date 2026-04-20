import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ApiConfig, FileRef } from '../../models';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Input() config: ApiConfig | null = null;
  @Output() fileUploaded = new EventEmitter<FileRef>();

  isDragOver = false;
  isUploading = false;
  uploadedFile: FileRef | null = null;
  errorMessage = '';

  constructor(private chatService: ChatService) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
      // Reset input so the same file can be selected again
      input.value = '';
    }
  }

  private processFile(file: File): void {
    // Validate file type
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      this.errorMessage = 'Only PDF files are accepted.';
      return;
    }

    if (!this.config) {
      this.errorMessage = 'Please configure the API settings first.';
      return;
    }

    this.errorMessage = '';
    this.isUploading = true;
    this.uploadedFile = null;

    this.chatService.uploadFile(file, this.config).subscribe({
      next: (fileRef) => {
        this.isUploading = false;
        this.uploadedFile = fileRef;
        this.fileUploaded.emit(fileRef);
      },
      error: (err) => {
        this.isUploading = false;
        const message = err?.error?.error || err?.message || 'Upload failed. Please try again.';
        this.errorMessage = message;
      }
    });
  }
}
