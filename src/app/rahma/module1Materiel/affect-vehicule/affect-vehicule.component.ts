import { Component } from '@angular/core';
import { VehiculeService } from 'serviceLogistique/vehicule.service';

@Component({
  selector: 'app-affect-vehicule',
  templateUrl: './affect-vehicule.component.html',
  styleUrls: ['./affect-vehicule.component.css']
})
export class AffectVehiculeComponent {
chauffeurs: any[] = []; // Liste des chauffeurs récupérés de l'API
vehicules: any[] = [];

constructor(private vehiculeService: VehiculeService) {}

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
    this.chauffeurs = data;  // Affecte la liste des chauffeurs
  });
}
 // Mettre à jour l'affectation du chauffeur à un véhicule
 updateChauffeur(vehicule: any): void {
  this.vehiculeService.modifierVehicule(vehicule.idVehicule, vehicule).subscribe(response => {
    console.log('Véhicule mis à jour avec chauffeur:', response);
  });
}

// Mettre à jour la disponibilité du véhicule et désaffecter le chauffeur si nécessaire
updateDisponibilite(vehicule: any): void {
  if (!vehicule.disponible) {
    vehicule.idChauffeur = null; // Réinitialiser l'ID du chauffeur si le véhicule devient indisponible
  }
  this.vehiculeService.modifierVehicule(vehicule.idVehicule, vehicule).subscribe(response => {
    console.log('Disponibilité du véhicule mise à jour:', response);
  });
}
}