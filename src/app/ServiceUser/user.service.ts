
import { Injectable,NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/User.model';
import { Router } from '@angular/router'; 
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8089/api/users'; 
  private timeout: any;

  constructor(private http: HttpClient,private ngZone: NgZone , private router: Router) { }

  
  private getToken(): string | null {
    return localStorage.getItem('jwtToken'); 
  }

  
  private createHeaders(): HttpHeaders {
    const token = this.getToken();
    console.log('JWT Token:', token);
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAll`, { headers: this.createHeaders() });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/get/${id}`, { headers: this.createHeaders() });
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/add`, user, { headers: this.createHeaders() });
  }

  updateUser(idU: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update/user/${idU}`, user, { headers: this.createHeaders() });
  }

  /*deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.createHeaders() });
  }*/
    deleteUser(userId: number, headers: HttpHeaders): Observable<any> {
      console.log('En-têtes de suppression:', headers);
      return this.http.delete<any>(`${this.baseUrl}/delete/${userId}`, { headers });
  }

  
 /* login(user: { emailU: string; motdepasseU: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
      tap(response => {
        if (response.token) { 
          localStorage.setItem('jwtToken', response.token); 
        }
      })
    );
  }*/
    login(user: { emailU: string; motdepasseU: string }): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/login`, user).pipe(
        tap(response => {
          if (response.token) { 
            localStorage.setItem('jwtToken', response.token); 
            
            // Décodez le token pour extraire le rôle
            const decoded: any = jwtDecode(response.token);
            console.log('Decoded Token:', decoded);
            const role = decoded.role;
  
            // Redirection en fonction du rôle
            if (role === 'ROLE_ADMIN') {
              console.log('Redirection vers le tableau de bord admin');
              
              this.router.navigate(['/dashboard_user']); // Rediriger vers le tableau de bord admin
            } else {
              console.log('Redirection vers la page d\'accueil');
              setTimeout(() => {
              this.router.navigate(['/home']);
            }, 100); // Rediriger vers la page d'accueil
            }
          }
        })
      );
    }
  logout(): void {
    localStorage.removeItem('jwtToken'); 
    console.log('Utilisateur déconnecté');
    this.router.navigate(['/login']);
  }
  startInactivityTimer() {
    this.resetTimer();
    document.body.addEventListener('mousemove', () => this.resetTimer());
    document.body.addEventListener('keypress', () => this.resetTimer());
  }

  private resetTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.ngZone.run(() => {
        this.logout();
        console.log('Déconnexion automatique après 30 secondes d\'inactivité');
      });
    }, 30000); // 30 secondes
  }
  // user.service.ts
loginWithGoogle(): void {
  const clientId = '994519531998-tsrffi97f9bt8jmvraeffcjodd09kt6h.apps.googleusercontent.com'; // Remplacez par votre ID client Google
  const redirectUri = 'http://localhost:8089/login/oauth2/code/google' // URI de redirection
  const scope = 'openid profile email';

  const url = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  
  window.location.href = url;
}


// user.service.ts
exchangeCodeForToken(code: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/code/google`, { code });
}

getPendingLoginAttempts(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/pending-logins`, { headers: this.createHeaders() });
}

acceptLogin(email: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/approve-login/${email}/${this.getAdminId()}`,
    {}, // Corps vide si adminId est passé dans l'URL
    { headers: this.createHeaders() }
  );
}


// Bloquer une tentative de connexion
blockLogin(email: string): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/block-login/${email}`, { adminId: this.getAdminId() }, { headers: this.createHeaders() });
}

// Méthode fictive pour obtenir l'ID de l'administrateur connecté
private getAdminId(): number {
  // Implémentez la logique pour récupérer l'ID de l'administrateur connecté
  return 1; // Remplacez par la logique réelle
}
forgotPassword(email: string): Observable<any> {
  const url = `${this.baseUrl}/forgot-password?email=${email}`;
  return this.http.post<any>(url, {}, { headers: this.createHeaders() });
}
resetPassword(email: string, code: string, newPassword: string): Observable<any> {
  const url = `${this.baseUrl}/reset-password?email=${email}&code=${code}&newPassword=${newPassword}`;
  return this.http.post<any>(url, {}, { headers: this.createHeaders() });
}
addUserWithCaptcha(user: User, captchaResponse: string): Observable<User> {
  return this.http.post<User>(`${this.baseUrl}/add-recaptcha`, { 
      emailU: user.emailU, 
      nomU: user.nomU, 
      prenomU: user.prenomU, 
      motdepasseU: user.motdepasseU, 
      captchaResponse 
  }, { headers: this.createHeaders() });
}
getProfileCompletion(userId: number): Observable<any> {
  // Récupérer le token JWT dans le localStorage
  const token = localStorage.getItem('jwtToken');
  
  // Loguer le token pour vérifier qu'il est bien présent
  console.log('Token JWT:', token);

  // Si le token est manquant, afficher une erreur dans la console
  if (!token) {
    console.error('Token JWT manquant');
  }

  // Ajouter le token dans les en-têtes s'il est disponible
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

  // Loguer l'URL et les en-têtes avant l'envoi de la requête
  console.log(`Envoi de la requête GET à : ${this.baseUrl}/profile-completion/${userId}`);
  console.log('En-tête de la requête :', headers);

  // Retourner la requête GET avec les en-têtes appropriés
  return this.http.get<any>(`${this.baseUrl}/profile-completion/${userId}`, { headers: this.createHeaders() });
}
updateUserProfile(userId: number, user: User): Observable<User> {
  // Récupérer le token JWT dans le localStorage ou sessionStorage
  const token = localStorage.getItem('jwtToken');
  
  // Vérifier si le token est disponible
  if (!token) {
    console.error('Token JWT manquant');
    // Retourner une erreur si le token est manquant
  }

  // Loguer l'URL de la requête et l'en-tête avant l'envoi
  console.log(`Envoi de la requête PUT à : ${this.baseUrl}/update-profile/${userId}`);
  console.log('En-tête de la requête :', {
    'Authorization': `Bearer ${token}`
  });

  // Envoyer la requête HTTP avec le token JWT dans l'en-tête Authorization
  return this.http.put<User>(`${this.baseUrl}/update-profile/${userId}`, user, {
    headers: this.createHeaders() // Assurez-vous que la méthode 'createHeaders' ajoute le token
  });
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
getTokenn(): string | null {
  return localStorage.getItem('token');
}





}
