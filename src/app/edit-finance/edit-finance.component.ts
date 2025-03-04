import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceService } from '../finance.service';
import { Facture } from 'src/app/core/models/Factures';

@Component({
  selector: 'app-edit-finance',
  templateUrl: './edit-finance.component.html',
  styleUrls: ['./edit-finance.component.css']
})
export class EditFinanceComponent implements OnInit {
  factureForm!: FormGroup;
  factureId!: number;
  idCommande: number | null = null;
  idResponsableLogistique: number | null = null;

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.factureId = +this.route.snapshot.params['id'];
    this.initForm();
    this.loadFacture();
  
    // Écouter les changements de montantTotal et tva
    this.factureForm.get('montantTotal')?.valueChanges.subscribe(() => this.calculateMontantHorsTaxe());
    this.factureForm.get('tva')?.valueChanges.subscribe(() => this.calculateMontantHorsTaxe());
  }
  
  // Calculer le montant hors taxe
  calculateMontantHorsTaxe(): void {
    const montantTotal = this.factureForm.get('montantTotal')?.value;
    const tva = this.factureForm.get('tva')?.value;
  
    if (montantTotal && tva) {
      const montantHorsTaxe = montantTotal / (1 + tva / 100);
      this.factureForm.patchValue({ montantTotalHorsTaxe: montantHorsTaxe.toFixed(2) });
    }
  }

  initForm(): void {
    this.factureForm = this.fb.group({
      montantTotal: [null, [Validators.required, Validators.min(0)]],
      dateFacture: [null, Validators.required],
      dateEcheance: [null, Validators.required],
      montantTotalHorsTaxe: [null, [Validators.required, Validators.min(0)]],
      tva: [null, [Validators.required, Validators.min(0)]],
      status: ['Unpaid', Validators.required]
    });
  }

  loadFacture(): void {
    this.financeService.getFactureById(this.factureId).subscribe(
      facture => {
        console.log('Données de la facture chargées depuis l\'API :', facture);
        this.idCommande = facture.idCommande ?? null;
        this.idResponsableLogistique = facture.idResponsableLogistique ?? null;
        this.factureForm.patchValue(facture);
      },
      error => {
        console.error('Erreur lors du chargement de la facture :', error);
      }
    );
  }

  onSubmit(): void {
    if (this.factureForm.valid) {
      const updatedFacture: Facture = {
        ...this.factureForm.value,
        idFacture: this.factureId, // Inclure l'identifiant de la facture
        idCommande: this.idCommande,
        idResponsableLogistique: this.idResponsableLogistique
      };

      this.financeService.updateFacture(this.factureId, updatedFacture).subscribe(
        () => {
          console.log('Facture mise à jour avec succès');
          this.router.navigate(['/finance']);
        },
        error => {
          console.error('Erreur lors de la mise à jour de la facture :', error);
        }
      );
    } else {
      console.warn('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }

  annuler(): void {
    this.router.navigate(['/finance']);
  }
}