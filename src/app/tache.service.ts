import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Status, Tache } from "./core/models/Tache";

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  private apiUrl = 'http://localhost:8087/pidev/api/taches'; 

  constructor(private http: HttpClient) {}

  // 1. Récupérer toutes les tâches
  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrl);
  }

  // 2. Récupérer une tâche par ID
  getTacheById(id: number): Observable<Tache> {
    return this.http.get<Tache>(`${this.apiUrl}/${id}`);
  }

  // 3. Ajouter une tâche
  addTache(tache: Tache, missionId: number): Observable<Tache> {
    return this.http.post<Tache>(`${this.apiUrl}/mission/${missionId}`, tache, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // 4. Mettre à jour une tâche
  updateTache(id: number, tache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/${id}`, tache);
  }

  // 5. Supprimer une tâche
  deleteTache(idTache: number): Observable<void> {
    console.log(`📡 Envoi de la requête DELETE pour l'ID : ${idTache}`);
    return this.http.delete<void>(`${this.apiUrl}/${idTache}`);
  }

  // 6. Récupérer les tâches par mission ID
  getTasksByMission(missionId: number): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/mission/${missionId}`);
  }

  // 7. Rechercher des tâches
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
    const encodedStatus = encodeURIComponent(status); // Sécurité si jamais le status a un caractère spécial
    const url = `${this.apiUrl}/${idTache}/status?status=${encodedStatus}`;
    console.log('📡 Envoi du statut via URL :', url);
  
    return this.http.put<Tache>(url, null, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      tap({
        next: (response) => {
          console.log('✅ Statut mis à jour :', response);
        },
        error: (err) => {
          console.error('❌ Erreur lors de la mise à jour du statut de la tâche :', err);
        }
      })
    );
  }
  
  
}
