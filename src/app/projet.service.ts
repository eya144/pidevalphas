import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from './core/models/Projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiUrl = 'http://localhost:8080/pidev/api/projets'; // URL de l'API

  constructor(private http: HttpClient) {}

  // 🟢 Récupérer tous les projets
  getProjets(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.apiUrl);
  }

  // 🔍 Récupérer un projet par ID
  getProjetById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/${id}`);
  }

  // ➕ Ajouter un projet
  addProjet(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, projet);
  }

  // ✏ Mettre à jour un projet
  updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/${projet.idProjet}`, projet);
  }

  // ❌ Supprimer un projet
  deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
