import { Component, OnInit, ViewChild, ElementRef, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentChatService } from '../document-chat.service';

interface Document {
  id: number;
  fileName: string;
}

interface ChatMessage {
  id: number;
  question: string;
  response: string;
  timestamp: string;
}

@Component({
  selector: 'app-document-chat',
  templateUrl: './document-chat.component.html',
  styleUrls: ['./document-chat.component.css']
})
export class DocumentChatComponent implements OnInit {
  documents = signal<Document[]>([]);
  selectedDocumentId = signal<number | null>(null);
  chatMessages = signal<ChatMessage[]>([]);
  question = signal<string>('');
  loading = signal<boolean>(false);

  selectedFile = signal<File | null>(null);
  fileError = signal<string | null>(null);
  isUploading = signal<boolean>(false);

  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private http: HttpClient,
    private documentChatService: DocumentChatService
  ) {}

  ngOnInit() {
    this.fetchDocuments();
  }

  fetchDocuments() {
    this.documentChatService.getAll().subscribe((docs: any) => this.documents.set(docs as Document[]));
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFileSelection(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      this.fileError.set('Only PDF files are allowed.');
      this.selectedFile.set(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.fileError.set('File size must be less than 2MB.');
      this.selectedFile.set(null);
      return;
    }

    this.fileError.set(null);
    this.selectedFile.set(file);
  }

  uploadFile() {
    if (!this.selectedFile()) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile() as File);

    this.isUploading.set(true);
    this.documentChatService.upload(formData).subscribe(() => {
      this.fetchDocuments();
      this.selectedFile.set(null);
      this.isUploading.set(false);
    }, () => this.isUploading.set(false));
  }

  fetchChatHistory(documentId: number) {
    this.selectedDocumentId.set(documentId);
    this.chatMessages.set([]);
    this.loading.set(true);

    this.documentChatService.getChatMessages(documentId).subscribe((messages: any) => {
      this.chatMessages.set(messages as ChatMessage[]);
      this.loading.set(false);
      this.scrollToBottom();
    }, () => this.loading.set(false));
  }

  sendQuestion() {
    if (!this.selectedDocumentId() || !this.question().trim()) return;

    this.loading.set(true);
    this.scrollToBottom();

    this.documentChatService.askQuestion(this.selectedDocumentId() as number, this.question()).subscribe({
      next: (response: any) => {
        console.log("response", response);
        this.chatMessages.set([...this.chatMessages(), response]);
        this.loading.set(false);
        this.scrollToBottom();
      },
      error: () => {
        this.loading.set(false);
      }
    });

    this.question.set('');
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }
}
