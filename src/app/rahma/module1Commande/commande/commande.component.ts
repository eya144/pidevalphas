import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'serviceLogistique/commande.service';
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
    private commandeService: CommandeService,
    private route: ActivatedRoute,
    private router: Router, 

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
    const idCommande = this.idCommande; // Récupérer l'ID de la commande actuelle
  
    this.ligneCommandeService.getLignesCommandeByCommande(idCommande).subscribe(
      (lignes) => {
        this.lignesCommande = lignes;
        const prixTotal = this.calculerPrixTotalTotal();
  
        // Mise à jour du prix total de la commande
        this.commandeService.modifierCommandePrix(idCommande).subscribe(
          () => {
            alert("Commande confirmée avec le prix total mis à jour !");
            this.router.navigate(['/logistique']); 
          },
          (error) => {
            console.error("Erreur lors de la mise à jour du prix total", error);
          }
        );
      },
      (error) => {
        console.error("Erreur lors de la récupération des lignes de commande", error);
      }
    );
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