import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  
  private baseUrl = 'http://localhost:8082/pidev/Api/logistique'; 
  
    constructor(private http: HttpClient) { }

    ajouterCommande(commande: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/ajouterCommande`, commande);
    }
    getAllCommandes(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/getAllCommande`);
    }
    deleteCommande(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/supprimerCommande/${id}`);
    }
    getCommandeByFournisseur(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/getCommandeByFournisseur/${id}`);
    }
    modifierCommande(id: number, status: string): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/modifierCommande/${id}/${status}`, {});
    }
    

}
