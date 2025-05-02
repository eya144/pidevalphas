import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiculeService } from 'serviceLogistique/vehicule.service';

@Component({
  selector: 'app-add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.css']
})
export class AddVehiculeComponent implements OnInit {
  vehiculeForm!: FormGroup;
  typesVehicule = ['CAMION_BENNE', 'BETONNIERE', 'GRUE_MOBILE', 'CHARGEUSE', 'PELLE_HYDRAULIQUE', 'BULLDOZER', 'NACELLE_ELEVATRICE', 'COMPACTEUR', 'CAMION_PLATEAU', 'EXCAVATRICE', 'TOMBEREAU', 'FINISSEUR'];

  constructor(
    private fb: FormBuilder, 
    private vehiculeService: VehiculeService,
    private router: Router
) {}

  ngOnInit(): void {
    this.vehiculeForm = this.fb.group({
      nomVehicule: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      idChauffeur: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      marque: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      modele: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      immatriculation: ['', [Validators.required, Validators.pattern('^[A-Z0-9-]{3,15}$')]],
      typeVehicule: ['', Validators.required],
      disponible: [false],
    });
  }
  successMessage: string = '';

  // Méthode onSubmit pour soumettre le formulaire
  onSubmit(): void {
    if (this.vehiculeForm.valid) {
      this.vehiculeService.ajouterVehicule(this.vehiculeForm.value).subscribe(response => {
        this.successMessage = 'Le véhicule a été ajouté avec succès!';
        this.router.navigate(['dashboardLogistique/logistique']);
  
        setTimeout(() => {
          this.successMessage = '';
        }, 3000)

      });
    }
  }

  // Pour annuler la saisie (si nécessaire, ajouter la logique)
  onCancel() {
    this.vehiculeForm.reset();
  }
}
