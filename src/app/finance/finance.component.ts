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
    private financeService: FinanceService ,
    private router:Router

  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllFactures();
  }

  initForm(): void {
    this.factureForm = this.fb.group({
      idCommande: [null, Validators.required],
      idResponsableLogistique: [null, Validators.required],
      idFournisseur: [null, Validators.required],
      idUtilisateur: [null, Validators.required],
      montantTotal: [null, [Validators.required, Validators.min(0)]],
      dateFacture: [null, Validators.required],
      dateEcheance: [null, Validators.required],
      montantTotalHorsTaxe: [null, [Validators.required, Validators.min(0)]],
      tva: [null, [Validators.required, Validators.min(0)]]
    });
  }

  toggleAddForm(): void {
    this.router.navigate(['/add-finance']);
    
  }

  addFacture(formData: any): void {
    if (this.factureForm.invalid) {
      return;
    }
    
    if (this.isEditing && this.editingFactureId !== null) {
      this.financeService.updateFacture(this.editingFactureId, formData).subscribe(updatedFacture => {
        this.factures = this.factures.map(f => f.idFacture === updatedFacture.idFacture ? updatedFacture : f);
        this.resetForm();
      });
    } else {
      this.financeService.addFacture(formData).subscribe(newFacture => {
        this.factures.push(newFacture);
        this.resetForm();
      });
    }
  }

  deleteFacture(idFacture: number): void {
    this.financeService.deleteFacture(idFacture).subscribe(() => {
      this.factures = this.factures.filter(f => f.idFacture !== idFacture);
    });
  }

  updateFacture(facture: Facture): void {
    this.factureForm.patchValue(facture);
    this.isEditing = true;
    this.editingFactureId = facture.idFacture;
    this.showAddForm = true;
  }

  private getAllFactures(): void {
    this.financeService.getAllFactures().subscribe(factures => {
      this.factures = factures;
    });
  }

  private resetForm(): void {
    this.factureForm.reset();
    this.isEditing = false;
    this.editingFactureId = null;
    this.showAddForm = false;
  }
}