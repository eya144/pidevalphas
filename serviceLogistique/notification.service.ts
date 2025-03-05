import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private oneSignalApiUrl = 'https://onesignal.com/api/v1/notifications';
  private appId = '81b1fdc2-fde1-4f47-991c-0483ece01220';  // Remplace avec ton OneSignal App ID
  private apiKey = 'os_v2_app_qgy73qx54fhupgi4asb6zyasecspf734t73ef6v5gj4eugrpted5gmksztzsa54sacywixg67ueub4hfijt4uhku3o4qvbylff3sepi';  // Remplace avec ta OneSignal REST API Key

  constructor(private http: HttpClient) {}

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
}
