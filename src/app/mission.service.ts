import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from './core/models/Mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiUrl = 'http://localhost:8080/pidev/api/missions';

  constructor(private http: HttpClient) {}

  addMission(mission: Mission, projetId: number): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiUrl}/projet/${projetId}`, mission);
  }

  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  getMissionById(idMission: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${idMission}`);
  }

  updateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${this.apiUrl}/${mission.idMission}`, mission);
  }

  deleteMission(idMission: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idMission}`);
  }

  getMissionsByProject(projetId: number): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}/projet/${projetId}`);
  }
}
