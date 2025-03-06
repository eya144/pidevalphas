import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private oneSignalApiUrl = 'https://onesignal.com/api/v1/notifications';
   appId = '81b1fdc2-fde1-4f47-991c-0483ece01220';  // Remplace avec ton OneSignal App ID
  private apiKey = 'os_v2_app_qgy73qx54fhupgi4asb6zyasecspf734t73ef6v5gj4eugrpted5gmksztzsa54sacywixg67ueub4hfijt4uhku3o4qvbylff3sepi';  // Remplace avec ta OneSignal REST API Key
  private notificationsSubject = new Subject<any>();

  constructor(private http: HttpClient) {}
  getRealTimeNotifications() {
    return this.notificationsSubject.asObservable();
  }


  sendNotification(materiel: any): void {
    const notificationData = {
      app_id: this.appId,
      headings: { "en": "Quantité faible de matériel" },
      contents: { "en": `Le matériel ${materiel.nomMateriel} a une quantité inférieure ou égale à 5.` },
      url: "http://localhost:4200/logistique",
      data: { materialId: materiel.idMateriel },
      included_segments: ["Subscribed Users"]  // Envoie aux utilisateurs abonnés
    };

    this.http.post(this.oneSignalApiUrl, notificationData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${this.apiKey}`
      }
    }).subscribe(response => {
      console.log("Notification envoyée avec succès :", response);
    }, error => {
      console.error("Erreur lors de l'envoi de la notification :", error);
    });
  }

 eNotifications() {
    return this.notificationsSubject.asObservable();
  }

  notify(notification: any) {
    console.log("Nouvelle notification locale :", notification);
    this.notificationsSubject.next(notification); // Diffuse la notification aux abonnés
  }
  


  sendCommandeNotification(commande: any, status: string): void {
    const message = `La commande de ${commande.prixTotal} Dt a été ${status}.`;
    this.notify({ message }); // Ajoute localement dans LogistiqueComponent

    // Envoi vers OneSignal
    const notificationData = {
      app_id: this.appId,
      headings: { "en": "Mise à jour de commande" },
      contents: { "en": message },
      url: "http://localhost:4200/logistique",
      included_segments: ["Subscribed Users"]
    };

    this.http.post(this.oneSignalApiUrl, notificationData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${this.apiKey}`
      }
    }).subscribe();
  }
  sendEntretienNotification(entretien: any): void {
    const notificationData = {
      app_id: this.appId, // ID de l'application OneSignal
      headings: { "en": "Entretien prévu aujourd'hui" }, // Titre de la notification
      contents: { "en": `L'entretien pour ${entretien.nom} ${entretien.prenom} est prévu aujourd'hui.` }, // Contenu de la notification
      url: "http://localhost:4200/entretien", // Lien vers la page des entretiens
      data: { entretienId: entretien.idDemandeEmploi }, // Données supplémentaires (optionnel)
      included_segments: ["Subscribed Users"] // Envoie aux utilisateurs abonnés
    };
  
    this.http.post(this.oneSignalApiUrl, notificationData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${this.apiKey}` // Clé API OneSignal
      }
    }).subscribe(response => {
      console.log("Notification d'entretien envoyée avec succès :", response);
    }, error => {
      console.error("Erreur lors de l'envoi de la notification d'entretien :", error);
    });
  }  
}
