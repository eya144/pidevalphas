import { Component, OnInit } from '@angular/core';
import { CahierDesChargesServiceService } from '../services/cahier-des-charges-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatecahier',
  templateUrl: './updatecahier.component.html',
  styleUrls: ['./updatecahier.component.css']
})export class UpdatecahierComponent implements OnInit {
  cahier: any = { titre: '', description: '', pdfData: null };
  id: number = 0;
  pdfFile: File | null = null;
  loading: boolean = true; // Ajout du loader


  constructor(private route: ActivatedRoute, private cahierService: CahierDesChargesServiceService, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.cahierService.getCahierById(this.id).subscribe(
      data => {
        console.log("Données récupérées:", data); // 🔍 Debug
        if (data) {
          this.cahier = data; // Assigner les données reçues
        }
        this.loading = false;
      },
      error => {
        console.error('Erreur de chargement du cahier:', error);
        Swal.fire('Erreur', 'Impossible de charger le cahier de charge.', 'error');
        this.loading = false;
      }
    );
  }
  
  onFileSelected(event: any): void {
    this.pdfFile = event.target.files[0];
  }

  updateCahier(): void {
    const formData = new FormData();
    formData.append('titre', this.cahier.titre);
    formData.append('description', this.cahier.description);
    if (this.pdfFile) {
      formData.append('pdfData', this.pdfFile);
    }

    this.cahierService.updateCahier(this.id, formData).subscribe(
      () => {
        Swal.fire('Success', 'Cahier updated successfully!', 'success');
        this.router.navigate([`/`]);
      },
      error => Swal.fire('Error', 'Update failed!', 'error')
   
    );
  }
}


