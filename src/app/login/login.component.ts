import { Component } from '@angular/core';
import { UserService } from '../ServiceUser/user.service'; // Importez le service
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailU: string = ''; 
  motdepasseU: string = ''; 

  constructor(private userService: UserService, private router: Router) { }
      login(): void {
        const user = { emailU: this.emailU, motdepasseU: this.motdepasseU };
      
        this.userService.login(user).subscribe(
          response => {
            console.log('Réponse du backend:', response); 
            if (response.token) {
              localStorage.setItem('jwtToken', response.token);
              console.log("✅ Token stocké:", localStorage.getItem('jwtToken')); 
              //this.router.navigate(['/home']); 
            } else {
              console.error("❌ Aucun token reçu !");
            }
          },
          error => {
            console.error('❌ Login failed', error);
            alert('Invalid credentials');
          }
        );
      }
      loginWithGoogle(): void {
        this.userService.loginWithGoogle(); // Appel du service pour rediriger vers Google
      }
      onForgotPassword(): void {
        this.router.navigate(['/forgot-password']); // Redirige vers la page de réinitialisation
      }
      logout() {
        this.userService.logout(); 
        this.router.navigate(['/login']); 
      }
      

}
