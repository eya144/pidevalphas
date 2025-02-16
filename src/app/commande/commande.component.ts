import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from 'serviceLogistique/commande.service';
import { LigneCommandeService } from 'serviceLogistique/ligne-commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {
  lignesCommande: any[] = [];  // Tableau pour stocker les lignes de commande

  constructor(
    private ligneCommandeService: LigneCommandeService,
    private commandeService: CommandeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer toutes les lignes de commande au moment de l'initialisation du composant
    this.ligneCommandeService.getAllLigneCommande().subscribe(
      (data) => {
        this.lignesCommande = data;  // Assigner les données à la variable
      },
      (error) => {
        console.error('Erreur lors de la récupération des lignes de commande', error);
      }
    );
  }

  // Méthode pour calculer le prix total en fonction de la quantité
  calculerPrixTotal(ligneCommande: any): void {
    ligneCommande.prixTotal = ligneCommande.prixUnitaire * ligneCommande.quantite;
  }

  validerCommande(): void {
    // Calculer le prix total de la commande côté frontend
    const prixTotal = this.calculerPrixTotalTotal();
  
    // Créer la commande avec les lignes de commande et l'ID fournisseur par défaut
    const commande = {
      prixTotal: prixTotal,
      ligneCommandes: this.lignesCommande,
      idfournisseur: 1  // ID fournisseur par défaut
    };
  
   
  }
  
  // Méthode pour calculer la somme des prix totaux de toutes les lignes de commande
  calculerPrixTotalTotal(): number {
    return this.lignesCommande.reduce((acc, ligne) => acc + ligne.prixTotal, 0);
  }
  
  supprimerLigneCommande(idLigneCommande: number): void {
    this.ligneCommandeService.supprimerLigneCommande(idLigneCommande).subscribe(
      () => {
        // Supprimer la ligne de commande de l'array local après suppression
        this.lignesCommande = this.lignesCommande.filter(ligne => ligne.idLigneCommande !== idLigneCommande);
        console.log('Ligne de commande supprimée');
      },
      (error) => {
        console.error('Erreur lors de la suppression de la ligne de commande', error);
      }
    );
  }
  modifierLigneCommande(ligneCommande: any): void {
    this.ligneCommandeService.modifierLigneCommande(ligneCommande.idLigneCommande, ligneCommande).subscribe(
      (data) => {
        console.log('Ligne de commande mise à jour', data);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la ligne de commande', error);
      }
    );
  }
  
}