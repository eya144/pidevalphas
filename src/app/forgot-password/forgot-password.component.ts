import { Component } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  email: string = '';
  code: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(private userService: UserService,private router: Router) {}

  // Méthode pour demander un code de vérification
  requestVerificationCode() {
    this.userService.forgotPassword(this.email).subscribe(
      response => {
        this.message = response; // Message de succès
      },
      error => {
        this.message = 'Erreur lors de l\'envoi du code de vérification.'; // Message d'erreur
        console.error('Erreur:', error);
      }
    );
  }

  // Méthode pour réinitialiser le mot de passe
  onSubmit() {
    if (!this.email || !this.code || !this.newPassword) {
      this.message = 'Veuillez remplir tous les champs.';
      return;
    }
  
    this.userService.resetPassword(this.email, this.code, this.newPassword,).subscribe(
      response => {
        // Vérifiez si la réponse est un message texte ou un objet
        if (typeof response === 'string') {
          this.message = response; // Afficher le message de succès
        } else if (response.message) {
          this.message = response.message; // Afficher le message de succès
        } else {
          this.message = 'Mot de passe réinitialisé avec succès.';
        }
        this.router.navigate(['/login']);
         // Redirection vers la page de connexion après un succès
        
      },
      error => {
        this.message = 'Erreur lors de la réinitialisation du mot de passe.'; // Message d'erreur
        console.error('Erreur:', error);
      }
    );
  }
}