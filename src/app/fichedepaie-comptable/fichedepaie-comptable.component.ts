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

  navigateToPaiement(fiche: BulletinPaie): void {
    console.log('Navigation vers le paiement pour la fiche :', fiche);
    this.router.navigate(['/paiement']);
  }

  imprimerFiche(fiche: BulletinPaie): void {
    const printContent = `
      <h2>Fiche de Paie</h2>
      <table>
        <thead>
          <tr>
            <th>Montant Initial</th>
            <th>Jours Non Travaillés</th>
            <th>Type de Paiement</th>
            <th>Date de Paiement</th>
            <th>Statut de Paiement</th>
            <th>Montant Final</th>
            <th>Nom Utilisateur</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${fiche.montantInitial}</td>
            <td>${fiche.joursTravailles}</td>
            <td>${fiche.typePaiement}</td>
            <td>${fiche.datePaiement }</td>
            <td>${fiche.statutPaiementL}</td>
            <td>${fiche.montantFinal}</td>
            <td>${fiche.nom}</td>
          </tr>
        </tbody>
      </table>
    `;
  
    // Explicitly declare printWindow as a Window object
    const printWindow: Window | null = window.open('', '_blank');
  
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Fiche de Paie</title>
            <style>
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Failed to open print window.');
    }
  }
}