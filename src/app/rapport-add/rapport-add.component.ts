import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from '../services/rapport.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rapport-add',
  templateUrl: './rapport-add.component.html',
  styleUrls: ['./rapport-add.component.css']
})
export class RapportAddComponent implements OnInit {
  idInspection!: number;
  rapportForm!: FormGroup;
  fileError: string | null = null;
  today: string = new Date().toISOString().split('T')[0]; // Date d'aujourd'hui

  constructor(
    private route: ActivatedRoute,
    private rapportService: RapportService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idInspection = Number(this.route.snapshot.paramMap.get('id'));

    // 🔹 Définition du formulaire avec validations
    this.rapportForm = this.fb.group({
      contenu: ['', [Validators.required, Validators.minLength(10)]], // Contenu obligatoire, min 10 caractères
      dateCreation: [this.today, [Validators.required, this.dateValidator.bind(this)]], // Date obligatoire et valide
      photoVideo: [null] // Fichier optionnel
    });
  }

  // 📌 Validation de la date (ne peut pas être inférieure à aujourd'hui)
  dateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Supprime l'heure pour comparer uniquement la date

    return selectedDate == today ? { invalidDate: true } : null;
  }

  // 📌 Vérification de la taille du fichier
  onFileChange(event: any) {
    const file = event.target.files[0];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (file && file.size > maxSize) {
      this.fileError = 'Le fichier dépasse la limite de 50MB.';
      this.rapportForm.patchValue({ photoVideo: null });
    } else {
      this.fileError = null;
      this.rapportForm.patchValue({ photoVideo: file });
    }
  }

  // 📌 Soumission du formulaire
  submitRapport() {
    if (this.rapportForm.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs correctement.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('Contenu', this.rapportForm.value.contenu);
    formData.append('dateCreation', this.rapportForm.value.dateCreation);
    if (this.rapportForm.value.photoVideo) {
      formData.append('PhotoVideo', this.rapportForm.value.photoVideo);
    }

    this.rapportService.addRapport(this.idInspection, formData).subscribe(
      () => {
        Swal.fire('Succès', 'Rapport ajouté avec succès !', 'success');
        this.router.navigate(['/inspections']); // Redirection après ajout
      },
      (error) => {
        Swal.fire('Erreur', 'Une erreur est survenue lors de l’ajout du rapport.', 'error');
        console.error('Erreur lors de l’ajout du rapport', error);
      }
    );
  }
}
