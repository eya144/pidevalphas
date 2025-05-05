import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAdminADDComponent } from '../user-admin-add/user-admin-add.component';
import { UserService } from '../ServiceUser/user.service';
import { Presence } from '../Model/Presence.model';
import { PresenceService } from '../servicesPresence/presence.service';
import{ Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent {
  pendingAttempts: any[] = [];
  userPresences: any[] = [];
  filterText: string = ''; // Anciennement searchTerm
  isAscending: boolean = true; // Anciennement sortDirection
  currentSortField: string = ''; // Anciennement sortField
  constructor(public dialog: MatDialog , private userService: UserService, private presenceService: PresenceService,private router: Router) { }
  ngOnInit(): void {
     
    this.loadPendingLoginAttempts();
    this.loadUserPresences();
  }

    openDialog(): void {
        const dialogRef = this.dialog.open(UserAdminADDComponent, {
            width: '400px'        
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Le modal a été fermé');
        });
    }
    loadPendingLoginAttempts(): void {
      this.userService.getPendingLoginAttempts().subscribe(
          attempts => {
              this.pendingAttempts = attempts;
          },
          error => {
              console.error('Erreur lors de la récupération des tentatives de connexion :', error);
          }
      );
  }
  
    acceptLogin(email: string): void {
      this.userService.acceptLogin(email).subscribe(() => {
        this.loadPendingLoginAttempts(); // Recharger les tentatives après acceptation
      });
    }
  
    blockLogin(email: string): void {
      this.userService.blockLogin(email).subscribe(() => {
        this.loadPendingLoginAttempts(); // Recharger les tentatives après blocage
      });
    }
    loadUserPresences(): void {
      this.presenceService.getAllPresences().subscribe(
        presences => {
          this.userPresences = presences;
          console.log("presence:",presences) // Stocker les présences récupérées
        },
        error => {
          console.error('Erreur lors de la récupération des présences :', error);
        }
      );
    }
      // Méthode de filtrage
      filteredPresences() {
        return this.userPresences.filter(presence => {
            return presence.user.nomU.toLowerCase().includes(this.filterText.toLowerCase()) ||
                   presence.user.prenomU.toLowerCase().includes(this.filterText.toLowerCase());
        });
    }

    // Méthode de tri
    sort(field: string) {
      this.currentSortField = field;
      this.isAscending = !this.isAscending; // Change direction
      this.userPresences.sort((a, b) => {
          const aValue = field.includes('.') ? a.user[field.split('.')[1]] : a[field];
          const bValue = field.includes('.') ? b.user[field.split('.')[1]] : b[field];
  
          if (aValue < bValue) return this.isAscending ? -1 : 1;
          if (aValue > bValue) return this.isAscending ? 1 : -1;
          return 0;
      });
  }
  logout() {
    this.userService.logout(); 
    this.router.navigate(['/login']); 
  }

}
