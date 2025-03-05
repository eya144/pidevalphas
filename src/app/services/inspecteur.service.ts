import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inspecteur, Inspection } from '../models/Inspection.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspecteurService {
  private apiUrl = 'http://localhost:8083/pidev/Inspecteur';

   constructor(private http: HttpClient) {}
  addInspections(inspecteurId: number, inspections: Inspection[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${inspecteurId}/inspections`, inspections);
  }
 getInspecteurs(): Observable<any> {
  return this.http.get(`${this.apiUrl}/getAllInspecteurs`);
}
addInspectionsToInspecteur(inspecteurId: number, projetId: number, inspections: Inspection[]): Observable<any> {
  return this.http.post(`${this.apiUrl}/${inspecteurId}/inspections?projetId=${projetId}`, inspections);
}
getInspecteurById(id: number): Observable<Inspecteur>
{
 return this.http.get<Inspecteur>(`${this.apiUrl}/getInspecteurById/${id}`);
}
} 
