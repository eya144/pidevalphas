import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Status, Tache } from './Model/Tache';

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  private apiUrl = 'http://localhost:8090/pidev/api/taches';

  constructor(private http: HttpClient) {}

  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrl);
  }

  getTacheById(id: number): Observable<Tache> {
    return this.http.get<Tache>(`${this.apiUrl}/${id}`);
  }

  addTache(tache: Tache, missionId: number): Observable<Tache> {
    return this.http.post<Tache>(`${this.apiUrl}/mission/${missionId}`, tache, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  updateTache(id: number, tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/${id}`, tache);
  }

  deleteTache(idTache: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idTache}`);
  }

  getTasksByMission(missionId: number): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/mission/${missionId}`);
  }

  searchTasks(nom: string, etat: Status, priorite: string): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/search`, {
      params: {
        nom: nom || '',
        etat: etat || '',
        priorite: priorite || '',
      },
    });
  }

  updateTaskStatus(idTache: number, status: Status): Observable<Tache> {
    const encodedStatus = encodeURIComponent(status);
    const url = `${this.apiUrl}/${idTache}/status?status=${encodedStatus}`;

    return this.http.put<Tache>(url, null, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      tap({
        next: (response) => {
          console.log('✅ Statut mis à jour :', response);
        },
        error: (err) => {
          console.error('❌ Erreur lors de la mise à jour du statut :', err);
        }
      })
    );
  }

  notifyTaskUpdate(taskId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${taskId}/notify-update`, {});
  }
}
