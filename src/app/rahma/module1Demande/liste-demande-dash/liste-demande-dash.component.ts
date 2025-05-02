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

  // Traduction des messages d'alerte
  alertMessages = {
    success: {
      accept: 'Request accepted successfully.',
      reject: 'Request rejected successfully.',
      pending: 'Request put on hold successfully.',
    },
    error: {
      accept: 'Error while accepting the request.',
      reject: 'Error while rejecting the request.',
      pending: 'Error while putting the request on hold.',
      materialCheck: 'Error while checking material quantity.',
    },
    warning: {
      insufficientMaterial: 'Insufficient material quantity.',
    }
  };

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
              this.showAlert(this.alertMessages.success.accept, 'alert-success');
              this.loadDemandes();
            },
            (error) => {
              console.error('Erreur lors de l\'acceptation de la demande', error);
              this.showAlert(this.alertMessages.error.accept, 'alert-danger');
            }
          );
        } else {
          this.showAlert(response.message || this.alertMessages.warning.insufficientMaterial, 'alert-warning');
        }
      },
      (error) => {
        console.error('Erreur lors de la vérification de la quantité de matériel', error);
        this.showAlert(this.alertMessages.error.materialCheck, 'alert-danger');
      }
    );
  }

  refuserDemande(idDemande: number): void {
    this.materielService.updateStatusDemande(idDemande, 'Refuse').subscribe(
      (updatedDemande) => {
        console.log('Demande refusée:', updatedDemande);
        this.showAlert(this.alertMessages.success.reject, 'alert-success');
        this.loadDemandes();
      },
      (error) => {
        console.error('Erreur lors du refus de la demande', error);
        this.showAlert(this.alertMessages.error.reject, 'alert-danger');
      }
    );
  }

  mettreEnAttente(idDemande: number): void {
    this.materielService.updateStatusDemande(idDemande, 'En_attente').subscribe(
      (updatedDemande) => {
        console.log('Demande mise en attente:', updatedDemande);
        this.showAlert(this.alertMessages.success.pending, 'alert-success');
        this.loadDemandes();
      },
      (error) => {
        console.error('Erreur lors de la mise en attente de la demande', error);
        this.showAlert(this.alertMessages.error.pending, 'alert-danger');
      }
    );
  }

  showAlert(message: string, alertClass: string): void {
    this.alertMessage = message;
    this.alertClass = alertClass;
  }

  closeAlert(): void {
    this.alertMessage = null;
    this.alertClass = '';
  }
}
