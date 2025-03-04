import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Status, Tache } from "./core/models/Tache";

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  private apiUrl = 'http://localhost:8080/pidev/api/taches'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // 1. Get all tasks
  getAllTaches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 2. Get a task by ID
  getTacheById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 3. Add a task
  addTache(tache: any, missionId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mission/${missionId}`, tache, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // 4. Update a task
  updateTache(id: number, tache: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tache);
  }

  // 5. Delete a task
  deleteTache(idTache: number): Observable<void> {
    console.log(`📡 Sending DELETE request for ID: ${idTache}`);
    return this.http.delete<void>(`${this.apiUrl}/${idTache}`);
  }

  // 6. Get tasks by mission ID
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

  // 8. Update task status (new method added)
  updateTaskStatus(idTache: number, status: Status): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/${idTache}/status`, status);
  }
}
