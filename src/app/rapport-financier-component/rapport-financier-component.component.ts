import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { RapportFinancierService } from '../rapport-financier.service';
import { RapportFinancier } from '../core/models/RapportFinancier';

@Component({
  selector: 'app-rapport-financier-component',
  templateUrl: './rapport-financier-component.component.html',
  styleUrls: ['./rapport-financier-component.component.css']
})
export class RapportFinancierComponentComponent implements OnInit {
  rapports: RapportFinancier[] = [];
  isLoading = false;
  error: string | null = null;
  currentUserId = 2; // À remplacer par l'ID de l'utilisateur connecté

  constructor(private rapportService: RapportFinancierService) {}

  ngOnInit() {
    this.chargerRapports();
  }

  chargerRapports() {
    this.isLoading = true;
    this.error = null;
    
    this.rapportService.getRapports().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (data) => {
        this.rapports = data;
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des rapports";
        console.error('Erreur:', err);
      }
    });
  }

  genererRapport() {
    this.isLoading = true;
    this.error = null;
    
    this.rapportService.genererRapport(this.currentUserId).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (rapport) => {
        this.rapports.unshift(rapport);
        this.showSuccess('Rapport généré avec succès');
      },
      error: (err) => {
        this.error = err.message || "Erreur lors de la génération du rapport";
        console.error('Erreur:', err);
      }
    });
  }

  private showSuccess(message: string) {
    // Vous pouvez implémenter un toast ou une notification ici
    console.log(message);
  }

  calculateBalance(rapport: RapportFinancier): number {
    return rapport.budget - (rapport.depense + rapport.salaire);
  }
}