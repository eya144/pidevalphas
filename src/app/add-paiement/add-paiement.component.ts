import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaiementService } from '../paiement.service';
import { Paiement } from '../core/models/Paiement';

@Component({
  selector: 'app-add-paiement',
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.css']
})
export class AddPaiementComponent implements OnInit {
  paiementForm: FormGroup = new FormGroup({});
  idFacture!: number;

  constructor(
    private fb: FormBuilder,
    private paiementService: PaiementService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idFacture = Number(params.get('idFacture'));
    });
    this.initForm();
  }

  private initForm(): void {
    this.paiementForm = this.fb.group({
      montant: [null, [Validators.required, Validators.min(1)]],
      datePaiement: [null, Validators.required],
      methodePaiement: ['', Validators.required],
      numeroCarte: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]]
    });
  }

  onSubmit(): void {
    if (this.paiementForm.invalid) {
      alert('Formulaire invalide. Veuillez remplir correctement tous les champs.');
      return;
    }

    // Préparer l'objet paiement avec des conversions explicites
    const paiement: Paiement = {
      ...this.paiementForm.value,
      montant: Number(this.paiementForm.value.montant), // Assurer que c'est bien un nombre
      numeroCarte: this.paiementForm.value.numeroCarte ? Number(this.paiementForm.value.numeroCarte) : null, // Convertir en nombre ou null
      datePaiement: new Date(this.paiementForm.value.datePaiement).toISOString().split('T')[0], // Format 'YYYY-MM-DD'
      idFacture: this.idFacture,
      idUtilisateur: 1, // Exemple d'utilisateur connecté
      idContrat: 2, // Exemple d'idContrat
      methodePaiement: this.paiementForm.value.methodePaiement
    };

    console.log("Données envoyées :", paiement); // Affiche les données envoyées

    this.paiementService.addPaiement(paiement, this.idFacture).subscribe({
      next: () => {
        alert('Paiement ajouté avec succès !');
        this.router.navigate(['/finance']);
      },
      error: (err) => {
        console.error('Erreur API:', err);
        const errorMessage = err.error?.message || 'Une erreur est survenue lors de l\'ajout du paiement.';
        alert(`Erreur : ${errorMessage}`);
      }
    });
  }

  annuler(): void {
    this.router.navigate(['/finance']);
  }
}