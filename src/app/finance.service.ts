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
    return this.http.get<Facture[]>(this.apiUrl);
  }

  // Récupère une facture par son ID
  getFactureById(idFacture: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiUrl}/${idFacture}`);
  }

  // Ajoute une nouvelle facture
  addFacture(facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiUrl}/`, facture);
  }

  // Supprime une facture par son ID
  deleteFacture(idFacture: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idFacture}`);
  }

  // Met à jour une facture existante
  updateFacture(idFacture: number, facture: Facture): Observable<Facture> {
    return this.http.put<Facture>(`${this.apiUrl}/${idFacture}`, facture);
  }
}
