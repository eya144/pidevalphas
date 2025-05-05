import { Component, OnInit } from '@angular/core';
import { BulletinPaie } from '../core/models/FicheDePai';
import { Router } from '@angular/router';
import { FichedepaieService } from '../fichedepaie.service';
import { catchError, map, Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fichedepaie-comptable',
  templateUrl: './fichedepaie-comptable.component.html',
  styleUrls: ['./fichedepaie-comptable.component.css']
})
export class FichedepaieComptableComponent implements OnInit {
  fichesDePaie: BulletinPaie[] = [];
formGroups: any;

  // Pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  constructor(private fichedepaieService: FichedepaieService, private router: Router) {}

  ngOnInit(): void {
    this.loadFichesDePaie();
  }

  loadFichesDePaie(): void {
    this.fichedepaieService.getFicheDePaie().subscribe(
      (data: BulletinPaie[]) => {
        this.fichesDePaie = data;
        console.log('Fiches de paie chargées :', this.fichesDePaie);
      },
      (error) => {
        console.error('Erreur lors du chargement des fiches de paie', error);
      }
    );
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

deleteFiche(fiche: BulletinPaie): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette fiche de paie ?')) {
    this.fichedepaieService.deleteFicheDePaie(fiche.idBulletinPaie).subscribe(
      () => {
        // Remove the fiche from the list
        const index = this.fichesDePaie.findIndex(f => f.idBulletinPaie === fiche.idBulletinPaie);
        if (index !== -1) {
          this.fichesDePaie.splice(index, 1);
        }
        console.log('Fiche de paie supprimée avec succès');
      },
      (error) => {
        console.error('Erreur lors de la suppression de la fiche de paie', error);
      }
    );
  }
}

 // Imprimer une fiche de paie
 imprimerFiche(fiche: BulletinPaie): void {
  this.fichedepaieService.imprimerFiche(fiche.idBulletinPaie).subscribe(
    (response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    },
    (error) => {
      console.error('Erreur lors de l\'impression de la fiche', error);
    }
  );
}

 // Naviguer vers la page d'ajout de fiche de paie
 openAddFicheDePaieModal(): void {
  this.router.navigate(['/add-fichedepaie']);
}

closeModal(): void {
  const modal = document.getElementById('addFicheDePaieModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

onFicheAdded(newFiche: BulletinPaie): void {
  this.fichesDePaie.push(newFiche);
}

updateStatutPaiement(fiche: BulletinPaie): void {
  this.fichedepaieService.updateFicheDePaie(fiche).subscribe(
    (updatedFiche) => {
      console.log('Statut de paiement mis à jour avec succès', updatedFiche);
      const index = this.fichesDePaie.findIndex(f => f.idBulletinPaie === updatedFiche.idBulletinPaie);
      if (index !== -1) {
        this.fichesDePaie[index] = updatedFiche;
      }
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du statut de paiement', error);
    }
  );
}

changePage(page: number): void {
  this.currentPage = page;
}

get totalPages(): number {
  return Math.ceil(this.totalItems / this.itemsPerPage);
}

 get currentfichesDePaie(): BulletinPaie[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.fichesDePaie.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
