import { Component, OnInit } from '@angular/core';

import { ProjetService } from '../services/projet.service';
import { Inspection, Projet, StatusInspection, TypeInspection, User } from '../models/Inspection.model';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Ajout du Router pour la redirection
import Swal from 'sweetalert2'; // Import SweetAlert2
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-showinspections',
  templateUrl: './showinspections.component.html',
  styleUrls: ['./showinspections.component.css']
})
export class ShowinspectionsComponent implements OnInit {

  inspecteurs: User[] = [];
  projets: Projet[] = [];
  selectedInspecteur!: User;
  selectedProjet!: Projet;
  inspections: Inspection[] = [];
  today: string = new Date().toISOString().split('T')[0]; // Date d'aujourd'hui pour la validation de la date

  inspectionForm: FormGroup;
  inspection: Inspection = {
    idINS: null as any,
    dateInspection: new Date().toISOString().split('T')[0],
    typeInspection: TypeInspection.Security,
    statusInspection: StatusInspection.Completed,
    nonConformities: [],
    projet: null as any,
    user: null,
    idProjet: undefined
  };

  statusOptions = Object.values(StatusInspection);
  typeInspection = Object.values(TypeInspection);

  constructor(
    private fb: FormBuilder,
    private inspecteurService: UserService,
    private projetService: ProjetService,
    private router: Router // Injection du Router
  ) {
    this.inspectionForm = this.fb.group({
      dateInspection: ['', [Validators.required, this.dateValidator]],
      typeInspection: ['', Validators.required],
      statusInspection: ['', Validators.required]
    });
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove the time part to compare only the date
    return selectedDate >= today ? null : { invalidDate: true };
  }

  ngOnInit(): void {
    this.loadInspecteurs();
    this.loadProjets();
  }

  loadInspecteurs(): void {
    this.inspecteurService.getAllInspecteurs().subscribe((data) => {
      this.inspecteurs = data;
    });
  }

  loadProjets(): void {
    this.projetService.getProjets().subscribe((data) => {
      this.projets = data;
    });
  }

 ajouterInspection(): void {
  console.log('Selected Inspector:', this.selectedInspecteur);  // Check if selectedInspecteur is populated
  console.log('Selected Project:', this.selectedProjet);
  console.log('Inspections:', this.inspections);

  if (!this.selectedInspecteur || !this.selectedInspecteur.idUSER || !this.selectedProjet || this.inspections.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill in all fields.',
    });
    return;
  }

  const inspectionsToSend: Inspection[] = this.inspections.map(inspection => ({
    idINS: inspection.idINS,
    dateInspection: inspection.dateInspection,
    typeInspection: inspection.typeInspection,
    statusInspection: inspection.statusInspection,
    nonConformities: inspection.nonConformities,
    idProjet: this.selectedProjet.idProjet,
    projet: { 
      idProjet: this.selectedProjet.idProjet, 
      nomProjet: this.selectedProjet.nomProjet 
    }, 
    user: { 
      idUSER: this.selectedInspecteur.idUSER,
      nom: this.selectedInspecteur.nom,
      adresse: this.selectedInspecteur.adresse,
      telephone: this.selectedInspecteur.telephone,
      email: this.selectedInspecteur.email,
      userRole: this.selectedInspecteur.userRole
    }
  }));

  console.log('Data sent to API:', inspectionsToSend);

  this.inspecteurService.addInspectionsToUser(
    this.selectedInspecteur.idUSER,
    inspectionsToSend,
    this.selectedProjet.idProjet
  )
  .subscribe({
    next: (response) => {
      console.log('Response:', response);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Inspections added successfully.',
      }).then(() => {
        this.router.navigate(['/listadmininspection']);
      });
    },
    error: (error) => {
      console.error('API Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Error adding inspections.',
      });
    }
  });
}

  

  ajouterNouvelleInspection(): void {
    if (!this.selectedInspecteur || !this.selectedProjet) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select an inspector and a project before adding an inspection.',
      });
      return;
    }
  
    const today = new Date().toISOString().split('T')[0]; // Today's date
    const selectedDate = this.inspectionForm.get('dateInspection')?.value || today;
  
    let status = StatusInspection.Planned; // Default status
    if (selectedDate === today) {
      status = StatusInspection.In_Progress;
    } else if (selectedDate > today) {
      status = StatusInspection.Planned;
    }
  
    // Créer une nouvelle instance de l'inspection
    const newInspection: Inspection = {
      idINS: 0,
      dateInspection: selectedDate,
      typeInspection: this.inspectionForm.get('typeInspection')?.value || TypeInspection.Security,
      statusInspection: status,
      nonConformities: [],
      projet: this.selectedProjet,
      user: this.selectedInspecteur,
  
      idProjet: this.selectedProjet.idProjet
    };
  
    // Ajouter la nouvelle inspection sans écraser les précédentes
    this.inspections = [...this.inspections, newInspection];
  
    // Réinitialiser le formulaire pour une nouvelle entrée
    this.inspectionForm.reset();
  }
  

  formInvalid(): boolean {
    return this.inspections.some(inspection =>
      !inspection.dateInspection || !inspection.typeInspection || !inspection.statusInspection
    );
  }
}
