import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjetService } from '../projet.service';

@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html'
})
export class AddProjetComponent {
  projetForm: FormGroup;
  message: string = '';
  messageType: string = '';

  constructor(private fb: FormBuilder, private projetService: ProjetService) {
    this.projetForm = this.fb.group({
      nom: [''],
      description: [''],
      typeProjet: [''],
      status: [''],
      budgetInitial: [500000],
      dateDebut: [''],
      dateFinPrevue: [''],
      dateFinReelle: [''],
      adresse: [''],
      latitude: [''],
      longitude: [''],
      maitreOuvrage: [''],
      maitreOeuvre: [''],
      entrepreneurPrincipal: [''],
      chefProjetId: [''],
      permisConstruction: [false],
      progression: [45],
      risquesIdentifies: [''],
      contraintes: [''],
      missions: [''],
      membresEquipeIds: ['']
    });
  }

  ajouterProjet(): void {
    if (this.projetForm.valid) {
      const formData = this.projetForm.value;
      
      // Convertir les dates du format "jj/mm/aaaa" en format ISO "yyyy-mm-dd"
      formData.dateDebut = this.convertDateToIso(formData.dateDebut);
      formData.dateFinPrevue = this.convertDateToIso(formData.dateFinPrevue);
      
      // Conversion explicite des champs numériques
      formData.budgetInitial = Number(formData.budgetInitial);
      formData.latitude = Number(formData.latitude);
      formData.longitude = Number(formData.longitude);
      formData.chefProjetId = Number(formData.chefProjetId);
      formData.progression = Number(formData.progression);
      
      // Convertir membresEquipeIds et missions si ce sont des chaînes
      if (typeof formData.membresEquipeIds === 'string') {
        formData.membresEquipeIds = formData.membresEquipeIds.split(',').map((id: string) => Number(id.trim()));
      }
      if (typeof formData.missions === 'string') {
        formData.missions = formData.missions.split(',').map((mission: string) => mission.trim());
      }
      
      // Affichez la charge utile dans la console pour débogage
      console.log('Payload envoyé:', formData);
      
      // Appel du service pour ajouter le projet
      this.projetService.ajouterProjet(formData).subscribe({
        next: () => {
          this.message = 'Projet ajouté avec succès !';
          this.messageType = 'success';
          this.projetForm.reset();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du projet :', error);
          this.message = `Erreur : ${error.error?.message || 'Impossible d\'ajouter le projet.'}`;
          this.messageType = 'danger';
        }
      });
    } else {
      this.message = 'Veuillez remplir tous les champs requis.';
      this.messageType = 'danger';
    }
  }
  
  // Fonction pour convertir une date du format "jj/mm/aaaa" au format ISO "yyyy-mm-dd"
  convertDateToIso(date: string): string {
    if (!date) {
      return '';
    }
    const [day, month, year] = date.split('/');
    // Crée un objet Date et retourne la partie date au format ISO
    const isoDate = new Date(+year, +month - 1, +day).toISOString().split('T')[0];
    return isoDate;
  }
}
