import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BulletinPaie } from './core/models/FicheDePai';

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
  
}
