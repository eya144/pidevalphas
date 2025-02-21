import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from '../finance.service';
import { Facture } from 'src/app/core/models/Factures';  // Importer le modèle Facture
import { Router } from '@angular/router';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  factureForm!: FormGroup;
  isSubmitting = false;
  factures: Facture[] = [];
  showAddForm = false;
  isEditing = false;
  editingFactureId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm(); // Initialiser le formulaire
    this.getAllFactures(); // Charger les factures au démarrage
  }
  
  navigateToPaiement(): void {
    this.router.navigate(['/paiement']);
  }

  // Méthode pour récupérer toutes les factures
  private getAllFactures(): void {
    this.financeService.getAllFactures().subscribe(
      factures => {
        this.factures = factures;
        console.log('Factures récupérées:', this.factures); // Ajoutez ce log pour vérifier les données
      },
      error => {
        console.error('Erreur lors de la récupération des factures:', error);
      }
    );
  }

  // Initialiser le formulaire réactif
  initForm(): void {
    this.factureForm = this.fb.group({
      montantTotal: [null, [Validators.required, Validators.min(0)]],
      dateFacture: [null, Validators.required],
      dateEcheance: [null, Validators.required],
      montantTotalHorsTaxe: [null, [Validators.required, Validators.min(0)]],
      tva: [null, [Validators.required, Validators.min(0)]]
    });
  }

  // Rediriger vers le formulaire d'ajout
  toggleAddForm(): void {
    this.router.navigate(['/add-finance']);
  }

  // Ajouter une facture
  addFacture(): void {
    if (this.factureForm.invalid) {
      return;
    }

    const formData = this.factureForm.value;

    this.financeService.addFacture(formData).subscribe(newFacture => {
      this.factures.push(newFacture);
      this.resetForm();
    });
  }

  // Supprimer une facture
  deleteFacture(idFacture: number | undefined): void {
    if (idFacture === undefined) {
      console.error("ID de la facture non défini.");
      return;
    }
    this.financeService.deleteFacture(idFacture).subscribe(
      () => {
        this.factures = this.factures.filter(f => f.idFacture !== idFacture);
        console.log('Facture supprimée avec succès');
      },
      error => {
        console.error('Erreur lors de la suppression de la facture:', error);
      }
    );
  }

  // Rediriger vers le formulaire de modification
  updateFacture(facture: Facture): void {
    if (facture.idFacture === undefined) {
      console.error("ID de la facture non défini.");
      return;
    }
    this.router.navigate(['/edit-finance', facture.idFacture]);
  }

  // Réinitialiser le formulaire
  private resetForm(): void {
    this.factureForm.reset();
    this.isEditing = false;
    this.editingFactureId = null;
    this.showAddForm = false;
  }
}