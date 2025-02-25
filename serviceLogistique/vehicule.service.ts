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
    
    
      
}
