import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DemandeEmploiService } from 'serviceEntretien/demande-emploi.service';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.css']
})
export class EntretienComponent {

  demandes: any[] = [];
  isLoading = true;


  constructor(
    private router: Router, 
    private demandeEmploiService: DemandeEmploiService,
  ) {}

  ngOnInit() {
    this.demandeEmploiService.getAllDemandesEmploi().subscribe(
      data => {
        this.demandes = data;
        this.isLoading = false;
      },
      error => {
        console.error("Erreur lors du chargement des demandes", error);
        this.isLoading = false;
      }
    );
  }

  

  passerEntretien(id: number) {
    if (confirm("Voulez-vous passer cette demande à l'entretien ?")) {
      this.demandeEmploiService.passerEntretien(id).subscribe(
        () => {
          alert("Entretien ajouté avec succès !");
          this.ngOnInit(); // Recharger la liste
          this.router.navigate([`/entretientOrg/${id}`]);
        },
        error => console.error("Erreur lors de l'ajout de l'entretien", error)
      );
    }
  }

  refuserDemande(id: number) {
    if (confirm("Êtes-vous sûr de refuser cette demande ?")) {
      this.demandeEmploiService.changerStatutDemande(id, 'Refuse').subscribe(
        () => {
          alert("Demande refusée !");
          this.ngOnInit(); // Recharger la liste
        },
        error => console.error("Erreur lors du refus de la demande", error)
      );
    }
  }

  supprimerDemande(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
      this.demandeEmploiService.supprimerDemandeEmploi(id).subscribe(
        () => {
          alert("Demande supprimée !");
          this.ngOnInit(); // Recharger la liste après suppression
        },
        error => console.error("Erreur lors de la suppression de la demande", error)
      );
    }
  }
  redirectToPlaning() {
    this.router.navigate([`/planning`]);
    }
}