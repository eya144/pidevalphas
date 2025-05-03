import { Component,OnInit,ViewChild  } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { PresenceemployModalComponent } from '../presenceemploy-modal/presenceemploy-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isEmploye: boolean = false; 
  @ViewChild(PresenceemployModalComponent)
  presenceModal!: PresenceemployModalComponent;
  constructor(private userService: UserService, private router: Router) {}
  logout() {
    this.userService.logout(); 
    this.router.navigate(['/login']); 
  }
  ngOnInit(): void {
    console.log("HomeComponent loaded"); 
    this.checkUserRole();
  }
  checkUserRole(): void {
    const token = localStorage.getItem('jwtToken'); // Récupérer le token depuis le service
    console.log("👉 Token récupéré :", token);
  
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log("👉 decoded token :", decoded); // 👈 AJOUTE ÇA
  
        this.isEmploye = decoded.role === 'ROLE_EMPLOYE';
        console.log("👉 isEmploye:", this.isEmploye); // 👈 ON VEUT LE VOIR
      } catch (e) {
        console.error('Erreur de décodage du token:', e);
      }
    } else {
      console.warn("⚠️ Aucun token trouvé !");
    }
  }
  
  openPresenceModal() {
    this.presenceModal.openModal();
  }


}
