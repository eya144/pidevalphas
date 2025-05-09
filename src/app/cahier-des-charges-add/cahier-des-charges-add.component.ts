import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cahier-des-charges-add',
  templateUrl: './cahier-des-charges-add.component.html',
  styleUrls: ['./cahier-des-charges-add.component.css']
})
export class CahierDesChargesAddComponent implements OnInit {
  cahierForm: FormGroup;
  projects: any[] = []; // Liste des projets récupérés de l'API
  errorMessage: string = '';
  architecteId: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.cahierForm = this.fb.group({
      architecteId: ['', Validators.required],
      projetId: ['', Validators.required],  // Champ pour stocker le projet sélectionné
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      pdfData: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.architecteId = this.route.snapshot.paramMap.get('architecteId');
    if (this.architecteId) {
      this.cahierForm.patchValue({ architecteId: this.architecteId });
    }
    this.loadProjects(); // Charger la liste des projets
  }

  loadProjects() {
    this.http.get<any[]>('http://localhost:8090/pidev/Projet/getAllProjets').subscribe(
      data => { this.projects = data;
        console.log("Projets chargés :", data); // Vérifier les données reçues
       
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors du chargement des projets:', error);
      }
    );
  }
  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.cahierForm.patchValue({ pdfData: file });
    } else {
      Swal.fire({ icon: 'error', title: 'Invalid file type', text: 'Please select a valid PDF file.' });
    }
  }

  submitForm() {

    const architecteId = this.cahierForm.get('architecteId')?.value;
    const projetId = this.cahierForm.get('projetId')?.value;

  console.log("UserID envoyé: ", architecteId);
  console.log("ProjetID envoyé: ", projetId)
    if (this.cahierForm.invalid) {
      Swal.fire({ icon: 'error', title: 'Form Error', text: 'Please fill in all required fields correctly.' });
      return;
    }

    const formData = new FormData();
    formData.append('titre', this.cahierForm.get('titre')?.value);
    formData.append('description', this.cahierForm.get('description')?.value);
    formData.append('pdfData', this.cahierForm.get('pdfData')?.value);

 

    this.http.post(`http://localhost:8090/pidev/api/cahier-de-charge/create-with-pdf/${architecteId}/${projetId}`, formData)
    .subscribe(
      (response: any) => {
        Swal.fire({ icon: 'success', title: 'Document Added', text: response.message })
          .then(() => this.router.navigate([`/cahierspararchitecte/${architecteId}`]));
      },
      (error: HttpErrorResponse) => {
        Swal.fire({ icon: 'error', title: 'Error', text: error.error?.message || 'Erreur lors de l\'ajout du document' });
      }
    );
}}