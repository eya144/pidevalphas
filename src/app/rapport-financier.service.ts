import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RapportFinancier } from './core/models/RapportFinancier';

@Injectable({
  providedIn: 'root'
})
export class RapportFinancierService {
  private apiUrl = 'http://localhost:8090/pidev/Api/rapportfinancier';

  constructor(private http: HttpClient) {}

  getRapports(): Observable<RapportFinancier[]> {
    return this.http.get<RapportFinancier[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  genererRapport(idUtilisateur: number): Observable<RapportFinancier> {
    return this.http.post<RapportFinancier>(
      `${this.apiUrl}/generer/${idUtilisateur}`, 
      {}
    ).pipe(
      catchError(this.handleError)
    );
  }

  getRapportById(id: number): Observable<RapportFinancier> {
    return this.http.get<RapportFinancier>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Une erreur est survenue';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}