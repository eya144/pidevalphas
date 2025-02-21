import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      tva: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {}

  // Méthode pour ajouter une facture
  addFacture(): void {
    if (this.factureForm.valid) {
      const factureData = this.factureForm.value;
      this.financeService.addFacture(factureData).subscribe(
        response => {
          console.log('Invoice added successfully:', response);
          this.router.navigate(['/finance']); // Rediriger vers la liste des factures
        },
        error => {
          console.error('Error adding invoice:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
  }

  annuler(): void {
    this.router.navigate(['/finance']); // Redirection vers la liste des factures
  }
}