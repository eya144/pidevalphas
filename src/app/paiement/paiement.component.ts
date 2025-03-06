import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaiementService } from '../paiement.service';
import { Paiement } from '../core/models/Paiement';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiementForm!: FormGroup;
  idFacture!: number;
  constructor(
    private fb: FormBuilder,
     private paiementService: PaiementService,
     private route: ActivatedRoute,
     private router: Router,
    ) {}

     ngOnInit(): void {
      this.idFacture = +this.route.snapshot.paramMap.get('idFacture')!; // Récupérer l'ID de la facture
      this.initForm();
    }
  
    initForm(): void {
      this.paiementForm = this.fb.group({
        montant: ['', [Validators.required, Validators.min(0.01)]],
        datePaiement: ['', Validators.required],
        payment: ['', Validators.required],
        numeroCarte: ['', Validators.required]
      });
    }

    onSubmit(): void {
      if (this.paiementForm.valid) {
        const paiement: Paiement = this.paiementForm.value;
    
        // Ajouter des valeurs statiques pour idUtilisateur et idContrat
        paiement.idUtilisateur = 1; // Valeur statique pour idUtilisateur
        paiement.idContrat = 2; // Valeur statique pour idContrat
    
        this.paiementService.addPaiement(paiement, this.idFacture).subscribe(
          response => {
            console.log('Paiement réussi', response);
            alert('Paiement réussi!');
            this.router.navigate(['/finance']); // Rediriger vers /finance
          },
          error => {
            console.error('Erreur lors du paiement', error);
            alert('Erreur lors du paiement. Veuillez réessayer.');
          }
        );
      }
    }

    annuler(): void {
      this.router.navigate(['/finance']);
    }
}