import { Component, OnInit } from '@angular/core';
import { Projet } from '../core/models/Projet';
import { Router } from '@angular/router';
import { ProjetService } from '../projet.service';

import { PaginationService } from 'ngx-pagination'; // Import the pagination service

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projets: Projet[] = [];
  currentPage: number = 1; // Current page for pagination
  itemsPerPage: number = 1; // Number of items per page

  chefProjetMap: { [key: number]: string } = {
    1: 'Hela Ben Amor',
    2: 'Ahmed Zribi',
    3: 'Fares Mansouri',
    4: 'Zaid Khelifi'
  };
   

  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit(): void {
    this.getProjets();
  }

  nomRecherche: string = '';
  statusRecherche: string = '';

  filtrerProjets(): void {
    this.projetService.searchProjets(this.nomRecherche, this.statusRecherche).subscribe({
      next: (data: Projet[]) => {
        this.projets = data.map(projet => ({
          ...projet,
          nomChefProjet: this.getChefProjetName(projet.chefProjetId)
        }));
      },
      error: (err) => console.error('❌ Erreur lors de la recherche des projets :', err)
    });
  }

  getProjets(): void {
    this.projetService.getProjets().subscribe({
      next: (data: Projet[]) => {
        this.projets = data.map(projet => ({
          ...projet,
          nomChefProjet: this.getChefProjetName(projet.chefProjetId)
        }));
      },
      error: (err) => console.error('❌ Erreur lors de la récupération des projets :', err)
    });
  }

  getChefProjetName(id: number): string {
    return this.chefProjetMap[id] ?? 'Non attribué';
  }

  pageChanged(page: number): void {
    this.currentPage = page; // Update the current page
  }

  viewMissions(projetId: number): void {
    this.router.navigate([`/projets/${projetId}/missions`]);
  }

  viewDetails(projetId: number): void {
    if (!projetId) {
      console.warn('⚠️ ID du projet invalide.');
      return;
    }
    this.router.navigate(['/details-projet', projetId]);
  }

  ajouterProjet(): void {
    this.router.navigate(['/add-projet']);
  }

  modifierProjet(id: number): void {
    if (!id) {
      console.warn('⚠️ ID du projet invalide.');
      return;
    }
    this.router.navigate([`/edit-projet/${id}`]);
  }

  supprimerProjet(id: number): void {
    if (!id) {
      console.warn('⚠️ ID du projet invalide.');
      return;
    }

    if (confirm('Êtes-vous sûre de vouloir supprimer ce projet ?')) {
      this.projetService.deleteProjet(id).subscribe({
        next: () => {
          console.log(`✅ Projet ${id} supprimé avec succès.`);
          this.getProjets();
        },
        error: (err) => console.error('❌ Erreur lors de la suppression du projet :', err)
      });
    }
  }
}
