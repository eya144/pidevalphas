import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TextToSpeechService {
  private apiUrl = 'http://localhost:8083/api/tts'; // Ensure this is the correct URL for your backend

  constructor(private http: HttpClient) {}

  speakText(text: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, text);  // Expecting a JSON response
  }
}
