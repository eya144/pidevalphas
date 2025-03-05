import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NonconformityService } from '../services/nonconformity.service.ts.service';
import { NonConformity, TypeNonConformity, StatutNonConfirmity } from '../models/Inspection.model';

@Component({
  selector: 'app-nonconformity-edit',
  templateUrl: './nonconformity-edit.component.html',
  styleUrls: ['./nonconformity-edit.component.css']
})
export class NonConformityEditComponent implements OnInit {
  nonConformityForm!: FormGroup;
  statutsNonConformity = Object.values(StatutNonConfirmity);
  typeNonConformities = Object.values(TypeNonConformity);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private nonConformityService: NonconformityService,
    private router: Router
  ) {

    
  }
  

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.nonConformityService.getNonConformityById(id).subscribe((data: NonConformity) => {
        this.nonConformityForm.patchValue({
          idNC: data.idNC,
          description: data.description,
          typeNonConform: data.typeNonConfirm, // Vérifiez que "typeNonConfirm" correspond à la clé du modèle
          dateDetection: data.dateDetection,
          statutsNonConform: data.statutNonConfirm // Vérifiez que "statutNonConfirm" correspond à la clé du modèle
        });
        
        
      });
    }
    
    this.nonConformityForm = this.fb.group({
      idNC: [null],
      description: ['', Validators.required],
      typeNonConform: ['', Validators.required],
      dateDetection: ['', [Validators.required, this.validateDate]],
      statutsNonConform: ['', Validators.required]
    });
  }


  /**
   * Validate that the selected date is today or before
   */
  validateDate(control: any) {
    const today = new Date().toISOString().split('T')[0];
    return control.value <= today ? null : { invalidDate: true };
  }

  updateNonConformity(): void {
    if (this.nonConformityForm.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to update this Non-Conformity?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedNonConformity = {
            idNC: this.nonConformityForm.value.idNC,
            description: this.nonConformityForm.value.description,
            typeNonConfirm: this.nonConformityForm.value.typeNonConform, // Utilisez le bon nom ici
            dateDetection: this.nonConformityForm.value.dateDetection,
            statutNonConfirm: this.nonConformityForm.value.statutsNonConform 
          
          };
          
          
          this.nonConformityService.updateNonConformity(updatedNonConformity).subscribe(() => {
            Swal.fire('Updated!', 'Non-Conformity has been updated.', 'success').then(() => {
              const inspectionId = this.route.snapshot.paramMap.get('inspectionId');
              
                this.router.navigate([`/Nonconform/${this.nonConformityForm.value.idNC}`]);
             
            });
          });
        }
      });
    }
  }
  
  
}
