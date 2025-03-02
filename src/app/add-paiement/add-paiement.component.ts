import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaiementService } from '../paiement.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-paiement',
  templateUrl: './add-paiement.component.html',
  styleUrls: ['./add-paiement.component.css']
})
export class AddPaiementComponent implements OnInit {
  paiementForm: FormGroup = new FormGroup({});
  idFacture!: number; // 🔥 Stocke l'ID de la facture depuis l'URL

  constructor(
    private fb: FormBuilder,
    private paiementService: PaiementService,
    private router: Router,
    private route: ActivatedRoute // 🔥 Pour récupérer les paramètres de l'URL
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idFacture = Number(params.get('idFacture')); // 🔥 Récupération de l'ID de la facture
      console.log('ID Facture récupéré:', this.idFacture);
    });

    this.initForm();
  }

  private initForm(): void {
    this.paiementForm = this.fb.group({
      montant: [null, [Validators.required, Validators.min(1)]], // Montant doit être supérieur à 0
      datePaiement: [null, Validators.required],
      methodePaiement: ['', Validators.required],
      numeroCarte: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{12}$') // Validation du numéro de carte à 12 chiffres
      ]]
    });
  }

  onSubmit(): void {
    if (this.paiementForm.invalid) {
      console.log('Formulaire invalide, veuillez corriger les erreurs.');
      alert('Veuillez remplir correctement tous les champs.');
      return;
    }
  
    const paiementData = {
      ...this.paiementForm.value,
      idFacture: this.idFacture
    };
  
    console.log("Données envoyées :", paiementData); // 🔥 Vérifiez les données ici
  
    this.paiementService.addPaiement(paiementData, this.idFacture).subscribe({
      next: () => {
        alert('Paiement ajouté avec succès !');
        this.router.navigate(['/finance']);
      },
      error: (err) => {
        console.error("❌ Erreur lors de l'ajout du paiement :", err.error);
        alert(`Erreur : ${err.error?.message || 'Une erreur est survenue'}`);
      }
    });
  }
  annuler(): void {
    this.router.navigate(['/finance']); // Redirection vers la liste des paiements
  }
}
