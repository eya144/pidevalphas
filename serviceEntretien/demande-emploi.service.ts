import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeEmploiService {
  organiserEntretien(entretienData: { dateEntretien: string; typeEntretient: string; lienMeet: string | null; }) {
    throw new Error('Method not implemented.');
  }
  
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
  getAllDemandesEmploi(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllDemandeEmploi`);
  }
  changerStatutDemande(id: number, nouveauStatut: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateStatut/${id}`, { status: nouveauStatut });
  }
  supprimerDemandeEmploi(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteDemandeEmploiById/${id}`);
}

passerEntretien(idDemandeEmploi: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/ajouter/${idDemandeEmploi}`, {});
}
modifierEntretien(idDemande: number, entretienData: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/modifier/${idDemande}`, entretienData);
}
getDemandesByDateEntretien(date: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/by-date-entretien?date=${date}`);
}
envoyerEmail(email: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/envoyer-email`, { email });
}
envoyerEmailRefus(email: string) {
  return this.http.post(`${this.apiUrl}/envoyer-email-refus`, { email });
}

getDemandesByDateEntretienaujourdhui(date: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/aujourdhui?date=${date}`);
}



  
}
