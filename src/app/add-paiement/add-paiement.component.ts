import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaiementService } from '../paiement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-paiement',
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.css']
})
export class AddPaiementComponent implements OnInit {
  paiementForm: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder,
    private paiementService: PaiementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.paiementForm = this.fb.group({
      idUtilisateur: [null, Validators.required],
      idContrat: [null, Validators.required],
      montant: [null, [Validators.required, Validators.min(0)]],
      datePaiement: [null, Validators.required],
      payment: ['', Validators.required],
      numeroCarte: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]] // Numéro carte avec 16 chiffres
    });
  }

  onSubmit(): void {
    console.log('Formulaire soumis', this.paiementForm.value); // Debug
    if (this.paiementForm.invalid) {
      console.log('Formulaire invalide');
      return;
    }
  
    this.paiementService.addPaiement(this.paiementForm.value).subscribe({
      next: () => {
        alert('Paiement ajouté avec succès');
        this.router.navigate(['/paiement']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du paiement :', err);
      }
    });
  }
  

  annuler(): void {
    this.router.navigate(['/paiement']); // Redirection vers la liste des paiements
  }
}
