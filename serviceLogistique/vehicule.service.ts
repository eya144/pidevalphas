import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  

  private baseUrl = 'http://localhost:8082/pidev/Api/logistique'; // Base API URL
  
    constructor(private http: HttpClient) { }
    ajouterVehicule(vehicule: any) {
      return this.http.post(`${this.baseUrl}/ajouterVehicule`, vehicule);
    }
     getVehicule(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getAllVehicule`); 
      }
      getVehiculesByType(type: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/getVehiculeByType`, { params: { type } });
    }
    deleteVehicul(id: number): Observable<void> {  
      return this.http.delete<void>(`${this.baseUrl}/supprimerVehicule/${id}`);
    }
    getVehiculeById(idVehicule: number) {
      return this.http.get<any>(`${this.baseUrl}/getVehiculeById/${idVehicule}`);
    }
    modifierVehicule(id: number, vehicule: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/modifierVehicule/${id}`, vehicule);
    }

    affecterChauffeurAVehicule(idVehicule: number, idChauffeur: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/vehicules/${idVehicule}/affecter/${idChauffeur}`, {});
  }

  desaffecterChauffeurDuVehicule(idVehicule: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/vehicules/${idVehicule}/desaffecter`, {});
  }
  getAllChauffeurs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllChauffeur`);
  }
  getPositionByChauffeur(idChauffeur: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getPositionByChauffeur/${idChauffeur}`);
  }

  getVehiculeByChauffeurId(idChauffeur: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/chauffeur/${idChauffeur}`);
  }

  updatePositionVehicule(idVehicule: number, latitude: number, longitude: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/vehicules/${idVehicule}/updatePosition`, { latitude, longitude });
  }
  
  getVehiculesDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/disponibles`);
  }
  
}
