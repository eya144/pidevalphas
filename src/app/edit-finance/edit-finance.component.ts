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

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.factureId = +this.route.snapshot.params['id']; // Récupérer l'ID de la facture depuis l'URL
    this.initForm();
    this.loadFacture();
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

  loadFacture(): void {
    this.financeService.getFactureById(this.factureId).subscribe(facture => {
      this.factureForm.patchValue(facture); // Remplir le formulaire avec les données de la facture
    });
  }

  onSubmit(): void {
    if (this.factureForm.valid) {
      const updatedFacture = this.factureForm.value;
      this.financeService.updateFacture(this.factureId, updatedFacture).subscribe(() => {
        this.router.navigate(['/finance']); // Rediriger vers la liste des factures après la mise à jour
      });
    }
  }
  annuler(): void {
    this.router.navigate(['/finance']); // Redirection vers la liste des paiements
  }
}