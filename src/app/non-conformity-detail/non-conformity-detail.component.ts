import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { ActionCorrective, Inspection, NonConformity } from 'src/models/Inspection.model';
import { NonconformityService } from '../services/nonconformity.service';

@Component({
  selector: 'app-non-conformity-detail',
  templateUrl: './non-conformity-detail.component.html',
  styleUrls: ['./non-conformity-detail.component.css']
})
export class NonConformityDetailComponent implements OnInit {
  nonConformity?: NonConformity; // Déclaration de la variable pour stocker les détails de la non-conformité
  inspection?: Inspection;
  page: number = 1;
  itemsPerPage: number = 5;

 
  statusFilter: string = ''; 
  actionCorrective!: ActionCorrective[];



  
  constructor(
    private route: ActivatedRoute,
    private nonConformityService: NonconformityService,
    private router: Router,
    private actionCorrectiveService: ActionCorrectiveService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // Récupérer l'ID depuis l'URL
    this.loadNonConformity(id); // Charger les détails de la non-conformité
  }

  loadNonConformity(id: number): void {
    // Requête pour récupérer les données de la non-conformité
    this.nonConformityService.getNonConformityById(id).subscribe(data => {
      this.nonConformity = data; // Récupérer les données de la non-conformité
      this.actionCorrective = data.actionCorrective || []; // Assigner les actions correctives
    });
  }

  editAction(actionId: number): void {
    this.router.navigate(['/edit-action', actionId]);
  }
  filteredActionCorrective(): ActionCorrective[] {
    if (!this.statusFilter) {
      return this.actionCorrective;  // No filter applied, return all non-conformities
    }
    return this.actionCorrective.filter(action =>
      action.statusActionCorrective.toLowerCase().includes(this.statusFilter.toLowerCase())
    );
  }
  
  deleteAction(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this Corrective Action?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actionCorrectiveService.deleteAction(id).subscribe(() => {
          Swal.fire('Deleted!', 'The Corrective Action has been deleted.', 'success');
          const nonConformityId = this.nonConformity?.idNC;
          if (nonConformityId) {
            this.loadNonConformity(nonConformityId); // Recharger les données de la non-conformité après suppression
          }
        });
      }
    });
  }

  goToAddAction(id: number) {
    this.router.navigate(['/nonConformities', id, 'add-action']);
  }
  goToDeails(id: number) {
    this.router.navigate(['/action-detail', id]);
  }
}
