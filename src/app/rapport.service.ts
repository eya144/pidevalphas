import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  private baseUrl = 'http://localhost:8090/pidev/api/projets'; // via API Gateway

  constructor(private http: HttpClient) {}

  getRapportProjet(projetId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${projetId}/rapport`);
  }
}
