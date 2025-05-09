import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-allcahierdecharge',
  templateUrl: './liste-allcahierdecharge.component.html',
  styleUrls: ['./liste-allcahierdecharge.component.css']
})
export class ListeAllcahierdechargeComponent implements OnInit {

  cahiers: any[] = [];
  filteredCahiers: any[] = [];
  noCahiers: boolean = false;
  searchQuery: string = "";

  // Pagination
  page: number = 1;
  pageSize: number = 5;

  // Pour gérer l'affichage du spinner
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadCahiersByArchitecte();
  }
  loadCahiersByArchitecte() {
    this.isLoading = true;
    this.http.get<any[]>(`http://localhost:8090/pidev/api/cahier-de-charge/getAll`)
      .subscribe((data: any[]) => {
        this.cahiers = data;
        this.filteredCahiers = data;
        this.isLoading = false;
      }, (error: any) => {
        console.error('Error loading cahiers:', error);
        this.noCahiers = true;
        this.isLoading = false;
      });
  }
  

  // Méthode de recherche par nom d'utilisateur (Architecte)
  searchCahiers() {
    if (this.searchQuery.trim() === '') {
      this.filteredCahiers = this.cahiers; // Affiche tous les cahiers si la recherche est vide
    } else {
      this.filteredCahiers = this.cahiers.filter(cahier => {
        return cahier.user?.nom.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  }

  viewPdf(id: number) {
    const pdfUrl = `http://localhost:8090/pidev/api/cahier-de-charge/view-pdf/${id}`;
    window.open(pdfUrl, '_blank');
  }

  deleteCahier(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8090/pidev/api/cahier-de-charge/delete/${id}`)
          .subscribe(() => {
            this.cahiers = this.cahiers.filter(c => c.id !== id);
            this.filteredCahiers = this.filteredCahiers.filter(c => c.id !== id);
            Swal.fire('Deleted!', 'The Cahier de Charge has been deleted.', 'success');
          }, (error: any) => {
            console.error("Error deleting cahier:", error);
            Swal.fire('Error!', 'There was an error deleting the Cahier de Charge.', 'error');
          });
      }
    });
  }

  validerCahier(id: number) {
    this.http.put(`http://localhost:8090/pidev/api/cahier-de-charge/valider/${id}`, {})
      .subscribe(() => {
        Swal.fire('Success', 'Document validated!', 'success');
        this.loadCahiersByArchitecte();
      }, error => {
        Swal.fire('Erreur', 'Error while validation', 'error');
      });
  }
  
}
