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
    this.materielService.updateStatusDemande(idDemande, 'Accepte').subscribe(
      (updatedDemande) => {
        console.log('Demande acceptée:', updatedDemande);
        this.loadDemandes(); // Recharger la liste des demandes
      },
      (error) => {
        console.error('Erreur lors de l\'acceptation de la demande', error);
      }
    );
  }
  // Méthode pour refuser une demande
  refuserDemande(idDemande: number): void {
    this.materielService.updateStatusDemande(idDemande, 'Refuse').subscribe(
      (updatedDemande) => {
        console.log('Demande acceptée:', updatedDemande);
        this.loadDemandes(); // Recharger la liste des demandes
      },
      (error) => {
        console.error('Erreur lors de l\'acceptation de la demande', error);
      }
    );
  }

  // Méthode pour mettre une demande en attente
  mettreEnAttente(idDemande: number): void {
    this.materielService.updateStatusDemande(idDemande, 'En_attente').subscribe(
      (updatedDemande) => {
        console.log('Demande acceptée:', updatedDemande);
        this.loadDemandes(); // Recharger la liste des demandes
      },
      (error) => {
        console.error('Erreur lors de l\'acceptation de la demande', error);
      }
    );
  
  }
}