import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LigneCommandeService } from 'serviceLogistique/ligne-commande.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent {
  lignesCommande: any[] = [];
  idCommande!: number;

  constructor(
    private ligneCommandeService: LigneCommandeService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idCommandeParam = params.get('idCommande');
      if (idCommandeParam) {
        this.idCommande = +idCommandeParam;  // Convertir en nombre
        console.log("ID Commande récupéré:", this.idCommande);  // 🔥 Vérification
        this.getLignesCommandeByCommande(this.idCommande);
      }
    });
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
      idfournisseur: 1 ,
      status : "En_attente " // ID fournisseur par défaut
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

  getLignesCommandeByCommande(idCommande: number): void {
    console.log("ID Commande envoyé au backend:", idCommande);  
    this.ligneCommandeService.getLignesCommandeByCommande(idCommande).subscribe(
      (data) => {
        console.log('Réponse reçue du backend:', data);  
        this.lignesCommande = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des lignes de commande', error);
      }
    );
  }
  
  
}