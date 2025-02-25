import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { FinanceService } from '../finance.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Add this import
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; // Add this import
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component'; // Add this import
@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.css']
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
      status: ['Unpaid', [Validators.required]] // Ajout du champ status avec une valeur par défaut

    }, { validators: this.dateEcheanceAfterDateFacture });
  }

  ngOnInit(): void {
    // Retrieve query parameters
    this.route.queryParams.subscribe(params => {
      this.idCommande = +params['idCommande'] || null;
      this.idResponsableLogistique = +params['idResponsableLogistique'] || null;
    });
  }

  // Custom validator for dateEcheance
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
      // Open the confirmation dialog as a modal
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '300px', // Adjust width as needed
        disableClose: true, // Prevent closing by clicking outside
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User clicked "Yes"
          const factureData = {
            ...this.factureForm.value,
            idCommande: this.idCommande,
            idResponsableLogistique: this.idResponsableLogistique,
          };
  
          this.financeService.addFacture(factureData).subscribe(
            (response) => {
              console.log('Facture ajoutée avec succès:', response);
  
              // Open the success dialog
              this.dialog.open(SuccessDialogComponent, {
                width: '300px',
                disableClose: true, // Prevent closing by clicking outside
              });
  
              // Redirect to the finance list after the success dialog is closed
              this.router.navigate(['/finance']);
            },
            (error) => {
              console.error('Erreur lors de l\'ajout de la facture:', error);
              alert('Erreur lors de l\'ajout de la facture');
            }
          );
        } else {
          // User clicked "No" or closed the dialog
          console.log('Addition canceled.');
        }
      });
    } else {
      console.error('Le formulaire est invalide ou les IDs sont manquants.');
      this.markFormGroupTouched(this.factureForm);
    }
  }
  // Mark all form fields as touched to display validation errors
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  annuler(): void {
    this.router.navigate(['/finance']); // Redirect to the finance list
  }
}