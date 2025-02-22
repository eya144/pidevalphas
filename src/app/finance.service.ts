import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from './core/models/Factures';  // Importing the Facture model

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  // URL de l'API pour accéder aux factures
  private apiUrl = 'http://localhost:8089/pidev/Api/facture';

  // Adjust this URL if necessary

  constructor(private http: HttpClient) { }

  // Récupère toutes les factures
  getAllFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.apiUrl}`);
  }
  // Récupère une facture par son ID
  getFactureById(idFacture: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiUrl}/${idFacture}`);
  }

   // Ajouter une facture
   addFacture(facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(this.apiUrl, facture);
  }

  // Supprime une facture par son ID
  deleteFacture(idFacture: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idFacture}`);
  }

  // Met à jour une facture existante
  updateFacture(id: number, facture: Facture): Observable<Facture> {
    return this.http.put<Facture>(`${this.apiUrl}/${id}`, facture);
  }
  
    // Méthode pour mettre à jour le statut d'une facture
  updateFactureStatus(idFacture: number, status: 'Paid' | 'Unpaid'): Observable<Facture> {
      const url = `${this.apiUrl}/${idFacture}/status`; // Endpoint pour mettre à jour le statut
      return this.http.put<Facture>(url, { status }); // Envoyer une requête PUT avec le nouveau statut
    }
}
