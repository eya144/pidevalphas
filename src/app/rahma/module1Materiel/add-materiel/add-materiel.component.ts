import { Component } from '@angular/core';
import { MaterielService } from 'serviceLogistique/materiel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-materiel',
  templateUrl: './add-materiel.component.html',
  styleUrls: ['./add-materiel.component.css']
})
export class AddMaterielComponent {
  materiel = {
    nomMateriel: '',
    categorie: '',
    quantite: 0,
    prixMateriel:0,
    imageUrl: ''
  };
  categories: string[] = [
    'MATERIAUX_CONSTRUCTION',
    'METAUX',
    'BOIS_ET_DERIVES',
    'ISOLATION',
    'ELECTRICITE',
    'PLOMBERIE',
    'PEINTURE_ET_FINITIONS',
    'OUTILS_ET_EQUIPEMENTS_CHANTIER',
    'REVETEMENTS_SOL_MUR',
    'MATERIAUX_ECOLOGIQUES_ET_INNOVANTS'
  ];

  constructor(private materielService: MaterielService, private router: Router) {}

  addMateriel(): void {
    this.materielService.addMateriel(this.materiel).subscribe(
      (data) => {
        console.log('Matériel ajouté', data);
        this.router.navigate(['dashboardLogistique/logistique']);  // Rediriger vers la page d'accueil après ajout
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du matériel', error);
      }
    );
  }
}
