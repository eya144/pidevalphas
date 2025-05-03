/*import { Component } from '@angular/core';
import { UserService } from '../ServiceUser/user.service'; // Assurez-vous que le chemin est correct
import { User, Role } from '../Model/User.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  errorMessages: string[] = []; 
  captchaResponse: string | null = null;
  constructor(private userService: UserService,private router: Router) {}
  resolvedCaptcha(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    console.log('reCAPTCHA response:', this.captchaResponse);
  }


  onSubmit(form: NgForm) {
    this.errorMessages = []; 
    
    if (!form.value.prenom) {
      this.errorMessages.push('Le prénom est requis.');
    }

    if (!form.value.nom) {
      this.errorMessages.push('Le nom est requis.');
    }

    if (!form.value.emailu) {
      this.errorMessages.push('L\'email est requis.');
    } else if (!this.validateEmail(form.value.emailu)) {
      this.errorMessages.push('Veuillez entrer un email valide.');
    }

    if (!form.value.motdepasseu) {
      this.errorMessages.push('Le mot de passe est requis.');
    } else if (form.value.motdepasseu.length < 6) {
      this.errorMessages.push('Le mot de passe doit contenir au moins 6 caractères.');
    } else if (!this.validatePassword(form.value.motdepasseu)) {
      this.errorMessages.push('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.');
    }

    if (form.value.motdepasseu !== form.value.confirmPassword) {
      this.errorMessages.push('Les mots de passe ne correspondent pas.');
    }
    if (!this.captchaResponse) {
      this.errorMessages.push('Veuillez valider le reCAPTCHA.');
    }


    
    if (this.errorMessages.length > 0) {
      alert(this.errorMessages.join('\n')); 
      return; 
    }

    
    const newUser: User = {
      emailU: form.value.emailu,
      motdepasseU: form.value.motdepasseu,
      nomU: form.value.nom,
      prenomU: form.value.prenom,
      role: Role.USER, 
      salaireU: 0   
    };

    
    this.userService.addUser(newUser).subscribe(
      response => {
        console.log('Utilisateur ajouté:', response);
        alert('Utilisateur ajouté avec succès !'); 
        form.reset();
        this.router.navigate(['/login']); 
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
        alert('Erreur lors de l\'ajout de l\'utilisateur.'); 
      }
    );
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordPattern.test(password);
  }
}*/
import { Component } from '@angular/core';
import { UserService } from '../ServiceUser/user.service'; // Assurez-vous que le chemin est correct
import { User, Role } from '../Model/User.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  errorMessages: string[] = []; 
  captchaResponse: string | null = null;
  siteKey: string = '6Le52MMpAAAAADqeKWivBt7WBVNhdbxfuTacYRrH'; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }



  resolvedCaptcha(token: string) {
    this.captchaResponse = token; // Stocke le token reçu
    console.log("reCAPTCHA Token:", token);
  }
  

  onSubmit(form: NgForm) {
    this.errorMessages = []; 
    
    // Validation des champs du formulaire
    if (!form.value.prenom) {
      this.errorMessages.push('Le prénom est requis.');
    }

    if (!form.value.nom) {
      this.errorMessages.push('Le nom est requis.');
    }

    if (!form.value.emailu) {
      this.errorMessages.push('L\'email est requis.');
    } else if (!this.validateEmail(form.value.emailu)) {
      this.errorMessages.push('Veuillez entrer un email valide.');
    }

    if (!form.value.motdepasseu) {
      this.errorMessages.push('Le mot de passe est requis.');
    } else if (form.value.motdepasseu.length < 6) {
      this.errorMessages.push('Le mot de passe doit contenir au moins 6 caractères.');
    } else if (!this.validatePassword(form.value.motdepasseu)) {
      this.errorMessages.push('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.');
    }

    if (form.value.motdepasseu !== form.value.confirmPassword) {
      this.errorMessages.push('Les mots de passe ne correspondent pas.');
    }

    if (!this.captchaResponse) {
      this.errorMessages.push('Veuillez valider le reCAPTCHA.');
    }

    // Affiche les erreurs s'il y en a
    if (this.errorMessages.length > 0) {
      alert(this.errorMessages.join('\n')); 
      return; 
    }

    // Création de l'objet utilisateur
    const newUser: User = {
      emailU: form.value.emailu,
      motdepasseU: form.value.motdepasseu,
      nomU: form.value.nom,
      prenomU: form.value.prenom,
      role: Role.USER, 
      salaireU: 0   
    };

    // Appel à la méthode d'ajout avec reCAPTCHA
    if (this.captchaResponse) {
      this.userService.addUserWithCaptcha(newUser, this.captchaResponse).subscribe(
        response => {
          console.log('Utilisateur ajouté:', response);
          alert('Utilisateur ajouté avec succès !'); 
          form.reset();
          this.router.navigate(['/login']); 
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
          alert('Erreur lors de l\'ajout de l\'utilisateur.'); 
        }
      );
    } else {
      alert('Erreur : reCAPTCHA non validé.');
    }
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordPattern.test(password);
  }
 
}