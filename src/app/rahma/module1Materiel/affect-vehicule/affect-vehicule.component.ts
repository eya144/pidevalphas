import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculeService } from 'serviceLogistique/vehicule.service';

@Component({
  selector: 'app-affect-vehicule',
  templateUrl: './affect-vehicule.component.html',
  styleUrls: ['./affect-vehicule.component.css']
})
export class AffectVehiculeComponent {
// Désaffectation du chauffeur -> Véhicule devient disponible

  chauffeurs: any[] = []; 
  vehicules: any[] = [];

  constructor(private vehiculeService: VehiculeService,private router: Router) {}

  ngOnInit() {
    this.getVehicules();
    this.getChauffeurs(); 
  }

  getVehicules(): void {
    this.vehiculeService.getVehicule().subscribe(data => {
      this.vehicules = data;
    });
  }

  getChauffeurs(): void {
    this.vehiculeService.getAllChauffeurs().subscribe(data => {
      this.chauffeurs = data;  
    });
  }

  updateChauffeur(vehicule: any): void {
    if (!vehicule.idChauffeur) {
      // Désaffectation du chauffeur -> Véhicule devient disponible
      this.vehiculeService.desaffecterChauffeurDuVehicule(vehicule.idVehicule).subscribe(response => {
        console.log('Véhicule désaffecté:', response);
        vehicule.disponible = true; // Mise à jour locale
        vehicule.idChauffeur = null;
      });
    } else {
      // Vérifier si le chauffeur est déjà affecté à un autre véhicule
      const chauffeurAffecte = this.vehicules.some(v => v.idChauffeur === vehicule.idChauffeur && v.idVehicule !== vehicule.idVehicule);
      
      if (chauffeurAffecte) {
        alert('Ce chauffeur est déjà affecté à un autre véhicule.');
        vehicule.idChauffeur = null;
        return;
      }
  
      // Affectation du chauffeur -> Véhicule devient indisponible
      this.vehiculeService.affecterChauffeurAVehicule(vehicule.idVehicule, vehicule.idChauffeur).subscribe(response => {
        console.log('Véhicule mis à jour avec chauffeur:', response);
        vehicule.disponible = false; // Mise à jour locale
      });
    }
  }
  
  isChauffeurAffecte(idChauffeur: number): boolean {
    return this.vehicules.some(v => v.idChauffeur === idChauffeur);
  }
  redirectToDispo() {
    this.router.navigate(['/dashboardLogistique/vehiculeDispo']); 
    }
}  