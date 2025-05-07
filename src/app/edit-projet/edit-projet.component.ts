import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from '../projet.service';
import * as L from 'leaflet';
import { Projet } from '../Model/Projet';

@Component({
  selector: 'app-edit-projet',
  templateUrl: './edit-projet.component.html',
  styleUrls: ['./edit-projet.component.css']
})
export class EditProjetComponent implements OnInit, AfterViewInit {
  projet!: Projet;
  map!: L.Map;
  marker!: L.Marker;

  chefList = [
    { id: 1, nom: 'Hela Ben Amor' },
    { id: 2, nom: 'Ahmed Zribi' },
    { id: 3, nom: 'Fares Mansouri' },
    { id: 4, nom: 'Zaid Khelifi' }
  ];

  statusList = [
    { value: 'TODO', label: 'TODO' },
    { value: 'DOING', label: 'DOING' },
    { value: 'SUSPENDED', label: 'SUSPENDED' },
    { value: 'DONE', label: 'DONE' }
  ];
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projetService: ProjetService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projetService.getProjetById(id).subscribe(
      (projet) => {
        this.projet = projet;
        const latitude = projet.latitude ?? 36.8065;
        const longitude = projet.longitude ?? 10.1815;
        setTimeout(() => this.initMap(latitude, longitude), 500);
      },
      (error) => {
        console.error('Erreur lors de la récupération du projet', error);
      }
    );
  }

  ngAfterViewInit(): void {
    if (this.projet?.latitude && this.projet?.longitude) {
      this.initMap(this.projet.latitude, this.projet.longitude);
    }
  }

  initMap(latitude: number, longitude: number): void {
    if (!document.getElementById('map')) {
      console.warn("L'élément de la carte n'est pas prêt.");
      return;
    }

    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([latitude, longitude], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      this.projet.latitude = position.lat;
      this.projet.longitude = position.lng;
    });

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      this.projet.latitude = lat;
      this.projet.longitude = lng;
      this.marker.setLatLng([lat, lng]);
    });
  }

  saveProjet(): void {
    if (this.projet.dateDebut && this.projet.dateFinPrevue) {
      const dateDebut = new Date(this.projet.dateDebut);
      const dateFin = new Date(this.projet.dateFinPrevue);
      if (dateDebut > dateFin) {
        alert("La date de début ne peut pas être postérieure à la date de fin prévue.");
        return;
      }
    }

    this.projetService.updateProjet(this.projet).subscribe(
      () => this.router.navigate(['/projet']),
      (error) => console.error('Erreur lors de la mise à jour du projet', error)
    );
  }
}
