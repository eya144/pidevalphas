import { catchError, Observable, of } from "rxjs";
import { Paiement } from "./core/models/Paiement";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:8089/pidev/Api/paiement';
  private httpOptions = { 
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }) 
  };

  constructor(private http: HttpClient) {}

  getAllPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error("❌ Erreur lors de la récupération des paiements :", error);
        return of([]); // Retourne un tableau vide en cas d’erreur
      })
    );
  }

  addPaiement(paiement: Paiement, idFacture: number): Observable<Paiement> {
    const url = `${this.apiUrl}/facture/${idFacture}`;
    console.log('Données envoyées :', paiement); // Affiche les données avant l'envoi
    return this.http.post<Paiement>(url, paiement, this.httpOptions).pipe(
      catchError(error => {
        console.error('Erreur lors de l\'ajout du paiement:', error);
        return of(error.error || { message: "Erreur inconnue lors de l'ajout" });
      })
    );
  }


  
  updatePaiement(id: number, paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}/${id}`, paiement, this.httpOptions).pipe(
      catchError(error => {
        console.error(`❌ Erreur lors de la mise à jour du paiement ${id}:`, error);
        return of(error.error || { message: "Erreur lors de la mise à jour" });
      })
    );
  }

  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      catchError(error => {
        console.error(`❌ Erreur lors de la suppression du paiement ${id}:`, error);
        return of();
      })
    );
  }

  getPaiementById(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`❌ Erreur lors de la récupération du paiement ${id}:`, error);
        return of();
      })
    );
  }
}
