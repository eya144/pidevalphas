import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterielService } from 'serviceLogistique/materiel.service';

@Component({
  selector: 'app-demande-materiel',
  templateUrl: './demande-materiel.component.html',
  styleUrls: ['./demande-materiel.component.css']
})
export class DemandeMaterielComponent {
  constructor(
    private materielService: MaterielService,
    private router: Router,
  ){}

  materiels: any[] = [];
  materielSelectionne: { [id: number]: boolean } = {};
  quantites: { [id: number]: number } = {}; 
  ligneDemandes: any[] = [];  // Stocke les lignes de demande avant envoi

  categories: string[] = [
    'MATERIAUX_CONSTRUCTION', 'METAUX', 'BOIS_ET_DERIVES',
    'ISOLATION', 'ELECTRICITE', 'PLOMBERIE',
    'PEINTURE_ET_FINITIONS', 'OUTILS_ET_EQUIPEMENTS_CHANTIER',
    'REVETEMENTS_SOL_MUR', 'MATERIAUX_ECOLOGIQUES_ET_INNOVANTS'
  ];

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
 

  toggleCommande(idMateriel: number): void {
    this.materielSelectionne[idMateriel] = !this.materielSelectionne[idMateriel];

    if (!this.materielSelectionne[idMateriel]) {
      delete this.quantites[idMateriel]; // Supprime complètement la quantité
    }
  }

  hasSelectedMateriels(): boolean {
    return Object.keys(this.materielSelectionne).some(id => this.materielSelectionne[+id] && this.quantites[+id] > 0);
  }

  passerCommande(materiel: any): void {
    const quantite = this.quantites[materiel.idMateriel];

    if (!quantite || quantite <= 0) {
        alert('Veuillez entrer une quantité valide.');
        return;
    }

    const ligneDemande = {
        quantite: quantite,
        materiel: { idMateriel: materiel.idMateriel },
        demande: null
    };

    this.ligneDemandes.push(ligneDemande); // Stocker la ligne localement

    console.log('Ligne de demande ajoutée temporairement:', ligneDemande);
    alert('Ligne de demande enregistrée temporairement.');
  }

  passerCommandeFinale(): void {
    const dateActuelle = new Date();

    const lignesDemande = Object.keys(this.materielSelectionne)
        .filter(id => this.materielSelectionne[+id] && this.quantites[+id] > 0)
        .map(id => ({
            quantite: this.quantites[+id],
            materiel: { idMateriel: +id }
        }));

    if (lignesDemande.length === 0) {
        alert('Veuillez sélectionner au moins un matériel avec une quantité valide.');
        return;
    }

    const nouvelleDemande = {
        status: 'envoye',
        dateDemande: dateActuelle.toISOString(),
        ligneDemandes: lignesDemande
    };

    this.materielService.ajouterDemande(nouvelleDemande).subscribe(
        response => {
            console.log('Demande ajoutée avec succès', response.body);
            alert('Commande enregistrée avec succès.');

            this.materielSelectionne = {};
            this.quantites = {};

            this.router.navigate([`/detailDemande`, response.body.idDemande]);
        },
        error => {
            console.error('Erreur lors de l\'ajout de la demande', error);
            alert('Erreur lors de l\'ajout de la demande.');
        }
    );
}
}
