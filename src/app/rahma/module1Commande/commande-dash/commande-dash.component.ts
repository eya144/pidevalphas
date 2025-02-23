import { Component, OnInit } from '@angular/core';
import { CommandeService } from 'serviceLogistique/commande.service';
import { LigneCommandeService } from 'serviceLogistique/ligne-commande.service';

@Component({
  selector: 'app-commande-dash',
  templateUrl: './commande-dash.component.html',
  styleUrls: ['./commande-dash.component.css']
})
export class CommandeDashComponent implements OnInit {

  commandes: any[] = []; // Tableau pour stocker les commandes
  lignesCommandeVisible: { [key: number]: boolean } = {}; // Pour gérer l'affichage des lignes de commande
  lignesCommande: { [key: number]: any[] } = {}; // Pour stocker les lignes de commande par ID de commande

  constructor(
    private commandeService: CommandeService,
    private ligneCommandeService: LigneCommandeService
  ) {}

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getAllCommandes().subscribe(
      (data) => {
        this.commandes = data; // Stocker les données dans le tableau
        console.log('Commandes chargées:', this.commandes);
      },
      (error) => {
        console.error('Erreur lors du chargement des commandes:', error);
      }
    );
  }

  // Méthode pour afficher/masquer les détails des lignes de commande
  toggleLignesCommande(idCommande: number): void {
    if (this.lignesCommandeVisible[idCommande]) {
      this.lignesCommandeVisible[idCommande] = false;
    } else {
      this.ligneCommandeService.getLignesCommandeByCommande(idCommande).subscribe(
        (data) => {
          this.lignesCommande[idCommande] = data; // Stocker les lignes de commande
          this.lignesCommandeVisible[idCommande] = true; // Afficher les détails
        },
        (error) => {
          console.error('Erreur lors du chargement des lignes de commande:', error);
        }
      );
    }
  }

  supprimerCommande(idCommande: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette commande ?')) {
      this.commandeService.deleteCommande(idCommande).subscribe(
        () => {
          console.log('Commande supprimée avec succès');
          this.commandes = this.commandes.filter(cmd => cmd.idCommande !== idCommande);
        },
        (error) => {
          console.error('Erreur lors de la suppression de la commande:', error);
        }
      );
    }
  }
  
}