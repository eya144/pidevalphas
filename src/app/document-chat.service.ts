import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DocumentChatService {


    private http = inject(HttpClient);

    private url = 'http://localhost:8083/api/';

  constructor() { }

  //get all documents
  getAll() {
      return this.http.get(this.url + 'documents');
  }

  //upload document
  upload(formData: FormData) {
      return this.http.post(this.url + 'upload', formData);
  }

  //get chat messages
  getChatMessages(documentId: number) {
      return this.http.get(this.url + 'chat/history/' + documentId);
  }

  //ask question
  askQuestion(documentId: number, question: string) {
      return this.http.post(this.url + 'chat/' + documentId,  question );
  }
}
