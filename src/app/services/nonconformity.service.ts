import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NonConformity } from 'src/models/Inspection.model';

@Injectable({
  providedIn: 'root'
})
export class NonconformityService {
  private apiUrl = 'http://localhost:8090/pidev/Nonconform';

  constructor(private http: HttpClient) { }

  getAllNonConformity(): Observable<NonConformity[]> {
    return this.http.get<NonConformity[]>(`${this.apiUrl}/getAllNonConfirmity`);
  }

  getNonConformityById(id: number): Observable<NonConformity> {
    return this.http.get<NonConformity>(`${this.apiUrl}/getNonConfirmityById/${id}`);
  }
  getNonConformityCountByType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/non-conformity-count-by-type`);
  }

  addNonConformity(idInspection: number, nonConformity: NonConformity): Observable<NonConformity> {
    return this.http.post<NonConformity>(`${this.apiUrl}/addNonConfirmity`, nonConformity);
  }

  updateNonConformity(nonConformity: NonConformity): Observable<NonConformity> {
    return this.http.put<NonConformity>(`${this.apiUrl}/updatenonConfirmity`, nonConformity);
  }

  deleteNonConformity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  
  }
  addActionCorrective(nonConformityId: number, actionCorrective: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${nonConformityId}/addActionCorrective`, actionCorrective);
  }
 
    deleteAction(id: number): Observable<void> 
    {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
  

  

}
 