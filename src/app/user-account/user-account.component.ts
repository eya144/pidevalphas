/*import { Component, OnInit } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { User } from '../Model/User.model';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  user: User | null = null;
  profileCompletion: number = 0;
  isVerified: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const userId = this.getCurrentUserId();
    console.log('ID de l\'utilisateur récupéré:', userId);
  
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        data => {
          this.user = data;
          console.log('Données de l\'utilisateur récupérées:', this.user);
        },
        error => {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
        }
      );
    } else {
      console.error('Aucun ID d\'utilisateur trouvé.');
    }
  }

  updateUser(): void {
    if (this.user && this.user.idU !== undefined) { // Vérifiez que idU est défini
      this.userService.updateUser(this.user.idU, this.user).subscribe(
        () => {
          alert('Profil mis à jour avec succès!');
        },
        error => {
          console.error('Erreur lors de la mise à jour du profil', error);
        }
      );
    } else {
      console.error('L\'utilisateur n\'est pas défini ou l\'ID est manquant');
    }
  }
  getCurrentUserId(): number | null {
    const token = localStorage.getItem('jwtToken');
    console.log('Token récupéré:', token); // Ajoutez ce log
  
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('Token décodé:', decoded); // Ajoutez ce log
      return decoded.id; // Vérifiez que 'id' existe dans le token décodé
    }
    
    return null;
  }
}*/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { User } from '../Model/User.model';
import { jwtDecode } from 'jwt-decode';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  user: User | null = null;
  profileCompletion: number = 0;
  isVerified: boolean = false;
  showCompletionForm: boolean = false; 
  showCheckIcon = false; // Variable pour contrôler l'affichage du formulaire

  constructor(private userService: UserService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUser();
    
  }

  loadUser(): void {
    const userId = this.getCurrentUserId();
    console.log('ID de l\'utilisateur récupéré:', userId);
  
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        data => {
          this.user = data;
          console.log('Données de l\'utilisateur récupérées:', this.user);
          this.getProfileCompletion();  // Récupérer la complétion du profil
        },
        error => {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
        }
      );
    } else {
      console.error('Aucun ID d\'utilisateur trouvé.');
    }
  }

  getProfileCompletion(): void {
    if (this.user && this.user.idU !== undefined) {
      this.userService.getProfileCompletion(this.user.idU).subscribe(
        (data) => {
          this.profileCompletion = data.completion;
          this.isVerified = data.verified;
          this.cdRef.detectChanges();
          
        if (this.profileCompletion === 100) {
          setTimeout(() => {
            this.showCheckIcon = true;
            this.cdRef.detectChanges();
          }, 2000);
        }
        },
        (error) => {
          console.error('Erreur lors de la récupération de la complétion du profil', error);
        }
      );
    }
  }

  updateUser(): void {
    if (this.user && this.user.idU !== undefined) { // Vérifiez que idU est défini
      this.userService.updateUser(this.user.idU, this.user).subscribe(
        () => {
          alert('Profil mis à jour avec succès!');
        },
        error => {
          console.error('Erreur lors de la mise à jour du profil', error);
        }
      );
    } else {
      console.error('L\'utilisateur n\'est pas défini ou l\'ID est manquant');
    }
  }

  getCurrentUserId(): number | null {
    const token = localStorage.getItem('jwtToken');
    console.log('Token récupéré:', token);
  
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('Token décodé:', decoded);
      return decoded.id;  // Vérifie que 'id' existe dans le token décodé
    }
    
    return null;
  }

  toggleCompletionForm(): void {
    this.showCompletionForm = !this.showCompletionForm;  // Toggle pour afficher/masquer le formulaire
  }
  updateUserProfile(): void {
    if (this.user && this.user.idU !== undefined) {
      this.userService.updateUserProfile(this.user.idU, this.user).subscribe(
        (response) => {
          console.log('Profil mis à jour avec succès!', response);
          // Après la mise à jour, récupérer la nouvelle progression du profil
          this.getProfileCompletion();
          alert('Profil mis à jour avec succès!');
        },
        error => {
          console.error('Erreur lors de la mise à jour du profil', error);
        }
      );
    } else {
      console.error('L\'utilisateur n\'est pas défini ou l\'ID est manquant');
    }
  }

  generateAvatar(userName: string): string {
    return `https://robohash.org/${userName}.png`; // URL de l'avatar généré
  }

  getAvatarUrl(): string | null {
    return this.user ? this.generateAvatar(this.user.nomU) : null;
  }
  
}
