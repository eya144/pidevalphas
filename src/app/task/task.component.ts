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

        this.tasks = tasks.map((task, index) => ({
          id: task.id ?? index, // Ajoute un ID temporaire si absent
          ...task
        }));

        console.log("🔄 Liste des tâches après ajout des IDs :", this.tasks);
      },
      error: (err) => console.error("❌ Erreur lors du chargement des tâches :", err),
    });
  }
  searchTerm: string = '';
selectedStatus: string = '';
selectedPriority: string = '';

searchTasks(): void {
  this.taskService.searchTasks(this.searchTerm, this.selectedStatus, this.selectedPriority).subscribe({
    next: (tasks) => {
      this.tasks = tasks;
    },
    error: (err) => console.error("❌ Erreur de recherche :", err),
  });
}


  deleteTask(idTache: number): void {
    if (!idTache) {
      console.error("❌ ID de tâche invalide :", idTache);
      return;
    }

    if (confirm("Are you sure you want to delete this task?")) {
      this.taskService.deleteTache(idTache).subscribe({
        next: () => {
          console.log(`✅ Tâche avec ID ${idTache} supprimée`);
          
          // 🔄 Optimisation : Met à jour la liste sans recharger toute l’API
          this.tasks = this.tasks.filter(task => task.idTache !== idTache);
        },
        error: (err) => {
          console.error("❌ Erreur lors de la suppression de la tâche :", err);
        },
      });
    }
  }
  redirectToTaskDetails(idTache: number): void {
    if (!idTache) {
      console.error("❌ ID de tâche invalide pour la redirection vers les détails :", idTache);
      return;
    }
    this.router.navigate([`/task-details/${idTache}`]);
  }
  
  redirectToUpdateTask(missionId: number, idTache: number): void {
    if (!idTache || !missionId) {
      console.error("❌ ID de tâche ou mission invalide pour la redirection vers la mise à jour :", idTache, missionId);
      return;
    }
    this.router.navigate([`/tasks/${missionId}/${idTache}`]);
  }
  
  

  redirectToAddTask(): void {
    this.router.navigate([`/add-task/${this.missionId}`]);
  }
}
