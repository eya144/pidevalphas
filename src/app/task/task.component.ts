import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TacheService } from '../tache.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  missionId!: number;
  tasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskService: TacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.missionId = Number(this.route.snapshot.paramMap.get('missionId'));
    console.log("🔍 Mission ID récupéré :", this.missionId);
  
    if (!isNaN(this.missionId) && this.missionId > 0) {
      this.loadTasks();
    } else {
      console.error("❌ Mission ID invalide :", this.missionId);
    }
  }
  

  loadTasks(): void {
    this.taskService.getTasksByMission(this.missionId).subscribe({
      next: (tasks) => {
        console.log("✅ Tâches récupérées depuis l'API :", tasks);
        
        if (!Array.isArray(tasks)) {
          console.error("❌ Les tâches ne sont pas sous forme de tableau :", tasks);
          this.tasks = [];
          return;
        }
  
        // Ajoute un ID de secours si `task.id` est absent
        this.tasks = tasks.map((task, index) => ({
          id: task.id ?? index, // Utilise l'ID fourni ou un index comme ID temporaire
          ...task
        }));
  
        console.log("🔄 Liste des tâches après ajout des IDs :", this.tasks);
      },
      error: (err) => console.error("❌ Erreur lors du chargement des tâches :", err),
    });
  }
  
  
  
  
  

  deleteTask(taskId: number | undefined): void {
  console.log(`Tentative de suppression de la tâche avec l'ID: ${taskId}`);

  if (!taskId) {
    console.error("❌ L'ID de la tâche est invalide !");
    alert("Impossible de supprimer la tâche : ID invalide !");
    return;
  }

  if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
    this.taskService.deleteTache(taskId).subscribe({
      next: () => {
        console.log(`✅ Tâche avec ID ${taskId} supprimée`);
        this.loadTasks();
      },
      error: (err) => {
        console.error("❌ Erreur lors de la suppression de la tâche :", err);
      },
    });
  }
}

  
  

  redirectToAddTask(): void {
    this.router.navigate([`/add-task/${this.missionId}`]);
  }
}
