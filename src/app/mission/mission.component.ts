import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetService } from '../projet.service';
import { MissionService } from '../mission.service'; // Import du service Mission

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
})
export class MissionComponent implements OnInit {
  @Input() projetId!: number;
  missions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private missionService: MissionService,  // Utilisation du service Mission
    private router: Router
  ) {}
  ngOnInit(): void {
    this.projetId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.projetId) {
      this.loadMissions();
    } else {
      console.error("❌ L'ID du projet n'est pas défini.");
    }
  }
  

  loadMissions(): void {
    this.missionService.getMissionsByProject(this.projetId).subscribe({
      next: (missions) => (this.missions = missions),
      error: (err) => console.error('❌ Erreur lors du chargement des missions :', err),
    });
  }

  redirectToAddMission(): void {
    this.router.navigate([`/add-mission/${this.projetId}`]);  // Redirection avec l'ID du projet
  }
  viewMissionDetails(missionId: number): void {
    this.router.navigate([`/mission-details/${missionId}`]); // Redirects to the mission details page with the mission ID
  }
  
 
}
