/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presence } from '../Model/Presence.model';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private apiUrl = 'http://localhost:8089/pidev/api/users';
  constructor(private http: HttpClient) {}

  // Ajouter une présence pour un utilisateur spécifique
  addPresence(userId: number, presence: Presence): Observable<Presence> {
    return this.http.post<Presence>(`${this.apiUrl}/${userId}/presences/add`, presence);
  }

  // Mettre à jour une présence
  updatePresence(id: number, presence: Presence): Observable<Presence> {
    return this.http.put<Presence>(`${this.apiUrl}/update/presences/${id}`, presence);
  }

  // Supprimer une présence
  deletePresence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/presences/delete/${id}`);
  }

  // Obtenir une présence par ID
  getPresenceById(id: number): Observable<Presence> {
    return this.http.get<Presence>(`${this.apiUrl}/presences/get/${id}`);
  }
  getPresencesByUserId(userId: number): Observable<Presence[]> {
    return this.http.get<Presence[]>(`${this.apiUrl}/${userId}/presences`);
  }

  
}*/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presence } from '../Model/Presence.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private apiUrl = 'http://localhost:8089/api/users';

  constructor(private http: HttpClient) {}

  
  private getToken(): string | null {
    return localStorage.getItem('jwtToken'); 
  }

  
  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  
  addPresence(userId: number, presence: Presence): Observable<Presence> {
    return this.http.post<Presence>(`${this.apiUrl}/${userId}/presences/add`, presence, { headers: this.createHeaders() });
  }

  
  updatePresence(id: number, presence: Presence): Observable<Presence> {
    return this.http.put<Presence>(`${this.apiUrl}/update/presences/${id}`, presence, { headers: this.createHeaders() });
  }

  
  deletePresence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/presences/delete/${id}`, { headers: this.createHeaders() });
  }

  
  getPresenceById(id: number): Observable<Presence> {
    return this.http.get<Presence>(`${this.apiUrl}/presences/get/${id}`, { headers: this.createHeaders() });
  }

  
  getPresencesByUserId(userId: number): Observable<Presence[]> {
    return this.http.get<Presence[]>(`${this.apiUrl}/${userId}/presences`, { headers: this.createHeaders() });
  }
  getAllPresences(): Observable<Presence[]> {
    return this.http.get<Presence[]>(`${this.apiUrl}/getAllpresence`, { headers: this.createHeaders() });
  }

  addPresencewithoutHolidays(userId: number, presence: Presence): Observable<Presence> {
    return this.http.post<Presence>(`${this.apiUrl}/${userId}/presences/addWithHolidayCheck`, presence, { headers: this.createHeaders() });
  }
}
