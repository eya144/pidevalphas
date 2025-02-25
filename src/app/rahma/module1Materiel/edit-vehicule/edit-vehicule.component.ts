import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculeService } from 'serviceLogistique/vehicule.service';

@Component({
  selector: 'app-edit-vehicule',
  templateUrl: './edit-vehicule.component.html',
  styleUrls: ['./edit-vehicule.component.css']
})
export class EditVehiculeComponent implements OnInit {
  vehiculeForm!: FormGroup;
  idVehicule!: number;
  typesVehicule = ['CAMION_BENNE', 'BETONNIERE', 'GRUE_MOBILE', 'CHARGEUSE', 'PELLE_HYDRAULIQUE', 'BULLDOZER', 'NACELLE_ELEVATRICE', 'COMPACTEUR', 'CAMION_PLATEAU', 'EXCAVATRICE', 'TOMBEREAU', 'FINISSEUR'];
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private vehiculeService: VehiculeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idVehicule = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID Véhicule récupéré:', this.idVehicule); 
    this.initForm();
    this.getVehiculeById();
  }
  

  initForm(): void {
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
  

  getVehiculeById(): void {
    this.vehiculeService.getVehiculeById(this.idVehicule).subscribe(
      (data) => {
        console.log(data);  // Ajouter cette ligne pour voir si les données sont reçues
        if (data) {
          this.vehiculeForm.patchValue({
            nomVehicule: data.nomVehicule,
            idChauffeur: data.idChauffeur,
            marque: data.marque,
            modele: data.modele,
            immatriculation: data.immatriculation,
            typeVehicule: data.typeVehicule,
            disponible: data.disponible
          });
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du véhicule', error);
      }
    );
  }  

  onSubmit(): void {
    if (this.vehiculeForm.valid) {
      this.vehiculeService.modifierVehicule(this.idVehicule, this.vehiculeForm.value).subscribe(
        () => {
          this.successMessage = 'Le véhicule a été mis à jour avec succès!';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/logistique']);
          }, 3000);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du véhicule', error);
        }
      );
    } else {
      console.log('Le formulaire est invalide');
    }
  }
  
  onCancel(): void {
    this.vehiculeForm.reset();
    this.router.navigate(['/logistique']);
  }
}
