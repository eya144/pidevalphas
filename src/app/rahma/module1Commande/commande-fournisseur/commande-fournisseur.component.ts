import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommandeService } from 'serviceLogistique/commande.service';
import { NotificationService } from 'serviceLogistique/notification.service';

@Component({
  selector: 'app-commande-fournisseur',
  templateUrl: './commande-fournisseur.component.html',
  styleUrls: ['./commande-fournisseur.component.css']
})
export class CommandeFournisseurComponent implements OnInit {

  commandes: any[] = []; // Stocke les commandes
  idFournisseur: number = 1; // ID du fournisseur (à récupérer dynamiquement)

  constructor(private commandeService: CommandeService, private cdr: ChangeDetectorRef , private notificationService :  NotificationService) {}

  ngOnInit(): void {
    this.getCommandesByFournisseur();
  }

  // Récupérer les commandes du fournisseur
  getCommandesByFournisseur(): void {
    this.commandeService.getCommandeByFournisseur(this.idFournisseur).subscribe(
      (data) => {
        this.commandes = data;
        this.cdr.detectChanges(); // 🔥 Forcer Angular à détecter les changements
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes du fournisseur:', error);
      }
    );
  }

  modifierCommande(id: number, status: string): void {
    this.commandeService.modifierCommande(id, status).subscribe(
      (response) => {
        alert(response);
  
        // Mise à jour du statut dans la liste
        this.commandes = this.commandes.map(commande =>
          commande.idCommande === id ? { ...commande, status } : commande
        );
      
  
        // Envoi de la notification
        const commandeModifiee = this.commandes.find(c => c.idCommande === id);
        if (commandeModifiee) {
          this.notificationService.sendCommandeNotification(commandeModifiee, status);
        }
  
        this.cdr.detectChanges();
      },
      (error) => {
        alert(error.error);
      }
    );
  }
  }
