/*import { Component } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { User,Role } from '../Model/User.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-admin-add',
  templateUrl: './user-admin-add.component.html',
  styleUrls: ['./user-admin-add.component.css']
})
export class UserAdminADDComponent {
  constructor(private userService: UserService) {}

  onSubmit(form: NgForm) {
      const newUser: User = {
          emailU: form.value.email,
          motdepasseU: form.value.motdepasse,
          nomU: form.value.nom,
          prenomU: form.value.prenom,
          role: form.value.role as Role, // Récupérer le rôle
          salaireU: form.value.salaire // Récupérer le salaire
      };

      this.userService.addUser(newUser).subscribe(
          response => {
              console.log('Utilisateur ajouté:', response);
              alert('Utilisateur ajouté avec succès !'); // Alerte de succès
              form.reset(); // Réinitialiser le formulaire
          },
          error => {
              console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
              alert('Erreur lors de l\'ajout de l\'utilisateur.'); // Alerte d'erreur
          }
      );
  }

}*/
import { Component } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { User, Role } from '../Model/User.model';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-admin-add',
  templateUrl: './user-admin-add.component.html',
  styleUrls: ['./user-admin-add.component.css']
})
export class UserAdminADDComponent {
  constructor(private userService: UserService,public dialogRef: MatDialogRef<UserAdminADDComponent>) {}

  onSubmit(form: NgForm) {
    const newUser: User = {
      emailU: form.value.email,
      motdepasseU: form.value.motdepasse,
      nomU: form.value.nom,
      prenomU: form.value.prenom,
      role: form.value.role as Role, 
      salaireU: form.value.salaire 
    };

    this.userService.addUser(newUser).subscribe(
      response => {
        console.log('Utilisateur ajouté:', response);
        alert('Utilisateur ajouté avec succès !'); 
        form.reset(); 
        this.dialogRef.close(); 
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
        alert('Erreur lors de l\'ajout de l\'utilisateur.'); 
      }
    );
  }
}
