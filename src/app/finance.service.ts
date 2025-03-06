import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facture } from './core/models/Factures';  // Importing the Facture model
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
  // Récupère une facture par son ID
  getFactureById(idFacture: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.apiUrl}/${idFacture}`);
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
  
    // Méthode pour mettre à jour le statut d'une facture
  updateFactureStatus(idFacture: number, status: 'Paid' | 'Unpaid'): Observable<Facture> {
      const url = `${this.apiUrl}/${idFacture}/status`; // Endpoint pour mettre à jour le statut
      return this.http.put<Facture>(url, { status }); // Envoyer une requête PUT avec le nouveau statut
    }
    // Dans votre composant de liste des factures
navigateToPaiement(idFacture: number): void {
  this.router.navigate(['/paiement', idFacture]); // Passez l'ID de la facture
}
getAllFichesDePaie(): Observable<FichedepaieComptableComponent[]> {
  return this.http.get<FichedepaieComptableComponent[]>(`${this.apiUrl}/getAll`);
}

}
