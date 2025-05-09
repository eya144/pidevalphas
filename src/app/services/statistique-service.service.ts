import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueServiceService {

  private apiUrl = 'http://localhost:8090/pidev/statistiques'; // URL backend
  constructor(private http: HttpClient) {}

  // Récupère les statistiques sur les types de non-conformité
  getNonConformityStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nonConformityTypes`);
  }

  // Récupère les statistiques sur les statuts de non-conformité
  getStatutNonConformityStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/statutNonConformity`);
  }

  // Récupère les statistiques sur les actions correctives
  getCorrectiveActionStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/correctiveActions`);
  }

  // Récupérer les statistiques des inspections par projet
  getInspectionsByProjectStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inspectionsByProject`);
  }
  getNonConformityStatstype(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/type`);
  }


  getStatutNonConformityStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/status`);
  }

  // cahier-des-charges.service.ts

getStats(): Observable<{ validated: number, notValidated: number }> {
  return this.http.get<{ validated: number, notValidated: number }>(`${this.apiUrl}/stats`);
}

getCahierParUserStats(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/cahier-par-user`);
}





}