import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Projet } from '../core/models/Projet';
import { ProjetService } from '../projet.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.css']
})
export class AddProjetComponent implements OnInit {
  projetForm!: FormGroup;
  marker!: L.Marker;
  map!: L.Map;
  formSuccess = false;
  formError = false;

  chefs = [
    { id: 1, nom: 'Hela Ben Amor' },
    { id: 2, nom: 'Ahmed Zribi' },
    { id: 3, nom: 'Fares Mansouri' }
  ];

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projetForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      typeProjet: ['', Validators.required],
      status: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFinPrevue: ['', Validators.required],
      budgetInitial: [0, [Validators.required, Validators.min(1000)]],
      chefProjetId: ['', Validators.required],
      latitude: [36.8065, Validators.required],
      longitude: [10.1815, Validators.required]
    });

    this.initMap();
    this.projetForm.get('dateDebut')?.valueChanges.subscribe(() => this.validateDates());
    this.projetForm.get('dateFinPrevue')?.valueChanges.subscribe(() => this.validateDates());
  }

  initMap(): void {
    this.map = L.map('map').setView([36.8065, 10.1815], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([36.8065, 10.1815], { draggable: true }).addTo(this.map);

    this.marker.on('dragend', () => {
      const position = this.marker.getLatLng();
      this.projetForm.patchValue({
        latitude: position.lat,
        longitude: position.lng
      });
    });

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      this.projetForm.patchValue({ latitude: lat, longitude: lng });
      this.marker.setLatLng([lat, lng]);
    });
  }

  validateDates(): void {
    const dateDebut = new Date(this.projetForm.get('dateDebut')?.value);
    const dateFinPrevue = new Date(this.projetForm.get('dateFinPrevue')?.value);
    if (dateDebut > dateFinPrevue) {
      this.projetForm.get('dateFinPrevue')?.setErrors({ dateInvalide: true });
    } else {
      this.projetForm.get('dateFinPrevue')?.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.projetForm.valid) {
      const projet: Projet = this.projetForm.value;
      this.projetService.addProjet(projet).subscribe(
        () => {
          this.formSuccess = true;
          this.formError = false;
          setTimeout(() => {
            this.router.navigate(['/projet']);
          }, 2000);
        },
        (error) => {
          this.formSuccess = false;
          this.formError = true;
          console.error('Erreur lors de l\'ajout du projet', error);
        }
      );
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }

  // Méthode pour obtenir l'objet de contrôle d'un champ spécifique
  get f() {
    return this.projetForm.controls;
  }
}
