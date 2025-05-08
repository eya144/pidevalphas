import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionService } from '../services/inspection.service';
import Swal from 'sweetalert2';
import { Inspection, StatusInspection, TypeInspection } from 'src/models/Inspection.model';

@Component({
  selector: 'app-inspection-edit',
  templateUrl: './inspection-edit.component.html',
  styleUrls: ['./inspection-edit.component.css']
})
export class InspectionEditComponent implements OnInit {
  inspectionForm: FormGroup;
  inspection: Inspection = {
    idINS: null as any,
    dateInspection: new Date().toISOString().split('T')[0],
    typeInspection: TypeInspection.Structural,
    statusInspection: StatusInspection.Completed,
    nonConformities: [],
    projet: null as any,
    user: null as any,
    rapportQualite: null as any,
    
    idProjet: undefined
  };

  statusOptions = Object.values(StatusInspection);
  typeInspection = Object.values(TypeInspection);

  constructor(
    private fb: FormBuilder,
    private inspectionService: InspectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.inspectionForm = this.fb.group({
      dateInspection: ['', [Validators.required, this.dateValidator]],
      typeInspection: ['', Validators.required],
      statusInspection: ['', Validators.required]
    });
  }

  // Custom validation to ensure the date is today or in the future
  dateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove the time part to compare only the date
    return selectedDate >= today ? null : { invalidDate: true };
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.inspectionService.getInspectionById(id).subscribe(data => {
        this.inspection = data;
        this.inspection.dateInspection = this.inspection.dateInspection.split('T')[0]; // Format date to YYYY-MM-DD
        this.inspectionForm.patchValue(this.inspection);
      });
    }
     // Écouteur sur les changements de la date d'inspection
     this.inspectionForm.get('dateInspection')?.valueChanges.subscribe((selectedDate: string) => {
      this.updateStatusOptions(selectedDate);
    });
  }

  updateStatusOptions(selectedDate: string): void {
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    if (selectedDate === today) {
      this.statusOptions = [StatusInspection.In_Progress, StatusInspection.Completed];
      this.inspectionForm.get('statusInspection')?.setValue(StatusInspection.In_Progress);
      this.inspectionForm.get('statusInspection')?.enable();
    } else if (selectedDate > today) {
      this.statusOptions = [StatusInspection.Planned, StatusInspection.Canceled];
      this.inspectionForm.get('statusInspection')?.setValue(StatusInspection.Planned);
      this.inspectionForm.get('statusInspection')?.enable();
    } 
  }

  
  updateInspection(): void {
  if (this.inspectionForm.invalid) return;

  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to update this inspection?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, update it!',
    cancelButtonText: 'No, cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedInspection = { 
        idINS: this.inspection.idINS,  // Assure que l'ID est bien envoyé
        ...this.inspectionForm.value 
      };

      this.inspectionService.updateInspection(updatedInspection).subscribe(() => {
        Swal.fire('Updated!', 'Inspection has been updated.', 'success');
        this.router.navigate(['/inspections']);
      });
    }
  });
}
}