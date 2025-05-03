// google-callback.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-google-callback',
  template: `<p>Connexion en cours...</p>`,
})
export class GoogleCallbackComponent implements OnInit {
  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        // Ici, vous pouvez appeler votre API pour échanger le code contre un token JWT
        this.userService.exchangeCodeForToken(code).subscribe(response => {
          if (response.token) {
            localStorage.setItem('jwtToken', response.token);
            // Redirection vers la page d'accueil ou autre en fonction du rôle
            // this.router.navigate(['/home']);
          }
        });
      }
    });
  }
}