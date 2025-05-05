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

  verifyPayment(sessionId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-payment`, { sessionId }, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  addPaiement(paiement: Paiement, idFacture: number): Observable<Paiement> {
    return this.http.post<Paiement>(`${this.apiUrl}/${idFacture}`, paiement, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}