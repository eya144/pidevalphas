import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../ServiceUser/user.service';

@Component({
  selector: 'app-auth-callback',
  template: `<p>Authentification en cours...</p>`,
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        this.userService.exchangeCodeForToken(code).subscribe(
          response => {
            if (response.token) {
              localStorage.setItem('jwtToken', response.token);
              this.router.navigate(['/home']); // Redirection après authentification réussie
            } else {
              console.error("❌ Aucun token reçu !");
              this.router.navigate(['/login']);
            }
          },
          error => {
            console.error('❌ Échec de la connexion avec Google', error);
            this.router.navigate(['/login']);
          }
        );
      }
    });
  }
}
