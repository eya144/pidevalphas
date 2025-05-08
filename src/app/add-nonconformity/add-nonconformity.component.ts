import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InspectionService } from '../services/inspection.service';
import { StatutNonConfirmity, TypeNonConformity } from 'src/models/Inspection.model';

@Component({
  selector: 'app-add-nonconformity',
  templateUrl: './add-nonconformity.component.html',
  styleUrls: ['./add-nonconformity.component.css']
})
export class AddNonconformityComponent implements OnInit {
  nonConformityForm!: FormGroup;

  typeNonConformities = Object.values(TypeNonConformity);
  statutsNonConformity = Object.values(StatutNonConfirmity);
  inspectionId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private inspectionService: InspectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.inspectionId = Number(this.route.snapshot.paramMap.get('id'));

    // Récupérer la date d'aujourd'hui au format ISO (aaaa-mm-jj)
    const today = new Date().toISOString().split('T')[0];

    this.nonConformityForm = this.fb.group({
      description: ['', Validators.required],
      typeNonConfirm: ['', Validators.required],
      // Initialiser le champ 'dateDetection' avec la date d'aujourd'hui
      dateDetection: [today, [Validators.required, this.validateDate]],
      statutNonConfirm: ['', Validators.required]
    });
  }

  /**
   * Validate that the selected date is today or before
   */
  validateDate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    // Convertir la date sélectionnée en objet Date
    const selectedDate = new Date(control.value);
    const today = new Date();

    // Mettre les heures, minutes, secondes et millisecondes de 'today' à 0 pour ne comparer que la date
    today.setHours(0, 0, 0, 0);

    // Comparer la date sélectionnée à aujourd'hui (en millisecondes)
    return selectedDate.getTime() <= today.getTime() ? null : { invalidDate: true };
  }
  submitNonConformity() {
    if (this.nonConformityForm.valid) {
      console.log("Form Data:", this.nonConformityForm.value); // Log the form data
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to add this Non-Conformity?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'No, cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.inspectionService.addNonConformityToInspection(this.inspectionId, this.nonConformityForm.value)
            .subscribe({
              next: () => {
                Swal.fire('Added!', 'Non-Conformity has been added.', 'success')
                  .then(() => {
                    this.router.navigate([`/inspection-detail/${this.inspectionId}`]);
                  });
              },
              error: (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: "Failed to add the Non-Conformity.",
                });
                console.error("Error adding:", err);
              }
            });
        }
      });
    }
  }
  
}
