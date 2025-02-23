import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemandeEmploiService } from 'serviceEntretien/demande-emploi.service';

@Component({
  selector: 'app-details-demande-emploi',
  templateUrl: './details-demande-emploi.component.html',
  styleUrls: ['./details-demande-emploi.component.css']
})
export class DetailsDemandeEmploiComponent implements OnInit {
  demande: any; 
  isLoading = true;
  isEditing = false; // Mode édition

  constructor(private route: ActivatedRoute, private demandeEmploiService: DemandeEmploiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.demandeEmploiService.getDemandeById(id).subscribe(
        data => {
          this.demande = data;
          this.isLoading = false;
        },
        error => {
          console.error('Erreur lors du chargement des détails de la demande', error);
          this.isLoading = false;
        }
      );
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing; // Active/Désactive le mode édition
  }

  updateDemande() {
    this.demandeEmploiService.updateDemandeEmploi(this.demande).subscribe(
      response => {
        console.log('Mise à jour réussie', response);
        this.isEditing = false; // Quitte le mode édition
      },
      error => {
        console.error('Erreur lors de la mise à jour', error);
      }
    );
  }
}