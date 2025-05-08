import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inspection, NonConformity, Projet } from 'src/models/Inspection.model';

@Injectable
({
  providedIn: 'root'
})
export class InspectionService {


  private apiUrl = 'http://localhost:8083/pidev/Qualite';

  constructor(private http: HttpClient) {}
  addInspection(inspection: Inspection): Observable<Inspection> {
    return this.http.post<Inspection>(`${this.apiUrl}/ajouterInspection`, inspection);
  }

  addInspections(inspecteurId: number, inspections: Inspection[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${inspecteurId}/inspections`, inspections);
  }

  addInspectionsToInspecteur(inspecteurId: number, projetId: number, inspections: Inspection[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${inspecteurId}/inspections?projetId=${projetId}`, inspections);
  }
  getAllInspections(): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(`${this.apiUrl}/getAllInspections`);
  }
  getInspectionById(id: number): Observable<Inspection>
   {
    return this.http.get<Inspection>(`${this.apiUrl}/getInspectionById/${id}`);
  }
 
  updateInspection( inspection: Inspection): Observable<Inspection> {
    return this.http.put<Inspection>(`${this.apiUrl}/updateInspection`, inspection);
  }

  deleteInspection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  addNonConformityToInspection(idInspection: number, nonConformity: NonConformity): Observable<any> {
    return this.http.post(`${this.apiUrl}/addNonConformite/${idInspection}`, nonConformity);
  }

getNonConformitiesByInspectionId(id: number): Observable<NonConformity[]> {
  return this.http.get<NonConformity[]>(`${this.apiUrl}/${id}/nonConformities`);
}

updateNonConformity(idInspection: number, idNonConformity: number, updatedNonConformity: NonConformity): Observable<NonConformity> {
  const url = `${this.apiUrl}/updateNonConformite/${idInspection}/${idNonConformity}`;
  return this.http.put<NonConformity>(url, updatedNonConformity);
}


getProjetsByNom(nom: string): Observable<Projet[]> {
  return this.http.get<Projet[]>(`http://localhost:8081/projets/nom/${nom}`);
}

ajouterInspection(inspection: Inspection, projetId: number): Observable<Inspection> {
  return this.http.post<Inspection>(`${this.apiUrl}/ajouterInspectionnon?projetId=${projetId}`, inspection);}
}
