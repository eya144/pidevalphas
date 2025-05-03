/*import { Component, Inject } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { User, Role } from '../Model/User.model';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-user-admin-update',
    templateUrl: './user-admin-update.component.html',
    styleUrls: ['./user-admin-update.component.css']
})
export class UserAdminUpdateComponent {
    constructor(
        private userService: UserService,
        public dialogRef: MatDialogRef<UserAdminUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User // Recevoir les données de l'utilisateur
    ) {}

    onSubmit(form: NgForm) {
      const updatedUser: User = {
          idU: this.data.idU, // Assurez-vous d'inclure l'ID de l'utilisateur
          emailU: form.value.email,
          motdepasseU: form.value.motdepasse,
          nomU: form.value.nom,
          prenomU: form.value.prenom,
          role: form.value.role as Role,
          salaireU: form.value.salaire
      };
  
      if (updatedUser.idU !== undefined) {
        this.userService.updateUser(updatedUser.idU, updatedUser).subscribe(
            response => {
                console.log('Utilisateur mis à jour:', response);
                alert('Utilisateur mis à jour avec succès !');
                this.dialogRef.close(); // Fermer le modal
            },
            error => {
                console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
                alert('Erreur lors de la mise à jour de l\'utilisateur.');
            }
        );
    } else {
        alert('L\'ID de l\'utilisateur est introuvable.');
    }
  }
}*/
import { Component, Inject } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { User, Role } from '../Model/User.model';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-user-admin-update',
    templateUrl: './user-admin-update.component.html',
    styleUrls: ['./user-admin-update.component.css']
})
export class UserAdminUpdateComponent {
    updatedUser: User; 

    constructor(
        private userService: UserService,
        public dialogRef: MatDialogRef<UserAdminUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User // NE5O DONées mta3 user
    ) {
        
        this.updatedUser = { ...data };
    }

    onSubmit(form: NgForm) {
        if (this.updatedUser.idU !== undefined) {
            this.userService.updateUser(this.updatedUser.idU, this.updatedUser).subscribe(
                response => {
                    console.log('Utilisateur mis à jour:', response);
                    alert('Utilisateur mis à jour avec succès !');
                    this.dialogRef.close(); 
                },
                error => {
                    console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
                    alert('Erreur lors de la mise à jour de l\'utilisateur.');
                }
            );
        } else {
            alert('L\'ID de l\'utilisateur est introuvable.');
        }
    }
}