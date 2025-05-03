import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Assurez-vous d'importer jwt-decode

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      const role = decoded.role;

      if (role === 'ADMIN') {
        return true; // Accès autorisé
      }
    }

    // Redirection si l'utilisateur n'a pas accès
    this.router.navigate(['/login']); // Ou toute autre page
    return false; // Accès refusé
  }
}