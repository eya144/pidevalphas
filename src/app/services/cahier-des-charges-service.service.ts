

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CahierDeCharge } from 'src/models/Inspection.model';

@Injectable({
  providedIn: 'root'
})

export class CahierDesChargesServiceService  {
private apiUrl = 'http://localhost:8090/api/cahier-de-charge'; 

constructor(private http: HttpClient) {}

createWithPdf(architecteId: number, formData: FormData): Observable<any> {
  const url = `${this.apiUrl}/create-with-pdf/${architecteId}`;
  return this.http.post(url, formData);
}


// Méthode pour obtenir tous les cahiers de charge
getAllCahiers(): Observable<any[]> {
  const url = `${this.apiUrl}/getAll`;
  return this.http.get<any[]>(url);
}


getCahiersByArchitecteId(architecteId: number): Observable<CahierDeCharge[]> {
  return this.http.get<CahierDeCharge[]>(`${this.apiUrl}/getByArchitecte/${architecteId}`);
}

// Méthode pour obtenir un cahier de charge par ID
getCahierById(id: number): Observable<any> {
  const url = `${this.apiUrl}/getById/${id}`;
  return this.http.get<any>(url);
}

updateCahier(id: number, cahier: FormData): Observable<any> {
  return this.http.put(`${this.apiUrl}/update/${id}`, cahier);
}

// Méthode pour supprimer un cahier de charge
deleteCahier(id: number): Observable<void> {
  const url = `${this.apiUrl}/delete/${id}`;
  return this.http.delete<void>(url);
}
  
}

