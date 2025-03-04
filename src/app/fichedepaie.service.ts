import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BulletinPaie } from './core/models/FicheDePai';
import { Router } from '@angular/router';
import { Paiement } from './core/models/Paiement';
@Injectable({
  providedIn: 'root'
})
export class FichedepaieService {

private apiUrl = 'http://localhost:8089/pidev/Api/ficheDePaie'; // Remplacez par l'URL de votre API


  constructor(private http: HttpClient) { }

  getFicheDePaie(): Observable<BulletinPaie[]> {
    return this.http.get<BulletinPaie[]>(this.apiUrl);
  }
  updateFicheDePaie(fiche: BulletinPaie): Observable<BulletinPaie> {
    const url = `${this.apiUrl}/${fiche.idBulletinPaie}`; // Assurez-vous que votre API supporte cette URL
    return this.http.put<BulletinPaie>(url, fiche);
  }
  calculerSalaire(idBulletinPaie: number): Observable<BulletinPaie> {
    return this.http.post<BulletinPaie>(`${this.apiUrl}/${idBulletinPaie}`, {});
  }

 /*
  imprimerFiche(idBulletinPaie: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${idBulletinPaie}/print`, { responseType: 'blob' });
}
    */
imprimerFiche(idBulletinPaie: number): Observable<Blob> {
  const url = `${this.apiUrl}/${idBulletinPaie}/print`; // URL pour imprimer la fiche de paie
  return this.http.get(url, { responseType: 'blob' });
}

}