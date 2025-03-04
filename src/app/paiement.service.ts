import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Paiement } from './core/models/Paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:8089/pidev/Api/paiement';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  addPaiement(paiement: Paiement, idFacture: number): Observable<Paiement> {
    const url = `${this.apiUrl}/addPaiement/${idFacture}`;
    console.log('Données envoyées à l\'API :', JSON.stringify(paiement));
    return this.http.post<Paiement>(url, paiement, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erreur API:', error);
    let errorMessage = 'Une erreur est survenue lors de l\'ajout du paiement.';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur : ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur : ${error.status}\nMessage : ${error.error.message || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}