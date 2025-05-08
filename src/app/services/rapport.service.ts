import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RapportQualite } from 'src/models/Inspection.model';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  private apiUrl = 'http://localhost:8083/pidev/Rapport'; // URL backend

  constructor(private http: HttpClient) {}

  getAllRapports(): Observable<RapportQualite[]> {
    return this.http.get<RapportQualite[]>(`${this.apiUrl}/getAllRapportQualite`);
  }

  getRapportById(idR: number): Observable<any> {
    console.log('Fetching rapport with ID:', idR);  // Log pour vérifier l'ID passé
    return this.http.get<any>(`${this.apiUrl}/getRapportQualiteById/${idR}`);
  }




  deleteRapport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }


  addRapport(idInspection: number, formData: FormData): Observable<RapportQualite> {
    return this.http.post<RapportQualite>(`${this.apiUrl}/${idInspection}/add`, formData);
  }
  updateRapport(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/update`, formData);
  }

  generateRapport(inspectionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate/${inspectionId}`, {});
  }

}

 

