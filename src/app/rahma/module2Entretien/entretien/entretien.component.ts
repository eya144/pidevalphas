import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DemandeEmploiService } from 'serviceEntretien/demande-emploi.service';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.css']
})
export class EntretienComponent {
  demandes: any[] = [];
  isLoading = true;
  isCalendarOpen = false;
  selectedDate: Date | null = null;
onDateNavigate: any;

  constructor(
    private router: Router, 
    private demandeEmploiService: DemandeEmploiService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.demandeEmploiService.getAllDemandesEmploi().subscribe(
      data => {
        this.demandes = data;
        this.isLoading = false;
      },
      error => {
        console.error("Erreur lors du chargement des demandes", error);
        this.isLoading = false;
      }
    );
  }

  

  closeCalendar() {
    this.isCalendarOpen = false;
    document.body.style.filter = "none"; // Retirer le flou sur le corps
  }

  passerEntretien(id: number) {
    if (confirm("Voulez-vous passer cette demande à l'entretien ?")) {
      this.demandeEmploiService.passerEntretien(id).subscribe(
        () => {
          alert("Entretien ajouté avec succès !");
          this.ngOnInit(); // Recharger la liste
          this.router.navigate([`/entretientOrg/${id}`]);
        },
        error => console.error("Erreur lors de l'ajout de l'entretien", error)
      );
    }
  }

  refuserDemande(id: number) {
    if (confirm("Êtes-vous sûr de refuser cette demande ?")) {
      this.demandeEmploiService.changerStatutDemande(id, 'Refuse').subscribe(
        () => {
          alert("Demande refusée !");
          this.ngOnInit(); // Recharger la liste
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
          this.ngOnInit(); // Recharger la liste après suppression
        },
        error => console.error("Erreur lors de la suppression de la demande", error)
      );
    }
  }
  openCalendar(): void {
    // // Ajouter la classe 'blurred' pour flouter l'arrière-plan
    // document.body.classList.add('blurred');
  
    // const dialogRef = this.dialog.open(CalendarModalComponent, {
    //   width: '400px',   // Ajustez la taille en fonction de votre besoin
    //   height: '500px',  // Ajustez la hauteur si nécessaire
    //   disableClose: true
    // });
  
    // dialogRef.afterClosed().subscribe(result => {
    //   // Retirer le flou de l'arrière-plan lorsque la modale est fermée
    //   document.body.classList.remove('blurred');
    //   if (result) {
    //     this.selectedDate = result;
    //     alert(`Entretien fixé pour le : ${this.selectedDate!.toLocaleDateString()}`);
    //   }
    // });
  }
}  