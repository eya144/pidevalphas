import { Component, OnInit } from '@angular/core';
import { VehiculeService } from 'serviceLogistique/vehicule.service';

@Component({
  selector: 'app-chauffeur-interface',
  templateUrl: './chauffeur-interface.component.html',
  styleUrls: ['./chauffeur-interface.component.css']
})
export class ChauffeurInterfaceComponent implements OnInit {
  vehicule: any;
  private watchId: number | null = null; // Variable pour suivre la mise à jour continue de la position

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    const idChauffeur = 1; 

    this.vehiculeService.getVehiculeByChauffeurId(idChauffeur).subscribe(
      (data) => {
        this.vehicule = data;
        console.log('Véhicule récupéré:', this.vehicule);
      },
      (error) => {
        console.error('Erreur lors de la récupération du véhicule', error);
      }
    );
  }

  partagerPosition(): void {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        if (this.vehicule) {
          this.vehiculeService.updatePositionVehicule(this.vehicule.idVehicule, latitude, longitude).subscribe(
            (response) => {
              console.log('Position mise à jour:', response);
              this.vehicule.latitude = latitude;
              this.vehicule.longitude = longitude;
            },
            (error) => {
              console.error('Erreur lors de la mise à jour de la position', error);
            }
          );
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération de la position', error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
      }
    );
  }

  // Arrêter le suivi de position (optionnel)
  stopSharingPosition(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      console.log('Partage de position arrêté.');
    }
  }
}
