import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from '../services/rapport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-rapport',
  templateUrl: './update-rapport.component.html',
  styleUrls: ['./update-rapport.component.css']
})
export class UpdateRapportComponent implements  OnInit {
  rapportForm!: FormGroup;
  selectedFile: File | null = null;
  rapportId!: number;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private rapportService: RapportService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rapportId = Number(this.route.snapshot.paramMap.get('id'));

    this.rapportForm = this.fb.group({
      contenu: ['', Validators.required],
      dateCreation: ['', Validators.required]
    });

    this.loadRapportData();
  }

  // Charger les données existantes du rapport
  loadRapportData(): void {
    this.rapportService.getRapportById(this.rapportId).subscribe({
      next: (rapport) => {
        this.rapportForm.patchValue({
          contenu: rapport.contenu,
          dateCreation: rapport.dateCreation
        });

        if (rapport.photoVideo) {
          this.imagePreview = 'data:image/jpeg;base64,' + rapport.photoVideo;
        }
      },
      error: () => {
        Swal.fire('Erreur', 'Impossible de charger le rapport.', 'error');
      }
    });
  }

  // Gestion du fichier sélectionné
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (file) {
      if (file.size > maxSize) {
        Swal.fire('Erreur', 'Le fichier dépasse la limite de 50MB.', 'error');
        this.selectedFile = null;
      } else {
        this.selectedFile = file;

        // Affichage de l'aperçu de l'image
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Mise à jour du rapport
  updateRapport(): void {
    if (this.rapportForm.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs correctement.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('Contenu', this.rapportForm.value.contenu);
    formData.append('dateCreation', this.rapportForm.value.dateCreation);

    if (this.selectedFile) {
      formData.append('PhotoVideo', this.selectedFile);
    }

    this.rapportService.updateRapport(this.rapportId, formData).subscribe({
      next: () => {
        Swal.fire('Succès', 'Rapport mis à jour avec succès !', 'success');
        this.router.navigate(['/rapport-detail', this.rapportId]);
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour :", err);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour.', 'error');
      }
    });
  }
}