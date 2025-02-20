import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeEmploiService {
  
  private apiUrl = 'http://localhost:8082/pidev/Api/entretien';

  constructor(private http: HttpClient) { }

  ajouterDemandeEmploi(demande: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ajouterDemandeEmploi`, demande);
  }
  getDemandeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getDemandeEmploiById/${id}`);
  }
  updateDemandeEmploi(demande: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateDemandeEmploi/${demande.idDemandeEmploi}`, demande);
  }
  
}
