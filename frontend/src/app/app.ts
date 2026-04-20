import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfigPanelComponent } from './components/config-panel/config-panel.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ChatComponent } from './components/chat/chat.component';
import { ApiConfig, FileRef } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    ConfigPanelComponent,
    FileUploadComponent,
    ChatComponent
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary">
        <span>IRL Chat with PDF Demo</span>
      </mat-toolbar>
      <div class="main-layout">
        <div class="sidebar">
          <app-config-panel (configChanged)="onConfigChanged($event)" />
          <app-file-upload [config]="config" (fileUploaded)="onFileUploaded($event)" />
        </div>
        <div class="chat-area">
          <app-chat [config]="config" [fileRef]="fileRef" />
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    mat-toolbar {
      flex-shrink: 0;
      font-size: 1.25rem;
      font-weight: 500;
    }

    .main-layout {
      display: flex;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      gap: 16px;
      padding: 16px;
      background-color: #f5f5f5;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 320px;
      flex-shrink: 0;
      overflow-y: auto;
    }

    .chat-area {
      flex: 1;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  `]
})
export class App {
  config: ApiConfig | null = null;
  fileRef: FileRef | null = null;

  onConfigChanged(newConfig: ApiConfig): void {
    // When apiType changes, clear the uploaded file reference
    if (this.config && this.config.apiType !== newConfig.apiType) {
      this.fileRef = null;
    }
    this.config = newConfig;
  }

  onFileUploaded(ref: FileRef): void {
    this.fileRef = ref;
  }
}
