import { Component } from '@angular/core';
import { MlService } from '../services/ml.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recommandersystem',
  templateUrl: './recommandersystem.component.html',
  styleUrls: ['./recommandersystem.component.css']
})
export class RecommandersystemComponent {
  title = 'Recommender System of Employees';
  prediction: string = '';
  features = {
    satisfaction_level: null,
    last_evaluation: null,
    number_project: null,
    average_montly_hours: null,
    time_spend_company: null,
    Work_accident: null,
    promotion_last_5years: null
  };

  chatMessage: string = '';  // User's message
  chatHistory: { question: string, response: string }[] = [];  // Chat history
  loading: boolean = false;  // Loading state for chat requests
  error: string = '';  // Error message if the chat request fails

  constructor(private mlService: MlService, private http: HttpClient) {}

 

  // Method to ask a question to the chat
  askQuestion() {
    if (!this.chatMessage) return;
  
    const payload = { prompt: this.chatMessage };
  
    this.http.post('http://localhost:8083/api/chat/ask', payload, { responseType: 'text' }).subscribe({
      next: (response: string) => {
        this.chatHistory.push({
          question: this.chatMessage,
          response: response
        });
        this.chatMessage = ''; // Clear input
      },
      error: (error) => {
        console.error('Error fetching chat response', error);
        this.chatHistory.push({
          question: this.chatMessage,
          response: 'Error: Could not get response from assistant.'
        });
        this.chatMessage = '';
      }
    });

    }



getRecommendation(): void {

  this.mlService.recommend(this.features).subscribe(
    response => {
      this.prediction = `Cluster ${response.cluster} - ${response.label}: ${response.recommendation}`;
    },
    error => {
      console.error('Error fetching recommendation', error);
    }
  );
}

} 

