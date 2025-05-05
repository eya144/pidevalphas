import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BulletinPaie } from '../core/models/FicheDePai';
import { FichedepaieService } from '../fichedepaie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-add-fichedepaie',
  templateUrl: './add-fichedepaie.component.html',
  styleUrls: ['./add-fichedepaie.component.css']
})
export class AddFichedepaieComponent implements OnInit {
  ficheForm!: FormGroup;
  isLoading = false;
  userInfo: any;

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
      datePaiement: [new Date().toISOString().substring(0, 10), Validators.required],
      statutPaiementL: ['Unpaid', Validators.required],
      montantFinal: ['']
    });

    // Écoute les changements sur le champ nom
    this.ficheForm.get('nom')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(nom => this.fichedepaieService.getUserInfo(nom))
      )
      .subscribe(user => {
        if (user) {
          this.userInfo = user;
          this.autoFillForm(user);
        }
      });
  }

  autoFillForm(user: any): void {
    // Remplit automatiquement les champs avec les infos de l'utilisateur
    this.ficheForm.patchValue({
      montantInitial: user.salaireBase || 0,
      joursNonTravailles: user.joursAbsence || 0
    });
    
    // Calcule automatiquement le montant final
    this.calculateFinalAmount();
  }

  calculateFinalAmount(): void {
    const montantInitial = this.ficheForm.get('montantInitial')?.value || 0;
    const joursNonTravailles = this.ficheForm.get('joursNonTravailles')?.value || 0;
    
    if (montantInitial > 0 && joursNonTravailles >= 0) {
      const salaireJournalier = montantInitial / 30;
      const montantFinal = montantInitial - (joursNonTravailles * salaireJournalier);
      this.ficheForm.patchValue({ montantFinal: montantFinal.toFixed(2) });
    }
  }

  onSubmit(): void {
    if (this.ficheForm.invalid) {
      return;
    }
  
    this.isLoading = true;
    const fiche = this.ficheForm.value;
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