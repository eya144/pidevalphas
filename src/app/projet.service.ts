import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Projet } from './core/models/Projet';
 // Vérifie le chemin correct du modèle

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiUrl = 'http://localhost:8080/pidev/api/projets';  // URL de l'API

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // Récupérer tous les projets
  getAllProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer un projet par son ID
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Ajouter un nouveau projet
  ajouterProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, projet, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Mettre à jour un projet existant
  updateProjet(id: number, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/${id}`, projet, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Supprimer un projet
  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs
  private handleError(error: any) {
    console.error('Erreur dans ProjetService:', error);
    return throwError(() => new Error(error.message || 'Une erreur est survenue.'));
  }
}
