import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionService } from '../mission.service';
import { Mission } from '../Model/Mission';
@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {
  mission: Mission | undefined;

  constructor(
    private route: ActivatedRoute,
    private missionService: MissionService
  ) {}

  ngOnInit(): void {
    const missionId = Number(this.route.snapshot.paramMap.get('id'));
    if (missionId) {
      this.loadMissionDetails(missionId);
    } else {
      console.error('❌ Mission ID non trouvé dans l\'URL');
    }
  }
  

  loadMissionDetails(missionId: number): void {
    this.missionService.getMissionById(missionId).subscribe({
      next: (mission) => {
        this.mission = mission;
      },
      error: (err) => console.error('❌ Error fetching mission details:', err),
    });
  }
}
