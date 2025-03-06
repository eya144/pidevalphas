import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipeService } from '../equipe.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from 'src/app/success-dialog/success-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-equipe',
  templateUrl: './add-equipe.component.html',
  styleUrls: ['./add-equipe.component.css']
})
export class AddEquipeComponent {
  teamForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private equipeService: EquipeService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.teamForm = this.fb.group({
      nomEquipe: ['', Validators.required],
      disponibilite: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization if needed
  }

  addTeam(): void {
    if (this.teamForm.valid) {
      // Open confirmation dialog
     

          // User confirmed, prepare team data
          const teamData = this.teamForm.value;

          // Call the service to add the team (adjust the method name if needed)
          this.equipeService.add(teamData).subscribe(
            response => {
              console.log('Team added successfully:', response);
              // Open success dialog
              this.toastr.success('Team added successfully');
              // Redirect to team list
              this.router.navigate(['/teams']);
            },
            error => {
              console.error('Error adding team:', error);
              alert('Error adding team');
            }
          );
      
    } else {
      console.error('The form is invalid.');
      this.markFormGroupTouched(this.teamForm);
    }
  }

  // Mark all fields as touched to show validation errors
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  cancel(): void {
    this.router.navigate(['/teams']);
  }

}
