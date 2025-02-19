import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importer le service Router
import { Projet } from '../core/models/Projet';
import { ProjetService } from '../projet.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projets: Projet[] = [];
  selectedProjet: Projet | null = null;
  message: string | null = null;
  messageType: 'success' | 'danger' | null = null;

  // Ajouter le Router au constructeur
  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets(): void {
    this.projetService.getAllProjets().subscribe({
      next: (data: Projet[]) => {
        this.projets = data;
        this.showMessage('Projets chargés avec succès.', 'success');
      },
      error: (err: any) => {
        this.showMessage('Erreur de récupération des projets.', 'danger');
      }
    });
  }

  selectProjet(projet: Projet): void {
    this.selectedProjet = projet;
  }

  showMessage(message: string, type: 'success' | 'danger'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => (this.message = null), 5000);
  }

  goToAddProjet(): void {
    // Utiliser le Router pour la redirection
    this.router.navigate(['/projets/ajouter']);
  }

  editProjet(projet: Projet): void {
    // Modification de la ligne pour utiliser idProjet
    window.location.href = `/projets/modifier/${projet.idProjet}`;
  }

  deleteProjet(idProjet: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      this.projetService.deleteProjet(idProjet).subscribe({
        next: () => {
          this.showMessage('Projet supprimé avec succès.', 'success');
          this.loadProjets();
        },
        error: () => this.showMessage('Erreur lors de la suppression.', 'danger')
      });
    }
  }

  closeDetails(): void {
    this.selectedProjet = null;
  }
}
