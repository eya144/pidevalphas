import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commande } from './core/models/Commande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = 'http://localhost:8089/pidev/Api/commande'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAllComm(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.apiUrl);
  }

  createFacture(idCommande: number, idResponsableLogistique: number): Observable<any> {
    const url = `${this.apiUrl}/${idCommande}/add-finance`; // Construct the URL
    const body = { idResponsableLogistique }; // Include the IDResponsableLogistique in the request body
    return this.http.post(url, body); // Send a POST request
  }
}