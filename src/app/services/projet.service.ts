import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projet } from '../models/Inspection.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
 private apiUrl = 'http://localhost:8083/pidev/Projet';

  constructor(private http: HttpClient) {}
  getProjets(): Observable<any> {
      return this.http.get(`${this.apiUrl}/getAllProjets`);
    }

    getProjetById(id: number): Observable<Projet> {
        return this.http.get<Projet>(`${this.apiUrl}/getProjetById/${id}`);
      }
}
