import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReclamationService } from '../reclamation.service';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent {
  reclamationForm: FormGroup;
  stepStatus = ['pending', 'pending', 'pending']; // for each step (initially pending)

  reclamationTypes = [
    'NON_CONFORMITE_MATERIAUX',
    'MATERIAUX_DEFECTUEUX',
    'MAUVAISE_QUALITE_TRAVAUX',
    'NON_RESPECT_PLANS',
    'RETARD_LIVRAISON',
    'ACCIDENT_CHANTIER',
    'NON_RESPECT_SECURITE',
    'CONDITIONS_TRAVAIL',
    'GESTION_DECHETS',
    'RETARD_PAIEMENTS',
    'LITIGE_CONTRACTUEL',
    'AUTORISATIONS_MANQUANTES',
    'MANQUE_COORDINATION',
    'MODIFICATION_PROJET',
    'PROBLEMES_SOUS_TRAITANTS',
    'MALFACONS_APRES_LIVRAISON',
    'NON_RESPECT_CAHIER_DES_CHARGES',
    'PROBLEME_GARANTIES',
    'RETARD_LIVRAISON_PROJET',
    'PROBLEMES_FINITION'
  ];

  constructor(
    private fb: FormBuilder,
    private reclamationService: ReclamationService,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.reclamationForm = this.fb.group({
      typeReclamation: ['', Validators.required],
      description: ['', Validators.required],
      statusReclamation: ['UNRESOLVED']
    });
  }
  addReclamation() {
    if (this.reclamationForm.valid) {
      this.reclamationService.add({
        ...this.reclamationForm.value,
        utilisateur: { id: 1}
      }).subscribe(
        () => {
          // Update step statuses on success
          this.stepStatus[0] = 'completed'; // First step (Reclamation sent) becomes green
          this.stepStatus[1] = 'in-progress'; // Second step (Under processing) becomes orange
          this.toastr.success('Reclamation added successfully');
          this.router.navigate(['/reclamations']);
        },
        error => {
          console.error('Error adding reclamation:', error);
          this.toastr.error('Failed to add reclamation');
        }
      );
    }
  }
}
