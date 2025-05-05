import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MlService {

  private apiUrl = 'http://localhost:8081/predict';  // Replace with your Spring Boot API endpoint

  constructor(private http: HttpClient) { }

  // Method to send data to the backend for prediction
  predict(features: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, features, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
