import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // 3. Ajouter une nouvelle tâche
  addTache(tache: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tache);
  }

  // 4. Mettre à jour une tâche
  updateTache(id: number, tache: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tache);
  }

  // 5. Supprimer une tâche
  deleteTache(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 6. Récupérer les tâches par mission ID
  getTasksByMission(missionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mission/${missionId}`);
  }
}
