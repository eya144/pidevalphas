import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TacheService } from '../tache.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  missionId!: number;
  tasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tacheService: TacheService
  ) {}

  ngOnInit(): void {
    this.missionId = Number(this.route.snapshot.paramMap.get('missionId'));
    if (this.missionId) {
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.tacheService.getTasksByMission(this.missionId).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log("✅ Tasks for mission:", this.tasks);
      },
      error: (err) => console.error("❌ Error loading tasks:", err),
    });
  }

}
