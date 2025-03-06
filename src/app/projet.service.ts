import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from './core/models/Projet';
import { Mission } from './core/models/Mission';  // Assurez-vous de définir un modèle pour Mission

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
  getProjetById(projetId: number): Observable<Projet> {  // Retourner un objet Projet
    return this.http.get<Projet>(`${this.apiUrl}/${projetId}`);  // Corriger l'URL ici
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

  // 🔍 Récupérer les missions d'un projet par ID
  getMissionsByProjetId(projetId: number): Observable<Mission[]> {  // Spécifier le type de Mission
    return this.http.get<Mission[]>(`${this.apiUrl}/${projetId}/missions`);
  }

  // ➕ Ajouter une mission à un projet
  addMissionToProjet(projetId: number, mission: Mission): Observable<Mission> {  // Mission en paramètre
    return this.http.post<Mission>(`${this.apiUrl}/${projetId}/missions`, mission);
  }
  searchProjets(nom?: string, status?: string): Observable<Projet[]> {
    let params: any = {};
    if (nom) params.nom = nom;
    if (status) params.status = status;
  
    return this.http.get<Projet[]>(`${this.apiUrl}/search`, { params });
  }
   // Récupérer les statistiques des projets par statut
   getProjetStats(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/stats`);
  }
  exportProjetToPdf(projetId: number) {
    return this.http.get(`${this.apiUrl}/${projetId}/export-pdf`, { responseType: 'blob' });
  }
  getProjectWeather(projetId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${projetId}/weather`);
  }
  exportProjetToExcel() {
    return this.http.get(`${this.apiUrl}/export-excel`, { responseType: 'blob' });
  }
  
  
}
