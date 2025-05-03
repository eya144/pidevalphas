/*import { Component, OnInit } from '@angular/core';
import { Presence } from '../Model/Presence.model';
import { User } from '../Model/User.model';
import { PresenceService } from '../servicesPresence/presence.service';
import { UserService } from '../ServiceUser/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-presenceemploy-modal',
  templateUrl: './presenceemploy-modal.component.html',
  styleUrls: ['./presenceemploy-modal.component.css']
})
export class PresenceemployModalComponent implements OnInit {
  isModalVisible = false;
  presence!: Presence;
  user!: User;
  role: string | null = null;

  constructor(
    private presenceService: PresenceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const userId = this.getCurrentUserId();
    this.role = this.getCurrentUserRole(); // Récupérer le rôle depuis le token

    if (this.user.idU !== undefined) {
      this.userService.getUserById(this.user.idU).subscribe(
        user => {
          this.user = user;

          // Initialiser la présence
          this.presence = {
            dateP: new Date(),
            heureentre: '',
            heuresortie: '',
            
            user: this.user
          };

          this.openModal(); // tente d'ouvrir automatiquement
        },
        error => {
          console.error('Erreur de récupération utilisateur', error);
        }
      );
    }
  }

  getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.idU;
    } catch (e) {
      console.error('Erreur de décodage du token (ID):', e);
      return null;
    }
  }

  getCurrentUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role; // Assure-toi que ton backend envoie bien `role` dans le token
    } catch (e) {
      console.error('Erreur de décodage du token (role):', e);
      return null;
    }
  }

  openModal() {
    if (this.role === 'ROLE_EMPLOYE') {
      this.isModalVisible = true;
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }

  savePresence() {
    const heureEntree = new Date().toLocaleTimeString();
    this.presence.heureentre = heureEntree;
    this.getPositionAndSave();
  }

  getPositionAndSave() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        // 👉 Ne pas l'inclure dans this.presence
        const locationTemp = `${latitude},${longitude}`;
  
        this.presence.dateP = new Date();
  
        setTimeout(() => {
          navigator.geolocation.getCurrentPosition(endPosition => {
            const endLatitude = endPosition.coords.latitude;
            const endLongitude = endPosition.coords.longitude;
  
            if (this.isSameLocation(latitude, longitude, endLatitude, endLongitude)) {
              const heureSortie = new Date().toLocaleTimeString();
              this.presence.heuresortie = heureSortie;
  
              // 👉 Cloner l'objet sans location
              const presenceToSend = { ...this.presence };
              // Juste pour être sûr (si jamais y avait un champ caché dans le modèle)
              delete (presenceToSend as any).location;
              
              if (this.user && this.user.idU !== undefined) {
                this.presenceService.addPresence(this.user.idU, presenceToSend).subscribe({
                  next: () => {
                    alert("✅ Présence enregistrée !");
                    this.closeModal();
                  },
                  error: () => {
                    alert("❌ Erreur d'enregistrement.");
                  }
                });
              } else {
                alert("❌ Utilisateur non valide.");
              }
            } else {
              alert("❌ Changement de position détecté. Pointage annulé.");
            }
          });
        }, 30000); // 30 sec d'attente
      });
    } else {
      alert("❌ Géolocalisation non supportée.");
    }
  }
  

  isSameLocation(lat1: number, lon1: number, lat2: number, lon2: number): boolean {
    const distance = this.calculateDistance(lat1, lon1, lat2, lon2);
    return distance <= 0.05; // 50 mètres
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}*/
/*import { Component, OnInit } from '@angular/core';
import { Presence } from '../Model/Presence.model';
import { User } from '../Model/User.model';
import { PresenceService } from '../servicesPresence/presence.service';
import { UserService } from '../ServiceUser/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-presenceemploy-modal',
  templateUrl: './presenceemploy-modal.component.html',
  styleUrls: ['./presenceemploy-modal.component.css']
})
export class PresenceemployModalComponent implements OnInit {
  isModalVisible = false;
  presence!: Presence;
  user!: User;
  role: string | null = null;

  constructor(
    private presenceService: PresenceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const userId = this.getCurrentUserId();
    console.log('ID utilisateur récupéré depuis le token :', userId);
    this.role = this.getCurrentUserRole(); // Récupérer le rôle depuis le token

    if (userId !== null) { // Vérifie si l'ID de l'utilisateur est valide
      this.userService.getUserById(userId).subscribe(
        user => {
          this.user = user; // On met à jour l'utilisateur une fois récupéré

          // Initialiser la présence uniquement après avoir récupéré l'utilisateur
          this.presence = {
            dateP: new Date(),
            heureentre: '',
            heuresortie: '',
            user: this.user
          };

          this.openModal(); // Ouvre le modal uniquement si l'utilisateur est un employé
        },
        error => {
          console.error('Erreur de récupération utilisateur', error);
        }
      );
    } else {
      console.error('Erreur : ID utilisateur introuvable');
    }
  }

  getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.id;
    } catch (e) {
      console.error('Erreur de décodage du token (ID):', e);
      return null;
    }
  }

  getCurrentUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role; // Assure-toi que ton backend envoie bien `role` dans le token
    } catch (e) {
      console.error('Erreur de décodage du token (role):', e);
      return null;
    }
  }

  openModal() {
    if (this.role === 'ROLE_EMPLOYE') {
      this.isModalVisible = true;
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }

  savePresence() {
    const heureEntree = new Date().toLocaleTimeString();
    this.presence.heureentre = heureEntree;
    this.getPositionAndSave();
  }

  getPositionAndSave() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // 👉 Ne pas l'inclure dans this.presence
        const locationTemp = `${latitude},${longitude}`;

        this.presence.dateP = new Date();

        setTimeout(() => {
          navigator.geolocation.getCurrentPosition(endPosition => {
            const endLatitude = endPosition.coords.latitude;
            const endLongitude = endPosition.coords.longitude;

            if (this.isSameLocation(latitude, longitude, endLatitude, endLongitude)) {
              const heureSortie = new Date().toLocaleTimeString();
              this.presence.heuresortie = heureSortie;

              // 👉 Cloner l'objet sans location
              const presenceToSend = { ...this.presence };
              // Juste pour être sûr (si jamais y avait un champ caché dans le modèle)
              delete (presenceToSend as any).location;

              if (this.user && this.user.idU !== undefined) {
                this.presenceService.addPresence(this.user.idU, presenceToSend).subscribe({
                  next: () => {
                    alert("✅ Présence enregistrée !");
                    this.closeModal();
                  },
                  error: () => {
                    alert("❌ Erreur d'enregistrement.");
                  }
                });
              } else {
                alert("❌ Utilisateur non valide.");
              }
            } else {
              alert("❌ Changement de position détecté. Pointage annulé.");
            }
          });
        }, 30000); // 30 sec d'attente
      });
    } else {
      alert("❌ Géolocalisation non supportée.");
    }
  }

  isSameLocation(lat1: number, lon1: number, lat2: number, lon2: number): boolean {
    const distance = this.calculateDistance(lat1, lon1, lat2, lon2);
    return distance <= 0.05; // 50 mètres
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}*/
/*import { Component, OnInit } from '@angular/core';
import { Presence } from '../Model/Presence.model';
import { User } from '../Model/User.model';
import { PresenceService } from '../servicesPresence/presence.service';
import { UserService } from '../ServiceUser/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-presenceemploy-modal',
  templateUrl: './presenceemploy-modal.component.html',
  styleUrls: ['./presenceemploy-modal.component.css']
})
export class PresenceemployModalComponent implements OnInit {
  
  isModalVisible = false;
  presence!: Presence;
  user!: User;
  role: string | null = null;

  constructor(
    private presenceService: PresenceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    console.log("Token récupéré dans le modal :", token); // Ajoutez ce log
    
    this.loadUser();
  }

  loadUser(): void {
    const userId = this.getCurrentUserId();
    console.log('ID utilisateur récupéré depuis le token :', userId);
    
    this.role = this.getCurrentUserRole(); // Récupérer le rôle depuis le token

    if (userId !== null) { // Vérifie si l'ID de l'utilisateur est valide
      this.userService.getUserById(userId).subscribe(
        user => {
          this.user = user; // On met à jour l'utilisateur une fois récupéré

          // Initialiser la présence uniquement après avoir récupéré l'utilisateur
          this.presence = {
            dateP: new Date(),
            heureentre: '',
            heuresortie: '',
            user: this.user
          };

          this.openModal(); // Ouvre le modal uniquement si l'utilisateur est un employé
        },
        error => {
          console.error('Erreur de récupération utilisateur', error);
        }
      );
    } else {
      console.error('Erreur : ID utilisateur introuvable');
    }
  }

 
  getCurrentUserId(): number | null {
    const token = localStorage.getItem('jwtToken');
    console.log("Token récupéré :", token); // Vérifiez si le token est présent
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      console.log("Token décodé :", decoded); // Affichez le contenu du token décodé
      return decoded.id; // Assurez-vous que cette clé correspond à celle du token
    } catch (e) {
      console.error('Erreur de décodage du token (ID):', e);
      return null;
    }
  }


  getCurrentUserRole(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role; // Assurez-vous que votre backend envoie bien `role` dans le token
    } catch (e) {
      console.error('Erreur de décodage du token (role):', e);
      return null;
    }
  }

  openModal() {
    if (this.role === 'ROLE_EMPLOYE') {
      this.isModalVisible = true;
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }

  savePresence() {
    const heureEntree = new Date().toLocaleTimeString();
    this.presence.heureentre = heureEntree;
    this.getPositionAndSave();
  }

  getPositionAndSave() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.presence.dateP = new Date();

        setTimeout(() => {
          navigator.geolocation.getCurrentPosition(endPosition => {
            const endLatitude = endPosition.coords.latitude;
            const endLongitude = endPosition.coords.longitude;

            if (this.isSameLocation(latitude, longitude, endLatitude, endLongitude)) {
              const heureSortie = new Date().toLocaleTimeString();
              this.presence.heuresortie = heureSortie;

              const presenceToSend = { ...this.presence };
              delete (presenceToSend as any).location;

              // Utilisez l'ID récupéré du token plutôt que de l'utilisateur
              const userId = this.getCurrentUserId();

              if (userId !== null) {
                this.presenceService.addPresence(userId, presenceToSend).subscribe({
                  next: () => {
                    alert("✅ Présence enregistrée !");
                    this.closeModal();
                  },
                  error: () => {
                    alert("❌ Erreur d'enregistrement.");
                  }
                });
              } else {
                alert("❌ Utilisateur non valide.");
              }
            } else {
              alert("❌ Changement de position détecté. Pointage annulé.");
            }
          });
        }, 30000); // 30 sec d'attente
      });
    } else {
      alert("❌ Géolocalisation non supportée.");
    }
  }

  isSameLocation(lat1: number, lon1: number, lat2: number, lon2: number): boolean {
    const distance = this.calculateDistance(lat1, lon1, lat2, lon2);
    return distance <= 0.05; // 50 mètres
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}*/
import { Component, OnInit } from '@angular/core';
import { Presence } from '../Model/Presence.model';
import { User } from '../Model/User.model';
import { PresenceService } from '../servicesPresence/presence.service';
import { UserService } from '../ServiceUser/user.service';
import { jwtDecode } from 'jwt-decode';
import * as L from 'leaflet';
import { ElementRef, ViewChild } from '@angular/core';




@Component({
  selector: 'app-presenceemploy-modal',
  templateUrl: './presenceemploy-modal.component.html',
  styleUrls: ['./presenceemploy-modal.component.css']
  
})
export class PresenceemployModalComponent implements OnInit {
  isPresenceRecorded: boolean = false;
  isthesame :number=0 // État pour suivre la présence
  isModalVisible = false;
  presence!: Presence;
  user!: User;
  role: string | null = null;
  map: any;
  showMap = false;
  googleMapsLink: string = '';

  
  


  constructor(
    private presenceService: PresenceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.checkPresenceStatus();
    this.loadUser();
  }

 /* checkPresenceStatus() {
    const today = new Date().toISOString().split('T')[0]; // Date d'aujourd'hui au format YYYY-MM-DD
    const recordedDate = localStorage.getItem('presenceDate');

    if (recordedDate === today) {
      this.isPresenceRecorded = true; // La présence a déjà été enregistrée pour aujourd'hui
    }
  }*/
    checkPresenceStatus() {
      const userId = this.getCurrentUserId(); // Récupérer l'ID de l'utilisateur actuel
      const today = new Date().toISOString().split('T')[0]; // Date d'aujourd'hui au format YYYY-MM-DD
      const recordedData = localStorage.getItem('presenceData'); // Stockez l'ID et la date ensemble
    
      if (recordedData) {
        const { id, date } = JSON.parse(recordedData); // Déstructurez l'ID et la date
        if (id === userId && date === today) {
          this.isPresenceRecorded = true; // La présence a déjà été enregistrée pour aujourd'hui
        }
      }
    }

  loadUser(): void {
    const userId = this.getCurrentUserId();
    console.log('ID utilisateur récupéré depuis le token :', userId);
    this.role = this.getCurrentUserRole(); // Récupérer le rôle depuis le token

    if (userId !== null) { // Vérifie si l'ID de l'utilisateur est valide
      this.userService.getUserById(userId).subscribe(
        user => {
          this.user = user; // Met à jour l'utilisateur

          // Initialiser la présence uniquement après avoir récupéré l'utilisateur
          this.presence = {
            dateP: new Date(),
            heureentre: '',
            heuresortie: '',
            user: this.user
          };

          this.openModal(); // Ouvre le modal uniquement si l'utilisateur est un employé
        },
        error => {
          console.error('Erreur de récupération utilisateur', error);
        }
      );
    } else {
      console.error('Erreur : ID utilisateur introuvable');
    }
  }

  getCurrentUserId(): number | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.id; // Assurez-vous que cette clé correspond à celle du token
    } catch (e) {
      console.error('Erreur de décodage du token (ID):', e);
      return null;
    }
  }

  getCurrentUserRole(): string | null {
    const token = localStorage.getItem('jwtToken');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.role; // Assurez-vous que votre backend envoie bien `role` dans le token
    } catch (e) {
      console.error('Erreur de décodage du token (role):', e);
      return null;
    }
  }

  openModal() {
    if (this.role === 'ROLE_EMPLOYE' && !this.isPresenceRecorded) {
      this.isModalVisible = true; // Ouvre le modal uniquement si la présence n'a pas été enregistrée
    } else if (this.isPresenceRecorded) {
      alert("Vous avez déjà enregistré votre présence pour aujourd'hui.");
    }
  }

  closeModal() {
    this.isModalVisible = false;
  }

  /*savePresence() {
    const heureEntree = new Date().toLocaleTimeString();
    this.presence.heureentre = heureEntree;
    this.getPositionAndSave();
  }

  getPositionAndSave() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.presence.dateP = new Date();

        setTimeout(() => {
          navigator.geolocation.getCurrentPosition(endPosition => {
            const endLatitude = endPosition.coords.latitude;
            const endLongitude = endPosition.coords.longitude;

            if (this.isSameLocation(latitude, longitude, endLatitude, endLongitude)) {
              const heureSortie = new Date().toLocaleTimeString();
              this.presence.heuresortie = heureSortie;

              const presenceToSend = { ...this.presence };
              delete (presenceToSend as any).location;

              const userId = this.getCurrentUserId();

              if (userId !== null) {
                this.presenceService.addPresence(userId, presenceToSend).subscribe({
                  next: () => {
                    alert("✅ Présence enregistrée !");
                    localStorage.setItem('presenceDate', new Date().toISOString().split('T')[0]); // Enregistre la date
                    this.isPresenceRecorded = true; // Met à jour l'état
                    this.closeModal();
                  },
                  error: () => {
                    alert("❌ Erreur d'enregistrement.");
                  }
                });
              } else {
                alert("❌ Utilisateur non valide.");
              }
            } else {
              alert("❌ Changement de position détecté. Pointage annulé.");
            }
          });
        }, 30000); // 30 sec d'attente
      });
    } else {
      alert("❌ Géolocalisation non supportée.");
    }
  }*/
    savePresence() {
      const heureEntree = new Date().toLocaleTimeString();
      this.presence.heureentre = heureEntree;
      this.getPositionAndSave();
    }
    
    /*getPositionAndSave() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
    
          this.presence.dateP = new Date();
    
          setTimeout(() => {
            navigator.geolocation.getCurrentPosition(endPosition => {
              const endLatitude = endPosition.coords.latitude;
              const endLongitude = endPosition.coords.longitude;
    
              if (this.isSameLocation(latitude, longitude, endLatitude, endLongitude)) {
                const heureSortie = new Date().toLocaleTimeString();
                this.presence.heuresortie = heureSortie;
    
                const presenceToSend = { ...this.presence };
                delete (presenceToSend as any).location;
    
                const userId = this.getCurrentUserId();
    
                if (userId !== null) {
                  this.presenceService.addPresence(userId, presenceToSend).subscribe({
                    next: () => {
                      alert("✅ Présence enregistrée !");
                      // Enregistre l'ID de l'utilisateur et la date
                      localStorage.setItem('presenceData', JSON.stringify({ id: userId, date: new Date().toISOString().split('T')[0] }));
                      this.isPresenceRecorded = true; // Met à jour l'état
                      this.closeModal();
                    },
                    error: () => {
                      alert("❌ Erreur d'enregistrement.");
                    }
                  });
                } else {
                  alert("❌ Utilisateur non valide.");
                }
              } else {
                alert("❌ Changement de position détecté. Pointage annulé.");
                this.closeModal();
              }
            });
          }, 30000); // 30 sec d'attente
        });
      } else {
        alert("❌ Géolocalisation non supportée.");
      }
    }*/
      getPositionAndSave() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
      
            this.presence.dateP = new Date();
      
            setTimeout(() => {
              navigator.geolocation.getCurrentPosition(endPosition => {
                const endLatitude = endPosition.coords.latitude;
                const endLongitude = endPosition.coords.longitude;
      
                if (this.isSameLocation(latitude, longitude, endLatitude, endLongitude)) {
                  const heureSortie = new Date().toLocaleTimeString();
                  this.presence.heuresortie = heureSortie;
      
                  const presenceToSend = { ...this.presence };
                  delete (presenceToSend as any).location;
      
                  const userId = this.getCurrentUserId();
      
                  if (userId !== null) {
                    this.presenceService.addPresence(userId, presenceToSend).subscribe({
                      next: () => {
                        alert("✅ Présence enregistrée !");
                        
                        // ➕ Affiche la carte juste après l’enregistrement
                        //this.initMap(latitude, longitude); // ⬅️ Ta méthode Leaflet
                        this.showMap = true;
                        console.log("showMap", this.showMap);
                        setTimeout(() => {
                          this.initMap(latitude, longitude);
                          this.googleMapsLink = this.getGoogleMapsLink(latitude, longitude); // 🔗 stocke le lien
                        }, 100);
    
      
                        // Stocke les infos localement
                        localStorage.setItem('presenceData', JSON.stringify({
                          id: userId,
                          date: new Date().toISOString().split('T')[0]
                        }));
                        this.isPresenceRecorded = true;
                        // Tu peux choisir de fermer ou non le modal ici
                        // this.closeModal();
                      },
                      error: () => {
                        alert("❌ Erreur d'enregistrement.");
                      }
                    });
                  } else {
                    alert("❌ Utilisateur non valide.");
                  }
                } else {
                  alert("❌ Changement de position détecté. Pointage annulé.");
                  this.closeModal();
                }
              });
            }, 30000); // Attente de 30 sec
          });
        } else {
          alert("❌ Géolocalisation non supportée.");
        }
      }
     
        initMap(lat: number, lng: number): void {
          // Supprimez la carte existante si elle existe
          if (this.map) {
              this.map.remove();
          }
      
          // Créez la carte centrée sur les coordonnées
          this.map = L.map('map', {
              center: [lat, lng],
              zoom: 20, // Assurez-vous que le zoom est défini
              zoomControl: false,
              dragging: false,
              scrollWheelZoom: false,
              doubleClickZoom: false,
              boxZoom: false,
              touchZoom: false,
              attributionControl: false
          });
      
          // Ajoutez la couche de tuiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
          }).addTo(this.map);
      
          // Ajoutez le marqueur
          const marker = L.marker([lat, lng]).addTo(this.map);
          const googleMapsLink = this.getGoogleMapsLink(lat, lng);
          console.log('Ajout du marqueur à:', lat, lng);
          marker.bindPopup('📍 Vous avez pointé ici').openPopup();
      
          // Ajoutez un cercle rouge
          const radiusInMeters = 20;
          L.circle([lat, lng], {
              color: 'red',
              fillColor: '#f03',
              fillOpacity: 0.3,
              radius: radiusInMeters
          }).addTo(this.map);
      
          // Centrez la carte sur les coordonnées
          this.map.setView([lat, lng], 20);
      }

  isSameLocation(lat1: number, lon1: number, lat2: number, lon2: number): boolean {
    const distance = this.calculateDistance(lat1, lon1, lat2, lon2);
    return distance <= 0.05; // 50 mètres
  }
  getGoogleMapsLink(lat: number, lng: number): string {
    return `https://www.google.com/maps?q=${lat},${lng}`;
}

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

