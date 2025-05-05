import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FinanceService } from '../finance.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
// import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.css'],
})
export class AddFinanceComponent implements OnInit {
  factureForm: FormGroup;
  idCommande: number | null = null;
  idResponsableLogistique: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.factureForm = this.fb.group({
      montantTotal: ['', [Validators.required, Validators.min(0)]],
      dateFacture: ['', [Validators.required]],
      dateEcheance: ['', [Validators.required]],
      montantTotalHorsTaxe: ['', [Validators.required, Validators.min(0)]],
      tva: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      status: ['Unpaid', [Validators.required]],
    }, { validators: this.dateEcheanceAfterDateFacture });
  }

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    this.idCommande = +params['idCommande'] || null;
    this.idResponsableLogistique = +params['idResponsableLogistique'] || null;
  
    if (!this.idCommande || !this.idResponsableLogistique) {
      const staticCommands = this.financeService.getStaticCommand();
      this.idCommande = staticCommands.idCommande;
      this.idResponsableLogistique = staticCommands.idResponsableLogistique;
    }
  
    this.factureForm.get('montantTotal')?.valueChanges.subscribe(() => this.calculateMontantHorsTaxe());
    this.factureForm.get('tva')?.valueChanges.subscribe(() => this.calculateMontantHorsTaxe());
  }
  
  calculateMontantHorsTaxe(): void {
    const montantTotal = this.factureForm.get('montantTotal')?.value;
    const tva = this.factureForm.get('tva')?.value;
  
    if (montantTotal && tva) {
      const montantHorsTaxe = montantTotal / (1 + tva / 100);
      this.factureForm.patchValue({ montantTotalHorsTaxe: montantHorsTaxe.toFixed(2) });
    }
  }

  dateEcheanceAfterDateFacture(control: AbstractControl): { [key: string]: boolean } | null {
    const dateFacture = control.get('dateFacture')?.value;
    const dateEcheance = control.get('dateEcheance')?.value;

    if (dateFacture && dateEcheance && new Date(dateEcheance) <= new Date(dateFacture)) {
      return { dateEcheanceInvalid: true };
    }
    return null;
  }

  addFacture(): void {
    if (this.factureForm.valid && this.idCommande && this.idResponsableLogistique) {
      this.isLoading = true;
      
      // Remplacement de la boîte de dialogue de confirmation par une confirmation simple
      if (confirm('Êtes-vous sûr de vouloir ajouter cette facture ?')) {
        const factureData = {
          ...this.factureForm.value,
          idCommande: this.idCommande,
          idResponsableLogistique: this.idResponsableLogistique,
        };
  
        this.financeService.addFacture(factureData).subscribe(
          (response) => {
            this.isLoading = false;
            // Remplacement du dialogue de succès par une alerte simple
            alert('Facture ajoutée avec succès !');
            this.factureForm.reset();
            this.router.navigate(['/finance']);
          },
          (error) => {
            this.isLoading = false;
            console.error('Erreur lors de l\'ajout de la facture:', error);
            alert('Erreur lors de l\'ajout de la facture');
          }
        );
      } else {
        this.isLoading = false;
      }
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  annuler(): void {
    this.router.navigate(['/finance']);
  }
}