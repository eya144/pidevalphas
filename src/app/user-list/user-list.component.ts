/*import { Component, OnInit } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { User } from '../Model/User.model';
import { PresenceModalComponent } from '../presence-modal/presence-modal.component';
import { UserAdminUpdateComponent } from '../user-admin-update/user-admin-update.component'; 
import { MatDialog } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit  {
  users: User[] = [];

  constructor(private userService: UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
    console.log("Token récupéré depuis localStorage:", localStorage.getItem('jwtToken'));
  }
  openPresenceModal(userId: number): void {
    const dialogRef = this.dialog.open(PresenceModalComponent, {
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Logique après l'ajout d'une présence, comme recharger la liste
        console.log('Présence ajoutée avec succès');
        this.loadUsers(); // Rechargez les utilisateurs ou les présences si nécessaire
      }
    });
  }

  
    loadUsers(): void {
      const token = localStorage.getItem('jwtToken'); // Assurez-vous que la clé est correcte
      if (!token) {
          console.error('No token found in localStorage');
          return;
      }
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.userService.getUsers().subscribe( // Passer les en-têtes ici
        data => {
          this.users = data; // Met à jour la liste des utilisateurs
        },
        error => {
          console.error('Erreur lors de la récupération des utilisateurs', error);
        }
      );
  }

  
    getUsers(): void {
      this.userService.getUsers().subscribe(
          (data) => {
              this.users = data;
          },
          (error) => {
              console.error('Erreur lors de la récupération des utilisateurs', error);
          }
      );
  }
    deleteUser(userId: number | undefined) {
      if (userId !== undefined) {
          this.userService.deleteUser(userId).subscribe(() => {
              this.getUsers(); // Rafraîchir la liste après la suppression
          }, error => {
              console.error('Erreur lors de la suppression de l\'utilisateur', error);
          });
      } else {
          console.error("ID de l'utilisateur non défini");
      }
  }

  openUpdateDialog(user: User): void {
    const dialogRef = this.dialog.open(UserAdminUpdateComponent, {
      width: '400px',
      data: user // Passer l'utilisateur à mettre à jour
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers(); // Rafraîchir la liste après mise à jour
    });
  }

}*/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../ServiceUser/user.service';
import { User } from '../Model/User.model';
import { PresenceModalComponent } from '../presence-modal/presence-modal.component';
import { UserAdminUpdateComponent } from '../user-admin-update/user-admin-update.component'; 
import { MatDialog } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit  {
  users: User[] = [];
  searchTerm: string = '';
  sortKey: 'nomU' | 'emailU' | 'salaireU' |'prenomU' = 'nomU'; // Clé par défaut pour le tri
  sortOrder: boolean = true; // true pour ascendant, false pour descendant


  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUsers();
    console.log("Token récupéré depuis localStorage:", localStorage.getItem('jwtToken'));
  }

  openPresenceModal(userId: number): void {
    const dialogRef = this.dialog.open(PresenceModalComponent, {
      data: { userId: userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Présence ajoutée avec succès');
        this.loadUsers(); 
      }
    });
  }

  loadUsers(): void {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.userService.getUsers().subscribe(
      data => {
        this.users = data; 
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  /*deleteUser(userId: number | undefined): void {
    if (userId !== undefined) {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.loadUsers(); // Rafraîchir la liste après suppression
        },
        error => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      );
    } else {
      console.error("ID de l'utilisateur non défini");
    }
  }*/
    deleteUser(userId: number | undefined): void {
      if (userId !== undefined) {
          const token = localStorage.getItem('jwtToken');
          if (!token) {
              console.error('No token found in localStorage');
              return;
          }
  
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          this.userService.deleteUser(userId, headers).subscribe(
              () => {
                  this.loadUsers(); 
              },
              error => {
                  console.error('Erreur lors de la suppression de l\'utilisateur', error);
              }
          );
      } else {
          console.error("ID de l'utilisateur non défini");
      }
  }

  openUpdateDialog(user: User): void {
    const dialogRef = this.dialog.open(UserAdminUpdateComponent, {
      width: '400px',
      data: user 
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers(); 
    });
  }
  // Méthode pour trier
  sort(property: 'nomU' | 'prenomU' | 'salaireU' |'prenomU' |'emailU'): void {
    this.sortKey = property;
    this.sortOrder = !this.sortOrder; // Inverser l'ordre de tri
  }

  /*filterUsers() {
    return this.users
      .filter(user => 
        user.nomU.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
        user.emailU.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[this.sortKey];
        const bValue = b[this.sortKey];

        if (aValue < bValue) return this.sortOrder ? -1 : 1;
        if (aValue > bValue) return this.sortOrder ? 1 : -1;
        return 0;
      });
  }*/
      filterUsers() {
        return this.users
          .filter(user => 
            (user.nomU && user.nomU.toLowerCase().includes(this.searchTerm.toLowerCase())) || 
            (user.emailU && user.emailU.toLowerCase().includes(this.searchTerm.toLowerCase()))
          )
          .sort((a, b) => {
            const aValue = a[this.sortKey];
            const bValue = b[this.sortKey];
      
            if (aValue < bValue) return this.sortOrder ? -1 : 1;
            if (aValue > bValue) return this.sortOrder ? 1 : -1;
            return 0;
          });
      }
      
}

