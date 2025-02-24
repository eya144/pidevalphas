import { Component, OnInit } from '@angular/core';
import { Projet } from '../core/models/Projet';
import { Router } from '@angular/router';
import { ProjetService } from '../projet.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  projets: Projet[] = [];

  // 🔑 Mapping temporaire ID → Nom du chef de projet
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

  // 🟢 Récupérer la liste des projets
  getProjets(): void {
    this.projetService.getProjets().subscribe(
      (data) => {
        // Associer chaque projet à un nom de chef de projet
        this.projets = data.map(projet => ({
          ...projet,
          nomChefProjet: this.getChefProjetName(projet.chefProjetId)
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }

  // 🔍 Obtenir le nom du chef de projet par ID
  getChefProjetName(id: number): string {
    return this.chefProjetMap[id] || 'Non attribué';
  }

  // ➕ Ajouter un projet
  ajouterProjet(): void {
    this.router.navigate(['/add-projet']);
  }

  // ✏ Modifier un projet
  modifierProjet(id: number): void {
    this.router.navigate([`/edit-projet/${id}`]);
  }

  // ❌ Supprimer un projet
  supprimerProjet(id: number): void {
    if (confirm('Êtes-vous sûre de vouloir supprimer ce projet ?')) {
      this.projetService.deleteProjet(id).subscribe(
        () => this.getProjets(),
        (error) => console.error('Erreur lors de la suppression', error)
      );
    }
  }
}
