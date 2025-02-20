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
      idCommande: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      idResponsableLogistique: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      idFournisseur: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      idUtilisateur: ['', [Validators.required, Validators.pattern('[0-9]+')]],
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
          console.log('Facture ajoutée avec succès:', response);
          this.router.navigate(['/finance']);
        },
        error => {
          console.error('Erreur lors de l\'ajout de la facture:', error);
          if (error.status === 404) {
            console.error('Endpoint non trouvé. Vérifiez l\'URL de l\'API.');
          } else if (error.status === 400) {
            console.error('Données invalides envoyées au serveur.');
          } else {
            console.error('Erreur serveur:', error.message);
          }
        }
      );
    } else {
      console.error('Le formulaire est invalide.');
    }
  }
}