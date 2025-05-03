import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReclamationService } from '../reclamation.service';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {

  reclamations: any[] = [];
  filteredReclamations: any[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  
  searchTerm: string = '';  
  sortBy: string = 'date'; // Champ par défaut pour le tri
  sortOrder: string = 'asc'; // 'asc' ou 'desc'

  constructor(
    private dialog: MatDialog,
    private reclamationService: ReclamationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAll();
  }

  getAll() {
    this.reclamationService.getAll().subscribe(
      (data) => {
        this.reclamations = data as any[];
        this.applyFilters(); // Appliquer recherche et tri
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching reclamations:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilters() {
    let filtered = this.reclamations;
  
    // 🔍 Recherche sur toutes les colonnes
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(reclamation =>
        Object.values(reclamation).some(value =>
          value != null && value !== undefined && value.toString().toLowerCase().includes(searchLower)

        )
      );
    }
  
    // 🔀 Tri des résultats
    filtered.sort((a, b) => {
      let valueA = a[this.sortBy];
      let valueB = b[this.sortBy];
  
      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();
  
      return this.sortOrder === 'asc' ? (valueA > valueB ? 1 : -1) : (valueA < valueB ? 1 : -1);
    });
  
    this.filteredReclamations = filtered;
  }
  

  // 📌 Méthodes pour mettre à jour recherche et tri
  onSearchChange() {
    this.applyFilters();
  }

  onSortChange(sortBy: string) {
    if (this.sortBy === sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Inverser l'ordre
    } else {
      this.sortBy = sortBy;
      this.sortOrder = 'asc'; // Réinitialiser à ascendant
    }
    this.applyFilters();
  }

  deleteReclamation(id: number) {
    if (confirm('Are you sure you want to delete this reclamation?')) {
      this.reclamationService.delete(id).subscribe(
        () => {
          this.toastr.success('Reclamation deleted successfully');
          this.getAll();
        },
        (error) => {
          console.error('Error deleting reclamation:', error);
        }
      );
    }
  }

  addReclamation() {
    this.router.navigate(['/add-reclamation']);
  }

  editReclamation(id: number) {
    this.router.navigate(['/edit-reclamation', id]);
  }
 
  markAsResolved(id: number) {
    this.reclamationService.markAsResolved(id).subscribe(() => {
      this.toastr.success('Reclamation marked as resolved');
      this.getAll();
    });
  }

  markAsUnresolved(id: number) {
    this.reclamationService.markAsUnresolved(id).subscribe(() => {
      this.toastr.warning('Reclamation marked as unresolved');
      this.getAll();
    });
  }
}
