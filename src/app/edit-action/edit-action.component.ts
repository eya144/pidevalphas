import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { ActionCorrective, NonConformity, StatusInspection } from '../models/Inspection.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.css']
})
export class EditActionComponent implements OnInit {
  todayDate: string = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
  nonConformity?: NonConformity;
  action: ActionCorrective = {
    idAC: null as any,
    description: '',
    dateDebut: this.todayDate,  // Ensure it's formatted correctly
    dateFin: this.todayDate,    // Ensure it's formatted correctly
    statusActionCorrective: StatusInspection.Canceled
  };

  statusOptions = Object.values(StatusInspection);

  dateDebutInvalid: boolean = false;
  endDateInvalid: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private actionService: ActionCorrectiveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.actionService.getActionById(id).subscribe(data => {
        this.action = data;
        
        // Ensure the dates are in the correct format (yyyy-MM-dd) for the input type="date"
        this.action.dateDebut = this.formatDate(this.action.dateDebut);
        this.action.dateFin = this.formatDate(this.action.dateFin);
      });
    }
  }

  // Function to ensure the date is formatted as yyyy-MM-dd
  formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format to yyyy-MM-dd
  }


  updateAction(): void {
    // Valider les dates
    if (new Date(this.action.dateDebut) < new Date(this.todayDate)) {
      this.dateDebutInvalid = true;
      return;
    } else {
      this.dateDebutInvalid = false;
    }
  
    if (new Date(this.action.dateFin) <= new Date(this.action.dateDebut)) {
      this.endDateInvalid = true;
      return;
    } else {
      this.endDateInvalid = false;
    }
  
    this.actionService.updateAction(this.action.idAC, this.action).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Action updated successfully!',
          showConfirmButton: false,
          timer: 2000
        });
  
        // Rediriger vers la page de détails de la non-conformité après la mise à jour
        this.router.navigate(['/action-detail', this.action.idAC]);

      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while updating the action.',
        });
        console.error('Error while updating action:', error);
      }
    );
  }
  
}

