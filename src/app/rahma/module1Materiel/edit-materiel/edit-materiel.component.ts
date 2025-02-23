import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';  // Importez Router et ActivatedRoute
import { MaterielService } from 'serviceLogistique/materiel.service';

@Component({
  selector: 'app-edit-materiel',
  templateUrl: './edit-materiel.component.html',
  styleUrls: ['./edit-materiel.component.css']
})
export class EditMaterielComponent implements OnInit {
  materiel: any = {}; 
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

  constructor(
    public materielService: MaterielService,  // Pas de problème avec "materielService"
    public router: Router,  // Changer "private" à "public"
    private route: ActivatedRoute // Injection de ActivatedRoute pour récupérer l'ID du matériel
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Récupère l'ID du matériel depuis l'URL
    this.getMaterielById(id);
  }

  getMaterielById(id: number): void {
    this.materielService.getMaterielById(id).subscribe(
      (data) => {
        this.materiel = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du matériel', error);
      }
    );
  }

  saveMateriel(): void {
    this.materielService.updateMateriel(this.materiel.idMateriel, this.materiel).subscribe(
      () => {
        this.router.navigate(['/logistique']);  // Redirige vers la page de gestion des matériels après modification
      },
      (error) => {
        console.error('Erreur lors de la sauvegarde du matériel', error);
      }
    );
  }
}
