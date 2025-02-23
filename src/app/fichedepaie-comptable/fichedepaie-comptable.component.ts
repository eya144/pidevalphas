import { Component, OnInit } from '@angular/core';
import { BulletinPaie } from '../core/models/FicheDePai';
import { Router } from '@angular/router';
import { FichedepaieService } from '../fichedepaie.service';

@Component({
  selector: 'app-fichedepaie-comptable',
  templateUrl: './fichedepaie-comptable.component.html',
  styleUrls: ['./fichedepaie-comptable.component.css']
})
export class FichedepaieComptableComponent  implements OnInit {
    fichesDePaie: BulletinPaie[] = [];
  
    constructor(private fichedepaieService: FichedepaieService) {}

  ngOnInit(): void {
    this.loadFichesDePaie();
  }

  loadFichesDePaie(): void {
    this.fichedepaieService.getFicheDePaie().subscribe(
      (data: BulletinPaie[]) => {
        this.fichesDePaie = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des fiches de paie', error);
      }
    );
  }

  calculerSalaire(fiche: BulletinPaie): void {
    const salaireJournalier = fiche.montantInitial / 30; // Supposons 30 jours par mois
    fiche.montantFinal = fiche.montantInitial - (fiche.joursTravailles * salaireJournalier);

    // Enregistrer le montant final dans la base de données
    this.fichedepaieService.updateFicheDePaie(fiche).subscribe(
      (updatedFiche) => {
        console.log('Montant final enregistré avec succès', updatedFiche);
        // Mettre à jour la fiche dans la liste locale
        const index = this.fichesDePaie.findIndex(f => f.idBulletinPaie === updatedFiche.idBulletinPaie);
        if (index !== -1) {
          this.fichesDePaie[index] = updatedFiche;
        }
      },
      (error) => {
        console.error('Erreur lors de l\'enregistrement du montant final', error);
      }
    );
  }
}