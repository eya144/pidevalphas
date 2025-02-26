import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FinanceService } from '../finance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.css'],
})
export class AddFinanceComponent implements OnInit {
  factureForm: FormGroup;
  idCommande: number | null = null;
  idResponsableLogistique: number | null = null;

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
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
  }

  // Validateur personnalisé pour la date d'échéance
  dateEcheanceAfterDateFacture(control: AbstractControl): { [key: string]: boolean } | null {
    const dateFacture = control.get('dateFacture')?.value;
    const dateEcheance = control.get('dateEcheance')?.value;

    if (dateFacture && dateEcheance && new Date(dateEcheance) <= new Date(dateFacture)) {
      return { dateEcheanceInvalid: true };
    }
    return null;
  }

  // Ajouter une facture
  addFacture(): void {
    if (this.factureForm.valid && this.idCommande && this.idResponsableLogistique) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '300px',
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const factureData = {
            ...this.factureForm.value,
            idCommande: this.idCommande,
            idResponsableLogistique: this.idResponsableLogistique,
          };

          this.financeService.addFacture(factureData).subscribe(
            (response) => {
              console.log('Facture ajoutée avec succès:', response);

              this.dialog.open(SuccessDialogComponent, {
                width: '300px',
                disableClose: true,
              });

              this.factureForm.reset(); // Réinitialiser le formulaire
              this.factureForm.patchValue({ status: 'Unpaid' }); // Réinitialiser le statut
              this.router.navigate(['/finance']); // Rediriger vers la liste des factures
            },
            (error) => {
              console.error('Erreur lors de l\'ajout de la facture:', error);
              alert('Erreur lors de l\'ajout de la facture');
            }
          );
        } else {
          console.log('Addition canceled.');
        }
      });
    } else {
      console.error('Le formulaire est invalide ou les IDs sont manquants.');
      this.markFormGroupTouched(this.factureForm);
    }
  }

  // Marquer tous les champs du formulaire comme touchés
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Annuler et revenir à la liste des factures
  annuler(): void {
    this.router.navigate(['/finance']);
  }
}