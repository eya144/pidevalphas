import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from '../projet.service';

@Component({
  selector: 'app-details-projet',
  templateUrl: './details-projet.component.html',
  styleUrls: ['./details-projet.component.css']
})
export class DetailsProjetComponent implements OnInit {
  projetId!: number;  // ID du projet
  projet: any;  // Détails du projet

  constructor(
    private route: ActivatedRoute,
    private router: Router,  // Ajout du Router
    private projetService: ProjetService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du projet à partir de l'URL
    this.projetId = +this.route.snapshot.paramMap.get('id')!;
    // Charger les informations du projet
    this.loadProjetDetails();
  }

  loadProjetDetails(): void {
    // Récupérer les détails du projet depuis l'API
    this.projetService.getProjetById(this.projetId).subscribe((projet) => {
      this.projet = projet;
    });
  }

  redirectToAddMission(): void {
    // Rediriger vers le formulaire d'ajout de mission
    this.router.navigate(['/ajouter-mission']);
  }
}
