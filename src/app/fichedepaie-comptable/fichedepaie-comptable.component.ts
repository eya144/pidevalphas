import { Component, OnInit } from '@angular/core';
import { BulletinPaie } from '../core/models/FicheDePai';
import { Router } from '@angular/router';
import { FichedepaieService } from '../fichedepaie.service';

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
      },
      (error) => {
        console.error('Erreur lors du chargement des fiches de paie', error);
      }
    );
  }



  navigateToPaiement(fiche: BulletinPaie): void {
    console.log('Navigation vers le paiement pour la fiche :', fiche);
    this.router.navigate(['/paiement']);
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

imprimerFiche(fiche: BulletinPaie): void {
  this.fichedepaieService.imprimerFiche(fiche.idBulletinPaie).subscribe(
      (response) => {
          // Create a Blob from the response
          const blob = new Blob([response], { type: 'application/pdf' });

          // Create a link element
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);

          // Set the filename for the download
          link.download = `fiche_de_paie_${fiche.idBulletinPaie}.pdf`;

          // Append the link to the body (required for Firefox)
          document.body.appendChild(link);

          // Trigger the download
          link.click();

          // Clean up and remove the link
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
      },
      (error) => {
          console.error('Erreur lors de l\'impression de la fiche', error);
      }
  );
}
  
}