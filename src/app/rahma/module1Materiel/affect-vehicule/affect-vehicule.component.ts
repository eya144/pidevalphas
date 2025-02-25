import { Component } from '@angular/core';
import { VehiculeService } from 'serviceLogistique/vehicule.service';

@Component({
  selector: 'app-affect-vehicule',
  templateUrl: './affect-vehicule.component.html',
  styleUrls: ['./affect-vehicule.component.css']
})
export class AffectVehiculeComponent {
chauffeur:number[] = [
  2,3,4,5,7,8,9
]
vehicules: any[] = [];

constructor(private vehiculeService: VehiculeService) {}

ngOnInit() {
  this.getVehicules();
}

getVehicules(): void {
  this.vehiculeService.getVehicule().subscribe(data => {
    this.vehicules = data;
  });
}
updateChauffeur(vehicule: any): void {
  // Mettre à jour l'ID du chauffeur du véhicule et appeler la méthode de mise à jour
  this.vehiculeService.modifierVehicule(vehicule.idVehicule, vehicule).subscribe(response => {
    console.log('Véhicule mis à jour:', response);
  });
}
updateDisponibilite(vehicule: any): void {
  if (!vehicule.disponible) {
    vehicule.idChauffeur = null; // Si le véhicule devient indisponible, réinitialiser l'ID du chauffeur
  }
  this.vehiculeService.modifierVehicule(vehicule.idVehicule, vehicule).subscribe(response => {
    console.log('Disponibilité du véhicule mise à jour:', response);
  });
}

}
