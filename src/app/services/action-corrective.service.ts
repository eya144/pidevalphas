import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActionCorrective } from '../models/Inspection.model';

@Injectable({
  providedIn: 'root'
})
export class ActionCorrectiveService {
  private apiUrl = 'http://localhost:8083/pidev/actioncorrective'; // Remplace par ton URL backend

  constructor(private http: HttpClient) {}

  getAllActions(): Observable<ActionCorrective[]> {
    return this.http.get<ActionCorrective[]>(`${this.apiUrl}/getActionCorrective`);
  }

  getActionById(id: number): Observable<ActionCorrective> {
    return this.http.get<ActionCorrective>(`${this.apiUrl}/getActionCorrectiveById/${id}`);
  }

  addAction(action: ActionCorrective): Observable<ActionCorrective> {
    return this.http.post<ActionCorrective>(`${this.apiUrl}/addActionCorrective`, action);
  }

  updateAction(id: number, action: ActionCorrective): Observable<ActionCorrective> {
    return this.http.put<ActionCorrective>(`${this.apiUrl}/updateAc`, action);
  }

  deleteAction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
