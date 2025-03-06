import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CongesService } from '../conges.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-conges',
  templateUrl: './edit-conges.component.html',
  styleUrls: ['./edit-conges.component.css']
})
export class EditCongesComponent implements OnInit {
  congesForm: FormGroup;
  users: any[] = [];
  congesId: number;

  constructor(
    private fb: FormBuilder,
    private congesService: CongesService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.congesForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      utilisateur: ['', Validators.required],
    }, { validators: this.dateValidation });
    
    this.congesId = +this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCongesData();
  }

  loadUsers(): void {
    this.congesService.getUsers().subscribe(
      (data: any) => {
        this.users = data;
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  loadCongesData(): void {
    this.congesService.getById(this.congesId).subscribe(
      (data: any) => {
        this.congesForm.patchValue({
          dateDebut: data.dateDebut,
          dateFin: data.dateFin,
          utilisateur: data.utilisateur.id
        });
      },
      error => {
        console.error('Error loading conges:', error);
      }
    );
  }

  dateValidation(formGroup: FormGroup) {
    const dateDebut = formGroup.get('dateDebut')?.value;
    const dateFin = formGroup.get('dateFin')?.value;
    return dateDebut && dateFin && dateDebut < dateFin ? null : { dateInvalid: true };
  }

  updateConges(): void {
    if (this.congesForm.valid) {
    

          const congesData = this.congesForm.value;

          const data = {
            dateDebut: congesData.dateDebut,
            dateFin: congesData.dateFin,
            utilisateur: {
              id: congesData.utilisateur
            }
          };

          this.congesService.update(this.congesId, data).subscribe(
            response => {
              console.log('Conges updated successfully:', response);
              this.toastr.success('Conges updated successfully');
              this.router.navigate(['/conges']);
            },
            error => {
              console.error('Error updating conges:', error);
              alert('Error updating conges');
            }
          );
       
    } else {
      console.error('The form is invalid.');
      this.markFormGroupTouched(this.congesForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  cancel(): void {
    this.router.navigate(['/conges']);
  }
}
