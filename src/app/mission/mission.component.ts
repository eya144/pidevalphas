import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetService } from '../projet.service';
import { MissionService } from '../mission.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css'],

})
export class MissionComponent implements OnInit {
  projetId!: number;
  missions: any[] = [];
  filteredMissions: any[] = [];
  paginatedMissions: any[] = [];
  searchText: string = '';
  selectedStatus: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 4; // Change this to control how many missions to show per page
  totalPages: number = 0;
  pages: number[] = [];

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
        this.filteredMissions = [...missions];
        this.updatePagination();
        console.log("✅ Missions récupérées :", missions);
      },
      error: (err) => console.error('❌ Erreur lors du chargement des missions :', err),
    });
  }

  filterMissions(): void {
    this.filteredMissions = this.missions.filter(mission =>
      (this.searchText ? mission.nom.toLowerCase().includes(this.searchText.toLowerCase()) : true) &&
      (this.selectedStatus ? mission.etatMission === this.selectedStatus : true)
    );
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredMissions.length / this.itemsPerPage);
    this.pages = Array(this.totalPages).fill(0).map((_, i) => i + 1);
    this.paginate();
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedMissions = this.filteredMissions.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
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
    if (confirm("Are you sure you want to delete this mission?")) {
      this.missionService.deleteMission(missionId).subscribe({
        next: () => {
          console.log("✅ Mission supprimée avec succès !");
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
