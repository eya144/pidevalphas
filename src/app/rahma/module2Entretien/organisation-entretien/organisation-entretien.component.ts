import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeEmploiService } from 'serviceEntretien/demande-emploi.service';

@Component({
  selector: 'app-organisation-entretien',
  templateUrl: './organisation-entretien.component.html',
  styleUrls: ['./organisation-entretien.component.css']
})
export class OrganisationEntretienComponent {
  idDemande!: number;
  dateEntretien!: string;
  estEnLigne: boolean = false;
  lienMeet: string = '';

  constructor(
    private entretienService: DemandeEmploiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.idDemande = Number(this.route.snapshot.paramMap.get('id'));
  }

  // Afficher ou cacher le champ lien Meet
  gererTypeEntretien() {
    if (!this.estEnLigne) {
      this.lienMeet = ''; // Réinitialiser si l'utilisateur change d'avis
    }
  }

  // Génération d’un lien Google Meet (exemple statique)
  genererLienMeet() {
    this.lienMeet = "https://meet.google.com/" + Math.random().toString(36).substring(7);
  }

  // Validation et envoi des données
  validerEntretien() {
    const entretien = {
      dateEntretien: this.dateEntretien,
      typeEntretient: this.estEnLigne ? 'EnLigne' : 'Presentiel',
      lienMeet: this.estEnLigne ? this.lienMeet : null
    };

    this.entretienService.modifierEntretien(this.idDemande, entretien).subscribe(
      () => {
        alert("Entretien fixé avec succès !");
        this.router.navigate(['/demandesEmploi']); // Redirection après validation
      },
      error => console.error("Erreur lors de la modification de l'entretien", error)
    );
  }
}
