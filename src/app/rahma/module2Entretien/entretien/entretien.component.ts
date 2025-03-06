import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { DemandeEmploiService } from 'serviceEntretien/demande-emploi.service';
import { NotificationService } from 'serviceLogistique/notification.service';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.css']
})
export class EntretienComponent {

  demandes: any[] = [];
  isLoading = true;
  notifications: any[] = [];
  showNotifications = false;
  private cdRef!: ChangeDetectorRef; // Ajout pour détecter les changements
  isGraphVisible: boolean = false; // Renommé ici
  chart: Chart | null = null; // Assurer que chart est de type Chart ou null

  constructor(
    private router: Router, 
    private demandeEmploiService: DemandeEmploiService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.demandeEmploiService.getAllDemandesEmploi().subscribe(
      data => {
        this.demandes = data;
        this.isLoading = false;
        this.verifierEntretiensDuJour();
      },
      error => {
        console.error("Erreur lors du chargement des demandes", error);
        this.isLoading = false;
      }
    );

    // Écouter les notifications en temps réel
    this.notificationService.getRealTimeNotifications().subscribe(notification => {
      console.log("Notification reçue :", notification);
      this.notifications.push(notification);
      this.cdRef.detectChanges(); // Forcer la mise à jour de l'affichage
    });
  }

  afficherNotifications() {
    this.showNotifications = !this.showNotifications;

    if (this.showNotifications) {
      const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
      this.demandeEmploiService.getDemandesByDateEntretienaujourdhui(today).subscribe(
        data => {
          this.notifications = data.map(demande => {
            const nom = demande.demandeEmploi?.nom || demande.nom || 'Inconnu';
            const prenom = demande.demandeEmploi?.prenom || demande.prenom || 'Inconnu';
            const message = `Entretien prévu aujourd'hui pour ${nom} ${prenom}`;
            
            this.notificationService.sendEntretienNotification(demande);

            return { message };
          });
        },
        error => {
          console.error("Erreur lors de la récupération des entretiens du jour", error);
        }
      );
    }
  }

  verifierEntretiensDuJour() {
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    console.log("Date d'aujourd'hui :", today);

    this.demandes.forEach(demande => {
      if (demande.dateEntretien && Array.isArray(demande.dateEntretien) && demande.dateEntretien.length === 3) {
        const dateEntretien = new Date(
          demande.dateEntretien[0],
          demande.dateEntretien[1] - 1,
          demande.dateEntretien[2]
        )
        .toISOString()
        .split('T')[0];

        console.log(`Vérification de la demande : ${demande.nom} - ${dateEntretien}`);

        if (dateEntretien === today) {
          const nom = demande.demandeEmploi?.nom || demande.nom || 'Inconnu';
          const prenom = demande.demandeEmploi?.prenom || demande.prenom || 'Inconnu';
          const message = `Entretien prévu aujourd'hui pour ${nom} ${prenom}`;
          this.notificationService.notify({ message });

          this.notificationService.sendEntretienNotification(demande);
        }
      } else {
        console.error(`Date d'entretien invalide pour la demande : ${demande.nom}`);
      }
    });
  }

  passerEntretien(id: number) {
    if (confirm("Voulez-vous passer cette demande à l'entretien ?")) {
      this.demandeEmploiService.passerEntretien(id).subscribe(
        () => {
          alert("Entretien ajouté avec succès !");
          this.ngOnInit();
          this.router.navigate([`/entretientOrg/${id}`]);
        },
        error => console.error("Erreur lors de l'ajout de l'entretien", error)
      );
    }
  }

  refuserDemande(id: number, email: string) {
    if (confirm("Êtes-vous sûr de refuser cette demande ?")) {
      this.demandeEmploiService.changerStatutDemande(id, 'Refuse').subscribe(
        () => {
          alert("Demande refusée !");
          
          this.demandeEmploiService.envoyerEmailRefus(email).subscribe(
            () => alert("Email de refus envoyé avec succès !"),
            error => console.error("Erreur lors de l'envoi de l'email de refus", error)
          );
  
          this.ngOnInit();
        },
        error => console.error("Erreur lors du refus de la demande", error)
      );
    }
  }

  supprimerDemande(id: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette demande ?")) {
      this.demandeEmploiService.supprimerDemandeEmploi(id).subscribe(
        () => {
          alert("Demande supprimée !");
          this.ngOnInit();
        },
        error => console.error("Erreur lors de la suppression de la demande", error)
      );
    }
  }

  redirectToPlaning() {
    this.router.navigate([`/planning`]);
  }

  
  
}
