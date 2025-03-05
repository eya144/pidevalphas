import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NonconformityService } from '../services/nonconformity.service.ts.service';
import Swal from 'sweetalert2';
import { ActionCorrective, StatusInspection } from '../models/Inspection.model';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent {
  actionCorrectiveForm: FormGroup;
  action: ActionCorrective = {
    idAC: null as any,
    description: '',
    statusActionCorrective: StatusInspection.Canceled,
    dateDebut: '',
    dateFin: ''
  };
  statusOptions = Object.values(StatusInspection);
  nonConformityId: number = 0;  // Stocke l'ID récupéré
  todayDate: string = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format  

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,  // Récupérer l'ID de l'URL
    private nonconformityService: NonconformityService,
    private router: Router
  ) {
    // Récupérer l'ID depuis l'URL
    this.route.paramMap.subscribe(params => {
      this.nonConformityId = Number(params.get('id'));
    });

    // Initialiser le formulaire avec l'ID et le statut par défaut "Planned"
    this.actionCorrectiveForm = this.fb.group({
      nonConformityId: [{ value: this.nonConformityId, disabled: true }, Validators.required], 
      description: ['', [Validators.required, Validators.minLength(5)]],  // Description validation
      dateDebut: ['', [Validators.required, this.dateDebutValidator.bind(this)]], // Start date validation
      dateFin: ['', [Validators.required, this.dateFinValidator.bind(this)]],  // End date validation
      statusActionCorrective: ['', Validators.required]  // Initial status set to "Planned"
    });

    // Watch for changes in the start date to update the status automatically
    this.actionCorrectiveForm.get('dateDebut')?.valueChanges.subscribe((newDate: string) => {
      const startDate = new Date(newDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);  // Clear time part to compare only the date

      // If the start date is today, change status to "In Progress"
      if (startDate.getTime() === today.getTime()) {
        this.actionCorrectiveForm.get('statusActionCorrective')?.setValue('In Progress');
      } else {
        this.actionCorrectiveForm.get('statusActionCorrective')?.setValue('Planned');
      }
    });
  }

  // Custom validator for the start date
  dateDebutValidator(control: any) {
    const today = new Date().toISOString().split('T')[0];
    if (new Date(control.value) < new Date(today)) {
      return { dateDebutInvalid: true };
    }
    return null;
  }

  // Custom validator for the end date
  dateFinValidator(control: any) {
    if (this.actionCorrectiveForm && this.actionCorrectiveForm.get('dateDebut')?.value) {
      const startDate = new Date(this.actionCorrectiveForm.get('dateDebut')?.value);
      const endDate = new Date(control.value);
      if (endDate <= startDate) {
        return { dateFinInvalid: true };
      }
    }
    return null;
  }

  addActionCorrective() {
    if (this.actionCorrectiveForm.valid) {
      // Passe les deux arguments nécessaires : nonConformityId et les données du formulaire
      this.nonconformityService.addActionCorrective(this.nonConformityId, this.actionCorrectiveForm.value)
        .subscribe({
          next: () => {
            // SweetAlert Success
            Swal.fire({
              icon: 'success',
              title: 'Action Added',
              text: 'The corrective action has been successfully added.',
              confirmButtonText: 'OK'
            })
            .then(() => {
              this.router.navigate([`/Nonconform/${this.nonConformityId}`]);
            });
          },
          error: (err: any) => {
            // SweetAlert Error
            Swal.fire({
              icon: 'error',
              title: 'Action Failed',
              text: 'There was an error while adding the corrective action.',
              confirmButtonText: 'Try Again'
            });
            console.error(err);
          }
        });
    } else {
      // Form Validation Error
      Swal.fire({
        icon: 'warning',
        title: 'Form Invalid',
        text: 'Please fill in all required fields.',
        confirmButtonText: 'OK'
      });
    }
  }
}
