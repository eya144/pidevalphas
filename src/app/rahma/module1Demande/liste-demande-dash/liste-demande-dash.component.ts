import { Component, OnInit } from '@angular/core';
import { MaterielService } from 'serviceLogistique/materiel.service';
import { Demande } from '../../model/demande.model';

@Component({
  selector: 'app-liste-demande-dash',
  templateUrl: './liste-demande-dash.component.html',
  styleUrls: ['./liste-demande-dash.component.css']
})
export class ListeDemandeDashComponent implements OnInit {
  demandes: Demande[] = [];
  alertMessage: string | null = null; // Message d'alerte
  alertClass: string = ''; // Classe CSS pour l'alerte (success, danger, etc.)

  constructor(private materielService: MaterielService) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.materielService.getAllDemandes().subscribe(
      (data: Demande[]) => {
        this.demandes = data;
        console.log('Demandes chargées:', this.demandes);
      },
      (error) => {
        console.error('Erreur de chargement des demandes', error);
      }
    );
  }

  accepterDemande(idDemande: number): void {
    this.materielService.verifierQuantiteMateriel(idDemande).subscribe(
      (response: { suffisant: boolean, message?: string }) => {
        if (response.suffisant) {
          this.materielService.updateStatusDemande(idDemande, 'Accepte').subscribe(
            (updatedDemande) => {
              console.log('Demande acceptée:', updatedDemande);
              this.showAlert('Demande acceptée avec succès.', 'alert-success'); // Afficher une alerte de succès
              this.loadDemandes(); // Recharger la liste des demandes
            },
            (error) => {
              console.error('Erreur lors de l\'acceptation de la demande', error);
              this.showAlert('Erreur lors de l\'acceptation de la demande.', 'alert-danger'); // Afficher une alerte d'erreur
            }
          );
        } else {
          this.showAlert(response.message || 'Quantité de matériel insuffisante.', 'alert-warning'); // Afficher une alerte d'avertissement
        }
      },
      (error) => {
        console.error('Erreur lors de la vérification de la quantité de matériel', error);
        this.showAlert('Erreur lors de la vérification de la quantité de matériel.', 'alert-danger'); // Afficher une alerte d'erreur
      }
    );
  }

  refuserDemande(idDemande: number): void {
    this.materielService.updateStatusDemande(idDemande, 'Refuse').subscribe(
      (updatedDemande) => {
        console.log('Demande refusée:', updatedDemande);
        this.showAlert('Demande refusée avec succès.', 'alert-success'); // Afficher une alerte de succès
        this.loadDemandes(); // Recharger la liste des demandes
      },
      (error) => {
        console.error('Erreur lors du refus de la demande', error);
        this.showAlert('Erreur lors du refus de la demande.', 'alert-danger'); // Afficher une alerte d'erreur
      }
    );
  }

  mettreEnAttente(idDemande: number): void {
    this.materielService.updateStatusDemande(idDemande, 'En_attente').subscribe(
      (updatedDemande) => {
        console.log('Demande mise en attente:', updatedDemande);
        this.showAlert('Demande mise en attente avec succès.', 'alert-success'); // Afficher une alerte de succès
        this.loadDemandes(); // Recharger la liste des demandes
      },
      (error) => {
        console.error('Erreur lors de la mise en attente de la demande', error);
        this.showAlert('Erreur lors de la mise en attente de la demande.', 'alert-danger'); // Afficher une alerte d'erreur
      }
    );
  }

  // Méthode pour afficher une alerte
  showAlert(message: string, alertClass: string): void {
    this.alertMessage = message;
    this.alertClass = alertClass;
  }

  // Méthode pour fermer l'alerte
  closeAlert(): void {
    this.alertMessage = null;
    this.alertClass = '';
  }
}