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
          
    
}
