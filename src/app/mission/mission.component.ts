import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetService } from '../projet.service';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
})
export class MissionComponent implements OnInit {
  projetId!: number;  // On récupère l'ID depuis l'URL
  missions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private missionService: MissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute) {
      this.projetId = Number(idFromRoute);
      console.log("📌 ID du projet récupéré :", this.projetId);
      
      if (!isNaN(this.projetId) && this.projetId > 0) {
        this.loadMissions();
      } else {
        console.error("❌ L'ID du projet est invalide :", this.projetId);
      }
    } else {
      console.error("❌ Aucun ID de projet trouvé dans l'URL.");
    }
  }

  loadMissions(): void {
    console.log("🔄 Chargement des missions pour le projet :", this.projetId);
    this.missionService.getMissionsByProject(this.projetId).subscribe({
      next: (missions) => {
        this.missions = missions;
        console.log("✅ Missions récupérées :", missions);
      },
      error: (err) => console.error('❌ Erreur lors du chargement des missions :', err),
    });
  }

  redirectToAddMission(): void {
    console.log("🔀 Redirection vers l'ajout d'une mission pour le projet :", this.projetId);
    this.router.navigate([`/add-mission/${this.projetId}`]);
  }

  viewMissionDetails(missionId: number): void {
    console.log("📜 Affichage des détails de la mission :", missionId);
    this.router.navigate([`/mission-details/${missionId}`]);
  }

  deleteMission(missionId: number): void {
    // Demander une confirmation avant suppression
    if (confirm("Are you sure you want to delete this mission?")) {
      this.missionService.deleteMission(missionId).subscribe({
        next: () => {
          console.log("✅ Mission supprimée avec succès !");
          // Recharger la liste après suppression
          this.loadMissions();
        },
        error: (err) => {
          console.error("❌ Erreur lors de la suppression de la mission :", err);
        }
      });
    }
  }
  viewTasks(missionId: number): void {
    console.log("📜 Affichage des tâches pour la mission :", missionId);
    this.router.navigate([`/tasks/${missionId}`]);
  }
  
}
