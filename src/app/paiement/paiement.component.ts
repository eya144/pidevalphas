import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaiementService } from '../paiement.service';
import { Paiement } from 'src/app/core/models/Paiement';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiementForm!: FormGroup;
  paiements: Paiement[] = [];
  showAddForm = false;
  isEditing = false;
  editingPaiementId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private paiementService: PaiementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllPaiements();
  }

  initForm(): void {
    this.paiementForm = this.fb.group({
      montant: [null, [Validators.required, Validators.min(0)]],
      datePaiement: [null, Validators.required],
      payment: [null, Validators.required],
      numeroCarte: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(19)]]
    });
    
  }

  getAllPaiements(): void {
    this.paiementService.getAllPaiements().subscribe(
      (paiements) => {
        this.paiements = paiements;
      },
      (error) => {
        console.error('Erreur lors de la récupération des paiements:', error);
      }
    );
  }

  toggleAddForm(): void {
    this.router.navigate(['/add-paiement']);
  }

  deletePaiement(idPaiement: number): void {
    this.paiementService.deletePaiement(idPaiement).subscribe(() => {
      this.paiements = this.paiements.filter(p => p.idPaiement !== idPaiement);
    });
  }

  updatePaiement(paiement: Paiement): void {
    this.router.navigate(['/edit-paiement', paiement.idPaiement]);
  }
  submitForm(): void {
    if (this.paiementForm.valid) {
      const paiement: Paiement = this.paiementForm.value;
      console.log('Données du formulaire:', paiement); // Ajoutez ce log pour vérifier les données
      this.paiementService.addPaiement(paiement).subscribe(
        (response) => {
          console.log('Paiement ajouté avec succès:', response);
          this.router.navigate(['/paiement']); // Rediriger vers la liste des paiements
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du paiement:', error);
        }
      );
    } else {
      console.error('Le formulaire est invalide');
    }
  }
  annuler(): void {
    this.router.navigate(['/finance']); // Redirection vers la liste des paiements
  }
}