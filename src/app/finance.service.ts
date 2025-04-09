import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facture } from './core/models/Factures';  // Importing the Facture model
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { FichedepaieComptableComponent } from './fichedepaie-comptable/fichedepaie-comptable.component';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  // URL de l'API pour accéder aux factures
  private apiUrl = 'http://localhost:8089/pidev/Api/facture';
  router: any;

  // Static command data
  private staticCommand = {
    idCommande: 2,
    idResponsableLogistique: 5,
    nomCommande: 'Static Command',
    quantite: 120
  };
  // Adjust this URL if necessary
  private facturesSubject = new BehaviorSubject<Facture[]>([]);
  factures$ = this.facturesSubject.asObservable();

  private notificationsSubject = new BehaviorSubject<string[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private messagesSubject = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) { }

   // Charger les factures initiales
   private loadInitialFactures(): void {
    this.http.get<Facture[]>(this.apiUrl).subscribe((factures) => {
      this.facturesSubject.next(factures);
    });
  } 
  // Récupère toutes les factures
  getAllFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.apiUrl}`);
  }

      getFactureById(idFacture: number): Observable<Facture> {
        if (!idFacture || isNaN(idFacture)) {
          console.error('Invalid ID passed to getFactureById:', idFacture);
          return throwError(() => new Error('Invalid invoice ID'));
        }
        return this.http.get<Facture>(`${this.apiUrl}/${idFacture}`).pipe(
          catchError(err => {
            console.error('API Error:', err);
            return throwError(() => new Error('Failed to load invoice'));
          })
        );
      }

  // Ajouter une facture et mettre à jour la liste
  addFacture(facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(this.apiUrl, facture).pipe(
      tap((newFacture) => {
        console.log('Nouvelle facture ajoutée:', newFacture); // Debugging
  
        // Ajouter une notification
        const notification = `Nouvelle facture ajoutée: ${newFacture.idFacture}`;
        const currentNotifications = this.notificationsSubject.value;
        this.notificationsSubject.next([...currentNotifications, notification]);
        console.log('Notifications mises à jour:', this.notificationsSubject.value); // Debugging
  
        // Ajouter un message
        const message = `Une nouvelle facture a été ajoutée avec l'ID: ${newFacture.idFacture}`;
        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next([...currentMessages, message]);
        console.log('Messages mis à jour:', this.messagesSubject.value); // Debugging
      })
    );
  }
  // Récupérer les notifications
  getNotifications(): Observable<string[]> {
    return this.notifications$;
  }

  // Récupérer les messages
  getMessages(): Observable<string[]> {
    return this.messages$;
  }
  // Method to get the static command
  getStaticCommand(): any {
    return this.staticCommand;
  }

  // Supprime une facture par son ID
  deleteFacture(idFacture: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idFacture}`);
  }

  // Met à jour une facture existante
  updateFacture(id: number, facture: Facture): Observable<Facture> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Facture>(url, facture);
  }
  

      updateFactureStatus(idFacture: number, status: 'Paid' | 'Unpaid'): Observable<Facture> {
        return this.http.put<Facture>(
          `${this.apiUrl}/${idFacture}/status`,
          { status }
        );
      }   

  navigateToPaiement(idFacture: number | undefined) {
  if (idFacture !== undefined) {
    this.router.navigate(['/paiement', idFacture]);
  }
}
getAllFichesDePaie(): Observable<FichedepaieComptableComponent[]> {
  return this.http.get<FichedepaieComptableComponent[]>(`${this.apiUrl}/getAll`);
}

exportToExcel(): Observable<Blob> {
  const headers = new HttpHeaders({
    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  return this.http.get(`${this.apiUrl}/excel`, {
    headers: headers,
    responseType: 'blob'
  }).pipe(
    catchError(error => {
      console.error('Error exporting to Excel:', error);
      return throwError(() => new Error('Failed to export to Excel'));
    })
  );
}
}
