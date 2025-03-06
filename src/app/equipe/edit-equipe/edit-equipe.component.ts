import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EquipeService } from '../equipe.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { SuccessDialogComponent } from 'src/app/success-dialog/success-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-equipe',
  templateUrl: './edit-equipe.component.html',
  styleUrls: ['./edit-equipe.component.css']
})
export class EditEquipeComponent implements OnInit {
  teamForm: FormGroup;
  teamId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private equipeService: EquipeService,
    private route: ActivatedRoute,
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
    this.teamId = Number(this.route.snapshot.paramMap.get('id')); // Get ID from URL
    if (this.teamId) {
      this.loadTeamData(this.teamId);
    }
  }

  loadTeamData(id: number): void {
    this.equipeService.getById(id).subscribe(
      (data) => {
        this.teamForm.patchValue(data);
      },
      (error) => {
        console.error('Error loading team data:', error);
        alert('Error loading team data');
      }
    );
  }

  updateTeam(): void {
    if (this.teamForm.valid && this.teamId) {
      

   
          const updatedTeam = this.teamForm.value;

          this.equipeService.update(this.teamId!, updatedTeam).subscribe(
            response => {
              console.log('Team updated successfully:', response);
              this.toastr.success('Team updated successfully');
              this.router.navigate(['/teams']);
            },
            error => {
              console.error('Error updating team:', error);
              alert('Error updating team');
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
    this.router.navigate(['/teams']);
  }
}
