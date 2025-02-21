import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../paiement.service';

@Component({
  selector: 'app-edit-paiement',
  templateUrl: './edit-paiement.component.html',
  styleUrls: ['./edit-paiement.component.css']
})
export class EditPaiementComponent implements OnInit {
  paiementForm!: FormGroup;
  paiementId!: number;

  constructor(
    private fb: FormBuilder,
    private paiementService: PaiementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paiementId = Number(this.route.snapshot.paramMap.get('id')); // Récupération de l'ID depuis l'URL
    this.initForm();
    this.loadPaiement();
  }

  private initForm(): void {
    this.paiementForm = this.fb.group({
      montant: [null, [Validators.required, Validators.min(0)]],
      datePaiement: [null, Validators.required],
      payment: ['', Validators.required],
      numeroCarte: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]] // Numéro carte avec 16 chiffres
    });
  }

  private loadPaiement(): void {
    this.paiementService.getPaiementById(this.paiementId).subscribe(paiement => {
      this.paiementForm.patchValue(paiement); // Remplir le formulaire avec les données de la facture
    });
  }

  onSubmit(): void {
    if (this.paiementForm.invalid) {
      return;
    }

    const paiementModifie = this.paiementForm.value; // Obtenir les valeurs du formulaire, y compris les champs désactivés

    this.paiementService.updatePaiement(this.paiementId, paiementModifie).subscribe(() => {
      this.router.navigate(['/paiement']); // Redirection vers la liste des paiements
    });
  }

  annuler(): void {
    this.router.navigate(['/paiement']); // Redirection vers la liste des paiements
  }
}