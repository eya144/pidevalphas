import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TacheService } from '../tache.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskId!: number;
  task: any;

  constructor(private route: ActivatedRoute, private taskService: TacheService) {}

  ngOnInit(): void {
    // Récupérer l'ID de la tâche depuis l'URL
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("📋 ID de la tâche pour les détails :", this.taskId);

    // Vérifier si l'ID est valide avant d'appeler le service
    if (this.taskId) {
      this.taskService.getTacheById(this.taskId).subscribe(
        (task) => {
          this.task = task;
          console.log("🔍 Détails de la tâche récupérés :", this.task);
        },
        (error) => {
          console.error("❌ Erreur lors de la récupération de la tâche", error);
        }
      );
    }
  }
}
