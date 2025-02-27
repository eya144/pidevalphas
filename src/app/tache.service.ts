import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  private apiUrl = 'http://localhost:8080/pidev/api/taches'; // Remplacez par votre URL d'API
  constructor(private http: HttpClient) {}

  // 1. Récupérer toutes les tâches
  getAllTaches(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 2. Récupérer une tâche par ID
  getTacheById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addTache(tache: any, missionId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mission/${missionId}`, tache, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  
  

  // 4. Mettre à jour une tâche
  updateTache(id: number, tache: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tache);
  }

  deleteTache(taskId: number): Observable<void> {
    console.log(`📡 Envoi de la requête DELETE pour l'ID: ${taskId}`);
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
  
  
  
  

  getTasksByMission(missionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mission/${missionId}`).pipe(
      tap(tasks => console.log("📡 Réponse API des tâches :", tasks))
    );
  }
  
  
}
