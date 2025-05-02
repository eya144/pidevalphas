import { Component, OnInit } from '@angular/core';
import { VehiculeService } from 'serviceLogistique/vehicule.service';

@Component({
  selector: 'app-vehicule-dispo',
  templateUrl: './vehicule-dispo.component.html',
  styleUrls: ['./vehicule-dispo.component.css']
})
export class VehiculeDispoComponent implements OnInit {
  vehiculesDisponibles: any[] = [];

  constructor(private vehiculeService: VehiculeService) {}

  ngOnInit(): void {
    this.vehiculeService.getVehiculesDisponibles().subscribe(
      (data) => {
        this.vehiculesDisponibles = data;
        console.log('Véhicules disponibles:', this.vehiculesDisponibles);
      },
      (error) => {
        console.error('Erreur lors de la récupération des véhicules', error);
      }
    );
  }

  // Générer un lien Google Maps avec latitude et longitude
  getGoogleMapsLink(latitude: number, longitude: number): string {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
  }
}
