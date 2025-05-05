import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  
  private baseUrl = 'http://localhost:8082/pidev/Api/logistique'; 

  constructor(private http: HttpClient) { }

  ajouterCommande(commande: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ajouterCommande`, commande);
  }

  getAllCommandes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getAllCommande`);
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/supprimerCommande/${id}`);
  }

  getCommandeByFournisseur(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getCommandeByFournisseur/${id}`);
  }

  modifierCommande(id: number, status: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/modifierCommande/${id}/${status}`, {});
  }

  modifierCommandePrix(idCommande: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/modifierCommandePrix/${idCommande}`, {});
  }

  // ➤ Nombre total de commandes passées par jour
  getCommandesByDay(date: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/statistiques/commandes/jour?date=${date}`);
  }

  // ➤ Nombre total de commandes passées par semaine
  getCommandesByWeek(year: number, week: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/statistiques/commandes/semaine?year=${year}&week=${week}`);
  }

  // ➤ Nombre total de commandes passées par mois
  getCommandesByMonth(year: number, month: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/statistiques/commandes/mois?year=${year}&month=${month}`);
  }

  // ➤ Nombre total de commandes passées par année
  getCommandesByYear(year: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/statistiques/commandes/annee?year=${year}`);
  }
}
