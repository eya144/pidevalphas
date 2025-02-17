import { Component } from '@angular/core';
import { MaterielService } from 'serviceLogistique/materiel.service';
import { LigneCommandeService } from 'serviceLogistique/ligne-commande.service';
import { Router } from '@angular/router';
import { CommandeService } from 'serviceLogistique/commande.service';

@Component({
  selector: 'app-logistique',
  templateUrl: './logistique.component.html',
  styleUrls: ['./logistique.component.css']
})
export class LogistiqueComponent {
  materiels: any[] = [];
  categories: string[] = [
    'MATERIAUX_CONSTRUCTION', 'METAUX', 'BOIS_ET_DERIVES',
    'ISOLATION', 'ELECTRICITE', 'PLOMBERIE',
    'PEINTURE_ET_FINITIONS', 'OUTILS_ET_EQUIPEMENTS_CHANTIER',
    'REVETEMENTS_SOL_MUR', 'MATERIAUX_ECOLOGIQUES_ET_INNOVANTS'
  ];
  lignesCommande: any[] = [];  // Liste des lignes de commande sélectionnées

  materielSelectionne: { [id: number]: boolean } = {}; // Stocke l'état des checkboxes
  quantites: { [id: number]: number } = {}; // Stocke la quantité saisie par matériel

  constructor(
    private materielService: MaterielService,
    private ligneCommandeService: LigneCommandeService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllMateriels();
  }

  getAllMateriels(): void {
    this.materielService.getMateriels().subscribe(
      (data) => { this.materiels = data; },
      (error) => { console.error('Erreur lors de la récupération des matériels', error); }
    );
  }

  filtrerParCategorie(categorie: string): void {
    this.materielService.getMaterielsByCategorie(categorie).subscribe(
      (data) => { this.materiels = data; },
      (error) => { console.error(`Erreur lors de la récupération des matériels de la catégorie ${categorie}`, error); }
    );
  }

  redirectToAddMateriel(): void {
    this.router.navigate(['/addMateriel']);
  }

  deleteMateriel(idMateriel: number): void {
    this.materielService.deleteMateriel(idMateriel).subscribe(
      () => { this.materiels = this.materiels.filter(materiel => materiel.idMateriel !== idMateriel); },
      (error) => { console.error(`Erreur lors de la suppression du matériel avec l'ID ${idMateriel}`, error); }
    );
  }

  redirectToEditMateriel(idMateriel: number): void {
    this.router.navigate(['/editMateriel', idMateriel]);
  }

  toggleCommande(idMateriel: number): void {
    this.materielSelectionne[idMateriel] = !this.materielSelectionne[idMateriel];
  }

  hasSelectedMateriels(): boolean {
    return Object.keys(this.materielSelectionne).some(id => this.materielSelectionne[+id]);
  }

  redirectToCommande(): void {
    this.router.navigate(['/commande']);
  }

  passerCommande(materiel: any): void {
    const quantite = this.quantites[materiel.idMateriel];
  
    if (!quantite || quantite <= 0) {
      alert('Veuillez entrer une quantité valide.');
      return;
    }
  
    const nouvelleLigneCommande = {
      prixUnitaire: materiel.prixMateriel,
      quantite: quantite,
      prixTotal: materiel.prixMateriel * quantite,
      materiel: { idMateriel: materiel.idMateriel }
    };
  
    // Vérifier si une ligne de commande existe déjà pour ce matériel
    const ligneExistante = this.lignesCommande.find(l => l.materiel.idMateriel === materiel.idMateriel);
  
    if (ligneExistante) {
      // Mettre à jour la ligne de commande existante
      this.ligneCommandeService.modifierLigneCommande(ligneExistante.idLigneCommande, nouvelleLigneCommande).subscribe(
        (response) => {
          alert('Ligne de commande mise à jour avec succès !');
          // Mettre à jour la liste des lignes de commande
          const index = this.lignesCommande.findIndex(l => l.idLigneCommande === ligneExistante.idLigneCommande);
          this.lignesCommande[index] = response;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la ligne de commande', error);
        }
      );
    } else {
      // Ajouter une nouvelle ligne de commande
      this.ligneCommandeService.ajouterLigneCommande(nouvelleLigneCommande).subscribe(
        (response) => {
          alert('Ligne de commande ajoutée avec succès !');
          this.lignesCommande.push(response); // Ajouter la nouvelle ligne à la liste
        },
        (error) => {
          console.error('Erreur lors de l’ajout de la ligne de commande', error);
        }
      );
    }
  }
// logistique.component.ts

passerCommandeGlobale(): void {
  if (this.lignesCommande.length === 0) {
    alert("Veuillez sélectionner au moins un matériel.");
    return;
  }

  // Calcul du prix total de la commande
  const prixTotalCommande = this.lignesCommande.reduce((total, ligne) => total + ligne.prixTotal, 0);

  const nouvelleCommande = {
    idfournisseur: null,  // Ajoutez un fournisseur si nécessaire
    dateCreation: new Date(),
    prixTotal: prixTotalCommande,
    ligneCommandes: this.lignesCommande
  };

  this.commandeService.ajouterCommande(nouvelleCommande).subscribe(
    response => {
      alert("Commande créée avec succès !");
      
      // Supprimer les lignes de commande qui n'ont pas de commande associée
      this.ligneCommandeService.supprimerLignesSansCommande().subscribe(
        () => {
          console.log("Lignes de commande sans commande supprimées.");
        },
        error => {
          console.error("Erreur lors de la suppression des lignes de commande sans commande", error);
        }
      );

      this.materielSelectionne = {}; // Réinitialiser la sélection
      this.quantites = {}; // Réinitialiser les quantités
      this.lignesCommande = []; // Réinitialiser la liste des lignes de commande
      const idCommandeCreee = response.idCommande; // Récupérer l'ID de la commande créée
      
      this.router.navigate(['/commande', idCommandeCreee]); // Naviguer vers la page des commandes filtrées// Redirection vers l'interface /commande
    },
    error => {
      console.error("Erreur lors de la création de la commande", error);
    }
  );
}

}