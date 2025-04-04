import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InspectionService } from '../services/inspection.service';
import { Inspection, NonConformity } from '../models/Inspection.model';
import { NonconformityService } from '../services/nonconformity.service.ts.service';
import Swal from 'sweetalert2';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { RapportService } from '../services/rapport.service';

@Component({
  selector: 'app-inspection-detail',
  templateUrl:'./inspection-detail.component.html',
  styleUrls: ['./inspection-detail.component.css']
})
export class InspectionDetailComponent implements OnInit {
  inspectionId!: number;
  inspection: Inspection | null = null;  // Déclare la variable inspection
  nonConformities: NonConformity[] = [];
  rapport: any;
  page: number = 1;
  itemsPerPage: number = 5; 
 
  statusFilter: string = '';  // To store the selected status filter
  

  constructor(
    private inspectionService: InspectionService,  private rapportService: RapportService,
    private route: ActivatedRoute,
    private nonconformityService: NonconformityService,

    public router: Router  // Déclare le router en public
  ) {}

  ngOnInit(): void {
    this.inspectionId = Number(this.route.snapshot.paramMap.get('id'));
 // Récupère l'ID de l'inspection
    this.loadInspectionDetails();
    this.loadNonConformities();
  }

  loadInspectionDetails(): void {
    this.inspectionService.getInspectionById(this.inspectionId).subscribe({
      next: (data) => {
        this.inspection = data; // Remplir les détails de l'inspection
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'inspection', err);
      }
    });
  }
    filteredNonConformities(): NonConformity[] {
    if (!this.statusFilter) {
      return this.nonConformities;  // No filter applied, return all non-conformities
    }
    return this.nonConformities.filter(nc =>
      nc.statutNonConfirm.toLowerCase().includes(this.statusFilter.toLowerCase())
    );
  }

  loadNonConformities(): void {
    this.inspectionService.getNonConformitiesByInspectionId(this.inspectionId).subscribe({
      next: (data) => {
        this.nonConformities = data; // Remplir le tableau des non-conformités
      },
      error: (err) => {
        console.error('Erreur lors du chargement des non-conformités', err);
      }
    });
  }

  navigateToAddNonConformity(): void {
    this.router.navigate(['/addnonconformity/' + this.inspectionId]);
  }
  generateRapport(inspectionId?: number): void {
    if (!inspectionId) {
      Swal.fire('Erreur', 'Impossible de générer le rapport : Inspection introuvable.', 'error');
      return;
    }
  
    this.rapportService.generateRapport(inspectionId).subscribe({
      next: (data) => {
        this.rapport = data;
        Swal.fire('Succès', 'Rapport généré avec succès !', 'success');
        this.router.navigate(['/rapport-detail', this.rapport.idR]);
      },
      error: () => {
        Swal.fire('Erreur', 'Impossible de générer le rapport.', 'error');
      }
    });
  }
  

    deleteNonConformity(id: number): void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this Non-Conformity?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          this.nonconformityService.deleteNonConformity(id).subscribe(() => {
            this.loadNonConformities();
            Swal.fire('Deleted!', 'The Non-Conformity has been deleted.', 'success');
          });
        }
      });
    }
  
  
  
  
  editNonConformity(id: number): void {
    this.router.navigate(['/NonConformityEdit', id]);


  }
  
  goToAddAction(id: number) {
    this.router.navigate(['/nonConformities', id, 'add-action']);
  }
  

  
}
