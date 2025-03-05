import { Component } from '@angular/core';
import { MaterielService } from 'serviceLogistique/materiel.service';
import { LigneCommandeService } from 'serviceLogistique/ligne-commande.service';
import { Router } from '@angular/router';
import { CommandeService } from 'serviceLogistique/commande.service';
import { VehiculeService } from 'serviceLogistique/vehicule.service';
import * as XLSX from 'xlsx';
import { NotificationService } from 'serviceLogistique/notification.service';


@Component({
  selector: 'app-logistique',
  templateUrl: './logistique.component.html',
  styleUrls: ['./logistique.component.css']
})
export class LogistiqueComponent {
  materiels: any[] = [];
  vehicules: any[] = [];
  categories: string[] = [
    'MATERIAUX_CONSTRUCTION', 'METAUX', 'BOIS_ET_DERIVES',
    'ISOLATION', 'ELECTRICITE', 'PLOMBERIE',
    'PEINTURE_ET_FINITIONS', 'OUTILS_ET_EQUIPEMENTS_CHANTIER',
    'REVETEMENTS_SOL_MUR', 'MATERIAUX_ECOLOGIQUES_ET_INNOVANTS'
  ];
  typeVehicule: string[] = [
    'CAMION_BENNE',       
    'BETONNIERE',         
    'GRUE_MOBILE',        // Pour soulever et déplacer des charges lourdes
    'CHARGEUSE',          // Pour charger des matériaux comme du sable ou du gravier
    'PELLE_HYDRAULIQUE',  // Pour creuser et déplacer la terre
    'BULLDOZER',          // Pour le nivellement et le terrassement
    'NACELLE_ELEVATRICE', // Pour accéder à des hauteurs en toute sécurité
    'COMPACTEUR',         // Pour compacter le sol ou l’asphalte
    'CAMION_PLATEAU',     // Pour transporter des équipements et matériaux
   'EXCAVATRICE',        // Pour creuser et déplacer de grandes quantités de terre
    'TOMBEREAU',          // Pour transporter des matériaux en vrac sur le chantier
    'FINISSEUR',
  ];
  lignesCommande: any[] = [];  // Liste des lignes de commande sélectionnées
  materielSelectionne: { [id: number]: boolean } = {}; // Stocke l'état des checkboxes
  quantites: { [id: number]: number } = {}; // Stocke la quantité saisie par matériel
  searchTerm: string = '';
  materielsAffiches: any[] = []; // Liste affichée après filtrage
  

 vehiculesAffiches: any[] = []; // Liste affichée après filtrage
// Ajout des variables pour la pagination
currentPage: number = 1;
itemsPerPage: number = 5; // Nombre d'éléments par page
currentPageVehicules: number = 1;
itemsPerPageVehicules: number = 5; // Nombre d'éléments par page
notifications: { message: string }[] = []; // Nouvelle propriété pour les notifications


  constructor(
    private materielService: MaterielService,
    private vehiculeService: VehiculeService,
    private ligneCommandeService: LigneCommandeService,
    private commandeService: CommandeService,
    private router: Router,
    private notificationService: NotificationService
    
  ) {}

  ngOnInit(): void {
    this.getAllMateriels();
    this.getVehicules();
  }
  verifierStockEtNotifier(): void {
    this.notifications = []; // Réinitialiser les notifications
    this.materiels.forEach(materiel => {
      if (materiel.quantite <= 5) {
        const message = `Le matériel ${materiel.nomMateriel} a une quantité faible (${materiel.quantite}).`;
        this.notifications.push({ message });
        this.notificationService.sendNotification(materiel); // Envoyer une notification via le service
      }
    });
  }

  getAllMateriels(): void {
    this.materielService.getMateriels().subscribe(
      (data) => { 
        this.materiels = data;
        this.materielsAffiches = [...this.materiels]; // Initialiser avec tous les matériels
        this.verifierStockEtNotifier(); // Vérifier le stock après avoir récupéré les matériels

      },
      (error) => { console.error('Erreur lors de la récupération des matériels', error); }
    );
  }  

  getVehicules(): void {
    this.vehiculeService.getVehicule().subscribe(
      (data) => { 
        this.vehicules = data;
        this.vehiculesAffiches = [...this.vehicules]; 
        this.setPageVehicules(1); // Réinitialiser à la première page après chargement
      },
      (error) => { console.error('Erreur lors de la récupération des vehicules', error); }
    );
  }
  filtrerParCategorie(categorie: string): void {
    this.materielService.getMaterielsByCategorie(categorie).subscribe(
      (data) => { this.materiels = data; },
      (error) => { console.error(`Erreur lors de la récupération des matériels de la catégorie ${categorie}`, error); }
    );
  }
  filtrerParType(typeVehicule: string): void {
    this.vehiculeService.getVehiculesByType(typeVehicule).subscribe(
      (data) => { this.vehicules = data; },
      (error) => { console.error(`Erreur lors de la récupération des véhicules du type ${typeVehicule}`, error); }
    );    
  }

  redirectToAddMateriel(): void {
    this.router.navigate(['/addMateriel']);
  }
  redirectToAddVehicule() {
    this.router.navigate(['/addVehicule']);
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
    ligneCommandes: this.lignesCommande // Assurez-vous que cette liste est initialisée
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
      
      this.router.navigate(['/commande', idCommandeCreee]); // Naviguer vers la page des commandes filtrées
    },
    error => {
      console.error("Erreur lors de la création de la commande", error);
    }
  );
}
deleteVehicule(idVehicule: number) {
  this.vehiculeService.deleteVehicul(idVehicule).subscribe(
    () => { 
      this.vehicules = this.vehicules.filter(vehicule => vehicule.idVehicule !== idVehicule); 
    },
    (error) => { 
      console.error(`Erreur lors de la suppression du vehicule avec l'ID ${idVehicule}`, error); 
    }
  );
}

redirectToEditVehicule(idVehicule: number): void {
  this.router.navigate(['/editVehicule', idVehicule]);
}


exporterMateriels(): void {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.materiels);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Materiels');
  XLSX.writeFile(wb, 'materiels.xlsx');
}

// Fonction pour exporter les véhicules
exporterVehicules(): void {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.vehicules);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Vehicules');
  XLSX.writeFile(wb, 'vehicules.xlsx');
}

filtrerMateriels(event: Event): void {
  const inputElement = event.target as HTMLInputElement; // Assure que c'est bien un input
  const searchTerm = inputElement.value.trim().toLowerCase(); // Récupère la valeur en minuscule

  if (!searchTerm) {
    this.materielsAffiches = [...this.materiels]; // Réinitialise si vide
  } else {
    this.materielsAffiches = this.materiels.filter(materiel =>
      materiel.nomMateriel.toLowerCase().includes(searchTerm)
    );
  }
}

resetFilters(): void {
  this.getAllMateriels();
}

filtrerVehicules(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const searchTerm = inputElement.value.trim().toLowerCase();

  if (!searchTerm) {
    this.vehiculesAffiches = [...this.vehicules];
  } else {
    this.vehiculesAffiches = this.vehicules.filter(vehicule =>
      vehicule.marque.toLowerCase().includes(searchTerm)
    );
  }
  this.setPageVehicules(1); // Réinitialiser à la première page après filtrage
}
resetFiltersVehicules(): void {
  this.getVehicules(); // Réinitialise la liste des véhicules
}
get materielsPagine(): any[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.materielsAffiches.slice(startIndex, startIndex + this.itemsPerPage);
}

setPage(page: number): void {
  if (page >= 1 && page <= this.totalPages()) {
    this.currentPage = page;
  }
}

totalPages(): number {
  return Math.ceil(this.materielsAffiches.length / this.itemsPerPage);
}

// Génère un tableau des pages disponibles
getPages(): number[] {
  return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
}
get vehiculesPagine(): any[] {
  const startIndex = (this.currentPageVehicules - 1) * this.itemsPerPageVehicules;
  return this.vehiculesAffiches.slice(startIndex, startIndex + this.itemsPerPageVehicules);
}

setPageVehicules(page: number): void {
  const total = this.totalPagesVehicules();
  if (page >= 1 && page <= total) {
    this.currentPageVehicules = page;
  } else {
    console.warn("Page invalide:", page);
  }
}

totalPagesVehicules(): number {
  const totalPages = Math.ceil(this.vehiculesAffiches.length / this.itemsPerPageVehicules);
  return totalPages || 1; // Retourne 1 si totalPages est 0
}

getPagesVehicules(): number[] {
  return Array.from({ length: this.totalPagesVehicules() }, (_, i) => i + 1);
}
verifierStock(materiel: any): void {
  if (materiel.quantite <= 5) {
    this.notificationService.sendNotification(materiel);
  }
}
}