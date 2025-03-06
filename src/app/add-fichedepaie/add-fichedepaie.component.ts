import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BulletinPaie } from '../core/models/FicheDePai';
import { FichedepaieService } from '../fichedepaie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-fichedepaie',
  templateUrl: './add-fichedepaie.component.html',
  styleUrls: ['./add-fichedepaie.component.css']
})
export class AddFichedepaieComponent implements OnInit {
  ficheForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private fichedepaieService: FichedepaieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ficheForm = this.fb.group({
      montantInitial: ['', [Validators.required, Validators.min(0)]],
      nom: ['', Validators.required],
      joursNonTravailles: ['', [Validators.required, Validators.min(0)]],
      typePaiement: ['ESPECES', Validators.required], 
      datePaiement: ['', Validators.required],
      statutPaiementL: ['Unpaid', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.ficheForm.invalid) {
      return;
    }
  
    this.isLoading = true;
    const fiche: BulletinPaie = this.ficheForm.value;

      fiche.idContrat = undefined; 
    fiche.idUtilisateur = undefined; 
    fiche.montantFinal = undefined; 
  
    fiche.datePaiement = new Date(fiche.datePaiement);
  
    this.fichedepaieService.addFicheDePaie(fiche).subscribe(
      (newFiche) => {
        this.isLoading = false;
        this.router.navigate(['/fichedepaie-comptable']);
      },
      (error) => {
        this.isLoading = false;
        console.error('Erreur lors de l\'ajout de la fiche de paie', error);
      }
    );
  }
  annuler(): void {
    this.router.navigate(['/fichedepaie-comptable']); 
  }
}