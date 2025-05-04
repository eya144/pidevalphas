import { Component } from '@angular/core';
import { MaterielService } from 'serviceLogistique/materiel.service';
import { Demande, LigneDemande } from '../../model/demande.model';

@Component({
  selector: 'app-liste-demande-by-user',
  templateUrl: './liste-demande-by-user.component.html',
  styleUrls: ['./liste-demande-by-user.component.css']
})
export class ListeDemandeByUserComponent {
  demandes: Demande[] = [];
  userId: number = 1; // Exemple avec idUser = 1, vous pouvez le modifier dynamiquement

  constructor(private demandeService: MaterielService) {}

  ngOnInit(): void {
    this.loadDemandesByUser();
  }

  loadDemandesByUser(): void {
    this.demandeService.getDemandesByUser(this.userId).subscribe(
      (data: Demande[]) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Erreur de chargement des demandes', error);
      }
    );
  }

  // Fonction pour éditer la ligne
  editLigne(ligne: LigneDemande): void {
    ligne.isEditing = true; // Afficher la zone de texte pour modification
  }

  // Fonction pour supprimer une ligne
  deleteLigne(idLigneDemande: number): void {
    this.demandeService.deleteLigneDemande(idLigneDemande).subscribe(
      () => {
        // Retirer la ligne supprimée de la liste des demandes
        this.demandes.forEach(demande => {
          demande.ligneDemandes = demande.ligneDemandes.filter(ligne => ligne.idLigneDemande !== idLigneDemande);
        });
      },
      (error) => {
        console.error('Erreur lors de la suppression de la ligne', error);
      }
    );
  }

  // Fonction pour supprimer la commande entière
  deleteDemande(idDemande: number): void {
    this.demandeService.deleteDemande(idDemande).subscribe(
      () => {
        // Retirer la demande supprimée de la liste des demandes
        this.demandes = this.demandes.filter(demande => demande.idDemande !== idDemande);
      },
      (error) => {
        console.error('Erreur lors de la suppression de la commande', error);
      }
    );
  }

  // Méthode pour cacher la zone de texte après appui sur Entrée
  onEnter(ligne: LigneDemande): void {
    ligne.isEditing = false; // Cacher la zone de texte

    // Appeler le service pour mettre à jour la quantité
    this.demandeService.updateQuantiteLigneDemande(ligne.idLigneDemande, ligne.quantite).subscribe(
        (updatedLigne) => {
            console.log('Quantité mise à jour avec succès:', updatedLigne);
            // Mettre à jour la ligne dans la liste des demandes
            this.demandes.forEach(demande => {
                demande.ligneDemandes = demande.ligneDemandes.map(l => {
                    if (l.idLigneDemande === updatedLigne.idLigneDemande) {
                        return updatedLigne;
                    }
                    return l;
                });
            });
        },
        (error) => {
            console.error('Erreur lors de la mise à jour de la quantité', error);
        }
    );
}
}
   