import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceService } from '../finance.service';
import { Facture } from 'src/app/core/models/Factures';
import { switchMap } from 'rxjs/operators';

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
    // Récupérer l'ID de la facture depuis l'URL
    this.factureId = +this.route.snapshot.params['id'];
    console.log('ID de la facture récupéré depuis l\'URL :', this.factureId); // Ajoutez ce log

    // Initialiser le formulaire
    this.initForm();

    // Charger les données de la facture
    this.loadFacture();
  }

  initForm(): void {
    this.factureForm = this.fb.group({
      montantTotal: [null, [Validators.required, Validators.min(0)]],
      dateFacture: [null, Validators.required],
      dateEcheance: [null, Validators.required],
      montantTotalHorsTaxe: [null, [Validators.required, Validators.min(0)]],
      tva: [null, [Validators.required, Validators.min(0)]]
    });
  }

  // Méthode pour charger les données de la facture
  loadFacture(): void {
    this.financeService.getFactureById(this.factureId).subscribe(
      facture => {
        console.log('Données de la facture chargées depuis l\'API :', facture); // Log pour déboguer
        this.factureForm.patchValue(facture); // Remplir le formulaire avec les données de la facture
      },
      error => {
        console.error('Erreur lors du chargement de la facture :', error); // Log en cas d'erreur
      }
    );
  }

  onSubmit(): void {
    if (this.factureForm.valid) {
      const updatedFacture = this.factureForm.value;
      console.log('Données du formulaire à envoyer pour mise à jour :', updatedFacture); // Log pour déboguer
  
      // Supprimer l'ancienne facture avant de mettre à jour
      this.financeService.deleteFacture(this.factureId)
        .pipe(
          switchMap(() => this.financeService.updateFacture(this.factureId, updatedFacture))
        )
        .subscribe(
          () => {
            console.log('Ancienne facture supprimée et nouvelle facture mise à jour avec succès');
            this.router.navigate(['/finance']); // Rediriger vers la liste des factures
          },
          error => {
            console.error('Erreur lors de la suppression ou de la mise à jour de la facture :', error); // Log en cas d'erreur
          }
        );
    } else {
      console.warn('Le formulaire est invalide. Veuillez corriger les erreurs.'); // Log si le formulaire est invalide
    }
  }
  annuler(): void {
    this.router.navigate(['/finance']); // Redirection vers la liste des paiements
  }
  
}