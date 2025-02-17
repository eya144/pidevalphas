import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeService {
  private baseUrl = 'http://localhost:8082/pidev/Api/logistique'; 

  constructor(private http: HttpClient) { }

  ajouterLigneCommande(ligneCommande: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ajouterLigneCommande`, ligneCommande);
  }

  modifierLigneCommande(id: number, ligneCommande: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifierLigneCommande/${id}`, ligneCommande);
  }  

  supprimerLigneCommande(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/supprimerLigneCommande/${id}`);
  }
  getAllLigneCommande(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllLigneCommande`);
  }
  supprimerLignesSansCommande(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/supprimerLignesCommandeSansIdCommande`);
  }
  getLignesCommandeByCommande(idCommande: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/lignesCommande/${idCommande}`);
  }
  
  
}
