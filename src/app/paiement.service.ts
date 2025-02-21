import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from 'src/app/core/models/Paiement';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private apiUrl = 'http://localhost:8089/pidev/Api/paiement'; // Remplacez par l'URL réelle de votre backend

  constructor(private http: HttpClient) {}

  getAllPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl);
  }

  addPaiement(paiement: Paiement): Observable<Paiement> {
    console.log('Envoi des données au backend:', paiement); // Ajoutez ce log
    return this.http.post<Paiement>(this.apiUrl, paiement);
  }
  

  updatePaiement(id: number, paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.apiUrl}/${id}`, paiement);
  }

  deletePaiement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getPaiementById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }


}
