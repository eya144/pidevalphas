import { Component, OnInit } from '@angular/core';
import { InspectionService } from '../services/inspection.service';
import { Router } from '@angular/router';
import { Inspection } from '../models/Inspection.model';
import Swal from 'sweetalert2';
import { RapportService } from '../services/rapport.service';


@Component({
  selector: 'app-listadmininspection',
  templateUrl: './listadmininspection.component.html',
  styleUrls: ['./listadmininspection.component.css']
})
export class ListadmininspectionComponent   implements OnInit {
  inspections: Inspection[] = [];
  rapport: any;
  page: number = 1; // Numéro de la page actuelle
  itemsPerPage: number = 5; 
  filteredInspections: Inspection[] = [];
  searchText: string = ''; // Champ de recherche

  constructor(private inspectionService: InspectionService, private rapportService: RapportService,private router: Router) {}

  ngOnInit(): void {
    this.getAllInspections();
  }


  getAllInspections(): void {
    this.inspectionService.getAllInspections().subscribe(data => {
      this.inspections = data;
      this.filteredInspections = data; // Initialisation avec toutes les inspections
    });
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

  showRapport(idRapport: number) {
    this.router.navigate(['/rapport-detail', idRapport]); // Affiche le rapport existant
  }
  // Modify the deleteInspection method to use SweetAlert
deleteInspection(id: number | undefined): void {
  if (id === undefined) {
    console.error('ID is undefined!');
    return;
  }

  

  // SweetAlert confirmation
  Swal.fire({
    title: 'Are you sure?',
    text: "This action cannot be undone.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Deleting the inspection
      this.inspectionService.deleteInspection(id).subscribe(() => {
        
        // Update the list after deletion
        this.getAllInspections();
        Swal.fire('Deleted!', 'The inspection has been deleted.', 'success');
      }, (error) => {
        Swal.fire('Error!', 'An error occurred during deletion.', 'error');
      });
    }
  });
}

  goToEdit(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/edit-inspection', id]);
    }
  }

  goToDetail(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/inspection-detail', id]);
    }
  }

  goToAddNonConformity(id: number) {
    this.router.navigate(['/addnonconformity', id]); // Redirection vers formulaire
  }

   // Fonction de recherche dynamique
   searchInspections(): void {
    if (this.searchText.trim() === '') {
      this.filteredInspections = this.inspections; // Si le champ de recherche est vide, afficher toutes les inspections
    } else {
      this.filteredInspections = this.inspections.filter(inspection =>
        inspection.projet?.nomProjet.toLowerCase().includes(this.searchText.toLowerCase()) ||
        inspection.user?.nom.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

}