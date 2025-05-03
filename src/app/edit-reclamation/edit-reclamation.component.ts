import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReclamationService } from '../reclamation.service';

@Component({
  selector: 'app-edit-reclamation',
  templateUrl: './edit-reclamation.component.html',
  styleUrls: ['./edit-reclamation.component.css']
})
export class EditReclamationComponent implements OnInit {
  reclamationForm: FormGroup;
  reclamationId: number;

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
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.reclamationForm = this.fb.group({
      typeReclamation: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.reclamationId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadReclamationData();
  }

  loadReclamationData(): void {
    this.reclamationService.getById(this.reclamationId).subscribe(
      (data: any) => {
        this.reclamationForm.patchValue({
          typeReclamation: data.typeReclamation,
          description: data.description
        });
      },
      error => {
        console.error('Error loading reclamation:', error);
      }
    );
  }

  updateReclamation(): void {
    if (this.reclamationForm.valid) {
      this.reclamationService.update(this.reclamationId, this.reclamationForm.value).subscribe(
        () => {
          this.toastr.success('Reclamation updated successfully');
          this.router.navigate(['/reclamations']);
        },
        error => {
          console.error('Error updating reclamation:', error);
          alert('Error updating reclamation');
        }
      );
    } else {
      console.error('The form is invalid.');
      this.markFormGroupTouched(this.reclamationForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  cancel(): void {
    this.router.navigate(['/reclamations']);
  }
}
