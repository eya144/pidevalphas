/*import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PresenceService } from '../servicesPresence/presence.service';
import { Presence } from '../Model/Presence.model';
import { User,Role } from  '../Model/User.model' // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-presence-modal',
  templateUrl: './presence-modal.component.html',
  styleUrls: ['./presence-modal.component.css']
})
export class PresenceModalComponent {
  newPresence: Presence = {
    dateP: new Date(),
    heureentre: '',
    heuresortie: '',
    user: {
      idU: 0,
      nomU: '',          // Valeur par défaut
      prenomU: '',      // Valeur par défaut
      emailU: '',       // Valeur par défaut
      motdepasseU: '',  // Valeur par défaut
      salaireU: 0,      // Valeur par défaut
      role: Role.EMPLOYE // Assignez un rôle par défaut si nécessaire
    }
  };
  presences: Presence[] = []; // Liste des présences

  constructor(
    public dialogRef: MatDialogRef<PresenceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private presenceService: PresenceService
  ) {
    this.newPresence.user.idU = data.userId; // Récupérer l'ID de l'utilisateur
  }

  addPresence(): void {
    if (this.newPresence.user.idU) {
      this.presenceService.addPresence(this.newPresence.user.idU, this.newPresence).subscribe(() => {
        this.dialogRef.close(true); // Fermer le modal et signaler un succès
      });
    } else {
      console.error('ID utilisateur est manquant');
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Fermer le modal sans action
  }

}*/
/*import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PresenceService } from '../servicesPresence/presence.service';
import { Presence } from '../Model/Presence.model';
import { User, Role } from '../Model/User.model';

@Component({
  selector: 'app-presence-modal',
  templateUrl: './presence-modal.component.html',
  styleUrls: ['./presence-modal.component.css']
})
export class PresenceModalComponent implements OnInit {
  newPresence: Presence = {
    dateP: new Date(),
    heureentre: '',
    heuresortie: '',
    user: {
      idU: 0,
      nomU: '',
      prenomU: '',
      emailU: '',
      motdepasseU: '',
      salaireU: 0,
      role: Role.EMPLOYE
    }
  };

  presences: Presence[] = []; // Liste des présences

  constructor(
    public dialogRef: MatDialogRef<PresenceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private presenceService: PresenceService
  ) {
    this.newPresence.user.idU = data.userId; // Récupérer l'ID de l'utilisateur
  }

  ngOnInit(): void {
    this.loadPresences(); // Charger les présences lors de l'initialisation
  }

  loadPresences(): void {
    const userId = this.newPresence.user.idU;
    if (userId !== undefined) {
      this.presenceService.getPresencesByUserId(userId).subscribe((data) => {
        this.presences = data; // Stocker les présences dans la variable
      });
    } else {
      console.error('ID utilisateur est manquant');
    }
  }

  addPresence(): void {
    if (this.newPresence.user.idU) {
      this.presenceService.addPresence(this.newPresence.user.idU, this.newPresence).subscribe(() => {
        this.loadPresences(); // Charger à nouveau les présences après ajout
        this.newPresence = { // Réinitialiser le formulaire
          dateP: new Date(),
          heureentre: '',
          heuresortie: '',
          user: {
            idU: this.newPresence.user.idU,
            nomU: '',
            prenomU: '',
            emailU: '',
            motdepasseU: '',
            salaireU: 0,
            role: Role.EMPLOYE
          }
        };
      });
    } else {
      console.error('ID utilisateur est manquant');
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Fermer le modal sans action
  }
}*/
/*import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PresenceService } from '../servicesPresence/presence.service';
import { Presence } from '../Model/Presence.model';
import { User, Role } from '../Model/User.model';

@Component({
  selector: 'app-presence-modal',
  templateUrl: './presence-modal.component.html',
  styleUrls: ['./presence-modal.component.css']
})
export class PresenceModalComponent implements OnInit {
  newPresence: Presence = {
    dateP: new Date(),
    heureentre: '',
    heuresortie: '',
    user: {
      idU: 0,
      nomU: '',
      prenomU: '',
      emailU: '',
      motdepasseU: '',
      salaireU: 0,
      role: Role.EMPLOYE
    }
  };

  presences: Presence[] = []; // Liste des présences

  constructor(
    public dialogRef: MatDialogRef<PresenceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private presenceService: PresenceService
  ) {
    this.newPresence.user.idU = data.userId; // Récupérer l'ID de l'utilisateur
  }

  ngOnInit(): void {
    this.loadPresences(); // Charger les présences lors de l'initialisation
  }

  loadPresences(): void {
    const userId = this.newPresence.user.idU;
    if (userId !== undefined) {
      this.presenceService.getPresencesByUserId(userId).subscribe((data) => {
        this.presences = data; // Stocker les présences dans la variable
      });
    } else {
      console.error('ID utilisateur est manquant');
    }
  }

  addPresence(): void {
    if (this.newPresence.user.idU) {
      this.presenceService.addPresence(this.newPresence.user.idU, this.newPresence).subscribe(() => {
        this.loadPresences(); // Charger à nouveau les présences après ajout
        this.resetForm(); // Réinitialiser le formulaire
      });
    } else {
      console.error('ID utilisateur est manquant');
    }
  }
  deletePresence(presenceId?: number): void {
    if (presenceId !== undefined) {
      this.presenceService.deletePresence(presenceId).subscribe(() => {
        this.loadPresences(); // Recharger la liste après suppression
        console.log('Présence supprimée avec succès');
      }, error => {
        console.error('Erreur lors de la suppression de la présence', error);
      });
    } else {
      console.error('ID de présence manquant');
    }
  }

  resetForm(): void {
    this.newPresence = {
      dateP: new Date(),
      heureentre: '',
      heuresortie: '',
      user: {
        idU: this.newPresence.user.idU,
        nomU: '',
        prenomU: '',
        emailU: '',
        motdepasseU: '',
        salaireU: 0,
        role: Role.EMPLOYE
      }
    };
  }

  onNoClick(): void {
    this.dialogRef.close(); // Fermer le modal sans action
  }
}*/
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PresenceService } from '../servicesPresence/presence.service';
import { Presence } from '../Model/Presence.model';
import { User, Role } from '../Model/User.model';

@Component({
  selector: 'app-presence-modal',
  templateUrl: './presence-modal.component.html',
  styleUrls: ['./presence-modal.component.css']
})
export class PresenceModalComponent implements OnInit {
  newPresence: Presence = {
    dateP: new Date(),
    heureentre: '',
    heuresortie: '',
    user: {
      idU: 0,
      nomU: '',
      prenomU: '',
      emailU: '',
      motdepasseU: '',
      salaireU: 0,
      role: Role.EMPLOYE
    }
  };

  presences: Presence[] = []; 
  editingPresenceId: number | null = null; 

  constructor(
    public dialogRef: MatDialogRef<PresenceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private presenceService: PresenceService
  ) {
    this.newPresence.user.idU = data.userId; 
  }

  ngOnInit(): void {
    this.loadPresences(); 
  }

  loadPresences(): void {
    const userId = this.newPresence.user.idU;
    if (userId !== undefined) {
      this.presenceService.getPresencesByUserId(userId).subscribe((data) => {
        this.presences = data; 
      });
    } else {
      console.error('ID utilisateur est manquant');
    }
  }
  
  addPresence(): void {
    if (this.newPresence.user.idU) {
      this.presenceService.addPresencewithoutHolidays(this.newPresence.user.idU, this.newPresence)
        .subscribe({
          next: () => {
            this.loadPresences(); 
            this.resetForm(); 
          },
          error: (error) => {
            if (error.status === 400 || error.status === 500) {
              alert("❌ " + error.error); // ici on affiche l'erreur du backend
            } else {
              console.error('Erreur inconnue lors de l’ajout de la présence :', error);
              alert("Une erreur est servenuce c est un jour ferie.");
            }
          }
        });
    } else {
      console.error('ID utilisateur est manquant');
    }
  }
  
  

  /*addPresence(): void {
    if (this.newPresence.user.idU) {
      this.presenceService.addPresence(this.newPresence.user.idU, this.newPresence).subscribe(() => {
        this.loadPresences(); 
        this.resetForm(); 
      });
    } else {
      console.error('ID utilisateur est manquant');
    }
  }*/

  /*editPresence(presence: Presence): void {
    this.newPresence = { ...presence }; // Charger les détails de la présence à éditer
    this.editingPresenceId = presence.idP !== undefined ? presence.idP : null; // Assurez-vous que c'est null si undefined
  }*//*editPresence(presence: Presence): void {
  this.newPresence = { 
    ...presence,
    dateP: new Date(presence.dateP) // Assurez-vous que dateP est un objet Date
  }; 
  this.editingPresenceId = presence.idP !== undefined ? presence.idP : null;
}*/

editPresence(presence: Presence): void {
  this.newPresence = { 
    ...presence,
    
  };
  this.editingPresenceId = presence.idP !== undefined ? presence.idP : null;
}


getFormattedDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
  updatePresence(): void {
    if (this.editingPresenceId !== null) {
      this.presenceService.updatePresence(this.editingPresenceId, this.newPresence).subscribe(() => {
        this.loadPresences(); 
        this.resetForm(); 
        this.editingPresenceId = null; 
      });
    }
  }

  deletePresence(presenceId: number): void {
    this.presenceService.deletePresence(presenceId).subscribe(() => {
      this.loadPresences(); 
      console.log('Présence supprimée avec succès');
    }, error => {
      console.error('Erreur lors de la suppression de la présence', error);
    });
  }

  resetForm(): void {
    this.newPresence = {
      dateP: new Date(),
      heureentre: '',
      heuresortie: '',
      user: {
        idU: this.newPresence.user.idU,
        nomU: '',
        prenomU: '',
        emailU: '',
        motdepasseU: '',
        salaireU: 0,
        role: Role.EMPLOYE
      }
    };
    this.editingPresenceId = null; 
  }

  onNoClick(): void {
    this.dialogRef.close(); 
  }
}
