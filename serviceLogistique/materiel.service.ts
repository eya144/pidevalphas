import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/rahma/model/demande.model';

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
  ajouterLigneDemande(ligneDemande: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ajouterLigneDemande`, ligneDemande);
  }
  modifierLigneDemande(ligneDemande: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/modifierLigneDemande`, ligneDemande);
  }
  ajouterDemande(demande: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ajouterDemande`, demande, { observe: 'response' });
}

getDemandeById(id: number): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/demande/${id}`);
}
  // Récupérer les lignes de demande par l'ID de la demande
  getLigneDemandeByIDDemande(idDemande: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getLigneDemandeByIDDemande/${idDemande}`);
  }
  getAllDemandes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllDemande`);
  }
  getDemandesByUser(idUser: number): Observable<Demande[]> {
    return this.http.get<Demande[]>(`${this.baseUrl}/getDemandesByUser/${idUser}`);
  }
  deleteLigneDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteLigneDemandeById/${id}`);
  }
  deleteDemande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteDemande/${id}`);
  }
  updateQuantiteLigneDemande(idLigneDemande: number, nouvelleQuantite: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateQuantiteLigneDemande/${idLigneDemande}`, null, {
        params: { nouvelleQuantite: nouvelleQuantite.toString() }
    });
}
updateStatusDemande(idDemande: number, newStatus: string): Observable<Demande> {
  return this.http.put<Demande>(`${this.baseUrl}/updateStatusDemande/${idDemande}`, null, {
    params: { newStatus }
  });
}
}
