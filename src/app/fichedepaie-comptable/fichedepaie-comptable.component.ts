import { Component, OnInit } from '@angular/core';
import { BulletinPaie } from '../core/models/FicheDePai';
import { Router } from '@angular/router';
import { FichedepaieService } from '../fichedepaie.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fichedepaie-comptable',
  templateUrl: './fichedepaie-comptable.component.html',
  styleUrls: ['./fichedepaie-comptable.component.css']
})
export class FichedepaieComptableComponent implements OnInit {
  fichesDePaie: BulletinPaie[] = [];
formGroups: any;

  constructor(private fichedepaieService: FichedepaieService, private router: Router) {}

  ngOnInit(): void {
    this.loadFichesDePaie();
  }

  loadFichesDePaie(): void {
    this.fichedepaieService.getFicheDePaie().subscribe(
      (data: BulletinPaie[]) => {
        this.fichesDePaie = data;
        console.log('Fiches de paie chargées :', this.fichesDePaie); // Pour déboguer
      },
      (error) => {
        console.error('Erreur lors du chargement des fiches de paie', error);
      }
    );
  }



  navigateToPaiement(fiche: BulletinPaie): void {
    console.log('Navigation vers le paiement pour la fiche :', fiche);
    this.router.navigate(['/add-paiement']);
  }

  calculerSalaire(fiche: BulletinPaie): void {
    this.fichedepaieService.calculerSalaire(fiche.idBulletinPaie).subscribe(
        (updatedFiche) => {
            console.log('Montant final enregistré avec succès', updatedFiche);
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

 // Imprimer une fiche de paie
 imprimerFiche(fiche: BulletinPaie): void {
  this.fichedepaieService.imprimerFiche(fiche.idBulletinPaie).subscribe(
    (response) => {
      // Créer un Blob à partir de la réponse
      const blob = new Blob([response], { type: 'application/pdf' });

      // Créer un lien pour télécharger le PDF
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);

      // Nom du fichier
      link.download = `fiche_de_paie_${fiche.idBulletinPaie}.pdf`;

      // Ajouter le lien au corps du document
      document.body.appendChild(link);

      // Déclencher le téléchargement
      link.click();

      // Nettoyer et retirer le lien
      document.body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    },
    (error) => {
      console.error('Erreur lors de l\'impression de la fiche', error);
    }
  );
}

}