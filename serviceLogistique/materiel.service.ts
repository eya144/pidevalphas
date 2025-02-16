import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {

  private baseUrl = 'http://localhost:8082/pidev/Api/logistique'; // Base API URL

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer la liste des matériels
  getMateriels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllMateriel`); 
  }
    // Récupérer les matériels par catégorie
    getMaterielsByCategorie(categorie: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/getMaterielByCategorie?categorie=${categorie}`);
    }
    // Ajouter un nouveau matériel
  addMateriel(materiel: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ajouterMateriel`, materiel);
  }
   // Supprimer un matériel
   deleteMateriel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMateriel/${id}`);
  }
   // Méthode pour récupérer un matériel par son ID
   getMaterielById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getMaterielById/${id}`);
  }

  // Méthode pour modifier un matériel
  updateMateriel(id: number, materiel: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifierMateriel/${id}`, materiel);
  }
}
