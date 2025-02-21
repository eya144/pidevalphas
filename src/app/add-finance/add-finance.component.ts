import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FinanceService } from '../finance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.css']
})
export class AddFinanceComponent implements OnInit {
  factureForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private router: Router
  ) {
    this.factureForm = this.fb.group({
      montantTotal: ['', [Validators.required, Validators.min(0)]],
      dateFacture: ['', [Validators.required]],
      dateEcheance: ['', [Validators.required]],
      montantTotalHorsTaxe: ['', [Validators.required, Validators.min(0)]],
      tva: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    }, { validators: this.dateEcheanceAfterDateFacture }); // Validateur personnalisé pour les dates
  }

  ngOnInit(): void {}

  // Validateur personnalisé pour vérifier que la date d'échéance est postérieure à la date de facture
  dateEcheanceAfterDateFacture(control: AbstractControl): { [key: string]: boolean } | null {
    const dateFacture = control.get('dateFacture')?.value;
    const dateEcheance = control.get('dateEcheance')?.value;

    if (dateFacture && dateEcheance && new Date(dateEcheance) <= new Date(dateFacture)) {
      return { dateEcheanceInvalid: true }; // Retourne une erreur si la date d'échéance est invalide
    }
    return null; // Pas d'erreur
  }

// Méthode pour ajouter une facture
addFacture(): void {
  if (this.factureForm.valid) {
    const factureData = this.factureForm.value;
    this.financeService.addFacture(factureData).subscribe(
      response => {
        console.log('Facture ajoutée avec succès:', response);

        // Afficher un message de succès
        alert('Facture ajoutée avec succès !');

        this.router.navigate(['/finance']); // Rediriger vers la liste des factures
      },
      error => {
        console.error('Erreur lors de l\'ajout de la facture:', error);

        // Afficher un message d'erreur
        alert('Erreur lors de l\'ajout de la facture');
      }
    );
  } else {
    console.error('Le formulaire est invalide.');
    this.markFormGroupTouched(this.factureForm); // Marquer tous les champs comme "touched" pour afficher les erreurs
  }
}

  // Marquer tous les champs du formulaire comme "touched" pour afficher les erreurs
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  annuler(): void {
    this.router.navigate(['/finance']); // Redirection vers la liste des factures
  }
}