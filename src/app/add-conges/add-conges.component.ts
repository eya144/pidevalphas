import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import{ CongesService } from '../conges.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-conges',
  templateUrl: './add-conges.component.html',
  styleUrls: ['./add-conges.component.css']
})
export class AddCongesComponent implements OnInit {
  teamForm: FormGroup;
  users: any[] = [];

  constructor(
    private fb: FormBuilder,
    private congesService: CongesService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.teamForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      utilisateur: ['', Validators.required],
    }, { validators: this.dateValidation });
  }

  ngOnInit(): void {
    this.loadUsers();
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

  dateValidation(formGroup: FormGroup) {
    const dateDebut = formGroup.get('dateDebut')?.value;
    const dateFin = formGroup.get('dateFin')?.value;
    return dateDebut && dateFin && dateDebut < dateFin ? null : { dateInvalid: true };
  }

  addConges(): void {
    if (this.teamForm.valid) {
      

  
          const congesData = this.teamForm.value;

          const data = {
            dateDebut: congesData.dateDebut,
            dateFin: congesData.dateFin,
            utilisateur: {
              id: congesData.utilisateur
            }
          }

          this.congesService.add(data).subscribe(
            response => {
              console.log('COnges added successfully:', response);
              this.toastr.success('Conges added successfully');
              this.router.navigate(['/conges']);
            },
            error => {
              console.error('Error adding conges:', error);
              alert('Error adding conges');
            }
          );
        
   
    } else {
      console.error('The form is invalid.');
      this.markFormGroupTouched(this.teamForm);
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
