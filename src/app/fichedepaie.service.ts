import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,map , Observable } from 'rxjs';
import { BulletinPaie } from './core/models/FicheDePai';
import { Router } from '@angular/router';
import { Paiement } from './core/models/Paiement';

@Injectable({
  providedIn: 'root'
})
export class FichedepaieService {

private apiUrl = 'http://localhost:8089/pidev/Api/ficheDePaie'; // Remplacez par l'URL de votre API


  constructor(private http: HttpClient) { }

  addFicheDePaie(fiche: BulletinPaie): Observable<BulletinPaie> {
    return this.http.post<BulletinPaie>(this.apiUrl, fiche);
  }
  
   getFicheDePaie(): Observable<BulletinPaie[]> {
    return this.http.get<BulletinPaie[]>(this.apiUrl);
  }


  

  calculerSalaire(idBulletinPaie: number): Observable<BulletinPaie> {
    return this.http.post<BulletinPaie>(`${this.apiUrl}/${idBulletinPaie}`, {});
  }


imprimerFiche(idBulletinPaie: number): Observable<Blob> {
  const url = `${this.apiUrl}/${idBulletinPaie}/print`;
  window.open(url, '_blank'); 
  return this.http.get(url, { responseType: 'blob' });
}

updateFicheDePaie(fiche: BulletinPaie): Observable<BulletinPaie> {
  return this.http.put<BulletinPaie>(`${this.apiUrl}/${fiche.idBulletinPaie}`, fiche);
}



getFicheById(id: number): Observable<BulletinPaie> {
  return this.http.get<BulletinPaie>(`${this.apiUrl}/${id}`);
}

}
