import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommandeService } from 'serviceLogistique/commande.service';

@Component({
  selector: 'app-commande-fournisseur',
  templateUrl: './commande-fournisseur.component.html',
  styleUrls: ['./commande-fournisseur.component.css']
})
export class CommandeFournisseurComponent implements OnInit {

  commandes: any[] = []; // Stocke les commandes
  idFournisseur: number = 1; // ID du fournisseur (à récupérer dynamiquement)

  constructor(private commandeService: CommandeService, private cdr: ChangeDetectorRef) {}

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

  // Modifier une commande et rafraîchir la liste immédiatement
  modifierCommande(id: number, status: string): void {
    this.commandeService.modifierCommande(id, status).subscribe(
      (response) => {
        alert(response); // Afficher le message du backend

        // 🔥 Mise à jour immédiate du statut dans la liste
        this.commandes = this.commandes.map(commande =>
          commande.idCommande === id ? { ...commande, status } : commande
        );

        this.cdr.detectChanges(); // 🔥 Forcer Angular à rafraîchir la vue
      },
      (error) => {
        alert(error.error); // Afficher l'erreur si déjà accepté ou refusé
      }
    );
  }
}
