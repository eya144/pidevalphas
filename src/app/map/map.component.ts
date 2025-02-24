import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: L.Map;

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    // Initialiser la carte sur une position par défaut (par exemple, Tunis)
    this.map = L.map('map', {
      center: [36.8065, 10.1815],  // [Latitude, Longitude]
      zoom: 12  // Niveau de zoom initial
    });

    // Ajouter les tuiles OpenStreetMap à la carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    
    // Ajouter un marqueur initial sur la carte
    L.marker([36.8065, 10.1815]).addTo(this.map)
      .bindPopup('Tunis')
      .openPopup();

    // Gérer le clic sur la carte pour récupérer les coordonnées
    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    });
  }
}
