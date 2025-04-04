import { Component, OnInit } from '@angular/core';

import { ProjetService } from '../services/projet.service';
import { Inspection, Projet, StatusInspection, TypeInspection, User } from '../models/Inspection.model';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Ajout du Router pour la redirection
import Swal from 'sweetalert2'; // Import SweetAlert2
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-inspection-add',
  templateUrl: './inspection-add.component.html',
  styleUrls: ['./inspection-add.component.css']
})
export class InspectionAddComponent implements OnInit {

  users: User[] = [];
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
    user: null as any,

    idProjet: undefined,
  
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
      this.users = data;
    });
  }

  loadProjets(): void {
    this.projetService.getProjets().subscribe((data) => {
      this.projets = data;
    });
  }

  ajouterInspection(): void {
    if (this.inspections.some(inspection => !inspection.dateInspection || !inspection.typeInspection || !inspection.statusInspection)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields.',
      });
      return;
    }

    if (!this.selectedInspecteur || !this.selectedProjet || this.inspections.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields.',
      });
      return;
    }

    this.inspecteurService.addInspectionsToUser(
      this.selectedInspecteur.idUSER,
      this.inspections,
      this.selectedProjet.idProjet
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Inspections added successfully.',
        }).then(() => {
          this.router.navigate(['/inspections']); // Redirect to inspections list
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error adding inspections.',
        });
      }
    });
  }

  ajouterNouvelleInspection(): void {
    const today = new Date().toISOString().split('T')[0]; // Today's date

    // Using 'selectedDate' as the selected date
    const selectedDate = this.inspectionForm.get('dateInspection')?.value;

    // Apply logic to update the status based on the selected date
    if (selectedDate === today) {
      this.statusOptions = [StatusInspection.In_Progress, StatusInspection.Completed];
      this.inspectionForm.get('statusInspection')?.setValue(StatusInspection.In_Progress);
      this.inspectionForm.get('statusInspection')?.enable();
    } else if (selectedDate > today) {
      this.statusOptions = [StatusInspection.Planned, StatusInspection.Completed];
      this.inspectionForm.get('statusInspection')?.setValue(StatusInspection.Planned);
      this.inspectionForm.get('statusInspection')?.enable();
    }

    // Add the new inspection with the selected date and appropriate status
    this.inspections.push({
      idINS: 0,
      dateInspection: selectedDate, // Use the selected date
      typeInspection: TypeInspection.Security,
      statusInspection: this.inspectionForm.get('statusInspection')?.value || StatusInspection.Planned, // Status based on logic
      nonConformities: [],
      projet: this.selectedProjet,
      user: this.selectedInspecteur,
      idProjet: undefined
    });
  }

  formInvalid(): boolean {
    return this.inspections.some(inspection =>
      !inspection.dateInspection || !inspection.typeInspection || !inspection.statusInspection
    );
  }
}
