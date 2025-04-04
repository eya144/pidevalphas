import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-listecahierpararchitect',
  templateUrl: './listecahierpararchitect.component.html',
  styleUrls: ['./listecahierpararchitect.component.css']
})
export class ListecahierpararchitectComponent implements OnInit {
  architecteId: string | null = null;
  cahiers: any[] = [];
  filteredCahiers: any[] = [];
  noCahiers: boolean = false;
  searchQuery: string = "";

  // Pagination
  page: number = 1;
  pageSize: number = 5;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.architecteId = this.route.snapshot.paramMap.get('architecteId');
    if (this.architecteId) {
      this.loadCahiersByArchitecte();
    }
  }

  loadCahiersByArchitecte() {
    this.http.get<any[]>(`http://localhost:8083/pidev/api/cahier-de-charge/getByArchitecte/${this.architecteId}`)
      .subscribe(data => {
        this.cahiers = data;
        this.filteredCahiers = data;
        this.noCahiers = this.cahiers.length === 0;
      }, error => {
        console.error('Error loading cahiers:', error);
        this.noCahiers = true;
      });
  }

  viewPdf(id: number) {
    const pdfUrl = `http://localhost:8083/pidev/api/cahier-de-charge/view-pdf/${id}`;
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
        this.http.delete(`http://localhost:8083/pidev/api/cahier-de-charge/delete/${id}`)
          .subscribe(() => {
            this.cahiers = this.cahiers.filter(c => c.id !== id);
            this.filteredCahiers = this.filteredCahiers.filter(c => c.id !== id);
            Swal.fire('Deleted!', 'The Cahier de Charge has been deleted.', 'success');
          }, error => {
            console.error("Error deleting cahier:", error);
            Swal.fire('Error!', 'There was an error deleting the Cahier de Charge.', 'error');
          });
      }
    });
  }

  editCahier(id: number) {
    this.router.navigate([`/editcahier/${id}`]);
  }

  searchCahiers() {
    this.filteredCahiers = this.cahiers.filter(cahier => 
      cahier.titre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      cahier.projetNom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addCahier() {
    this.router.navigate([`/cahiercharge/${this.architecteId}`]);
  }
}
