import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TacheService } from '../tache.service';
import { Priorite, Status, Tache } from '../core/models/Tache';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  missionId!: number;
  tasks: Tache[] = [];
  Status = Status;

  todoTasks: Tache[] = [];
  doingTasks: Tache[] = [];
  doneTasks: Tache[] = [];
  suspendedTasks: Tache[] = [];

  searchTerm: string = '';
  selectedStatus: string = '';
  selectedPriority: string = '';

  constructor(
    private route: ActivatedRoute,
    private taskService: TacheService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.missionId = Number(this.route.snapshot.paramMap.get('missionId'));
    console.log('🔍 Mission ID récupéré :', this.missionId);

    if (!isNaN(this.missionId) && this.missionId > 0) {
      this.loadTasks();
    } else {
      console.error('❌ Mission ID invalide :', this.missionId);
    }
  }

  loadTasks(): void {
    this.taskService.getTasksByMission(this.missionId).subscribe({
      next: (tasks: Tache[]) => {
        console.log('✅ Tâches récupérées depuis l\'API :', tasks);
        this.tasks = tasks;
        this.updateTaskLists();
      },
      error: (err) => console.error('❌ Erreur lors du chargement des tâches :', err),
    });
  }

  updateTaskLists(): void {
    this.todoTasks = this.tasks.filter((task) => task.etatTache === Status.TODO);
    this.doingTasks = this.tasks.filter((task) => task.etatTache === Status.DOING);
    this.doneTasks = this.tasks.filter((task) => task.etatTache === Status.DONE);
    this.suspendedTasks = this.tasks.filter((task) => task.etatTache === Status.SUSPENDED);
    this.cdr.markForCheck(); // Force la détection des changements
  }

  // Méthode pour rechercher des tâches
  searchTasks(): void {
    this.taskService
      .searchTasks(this.searchTerm, this.selectedStatus as Status, this.selectedPriority as Priorite)
      .subscribe({
        next: (tasks: Tache[]) => {
          console.log('✅ Résultats de la recherche :', tasks);
          this.tasks = tasks;
          this.updateTaskLists();
        },
        error: (err) => console.error('❌ Erreur de recherche :', err),
      });
  }

  // Méthode pour rediriger vers la page d'ajout de tâche
  redirectToAddTask(): void {
    this.router.navigate([`/add-task/${this.missionId}`]);
  }

  // Méthode pour rediriger vers les détails de la tâche
  redirectToTaskDetails(idTache: number): void {
    if (!idTache) {
      console.error('❌ ID de tâche invalide pour la redirection :', idTache);
      return;
    }
    this.router.navigate([`/task-details/${idTache}`]);
  }

  // Méthode pour rediriger vers la page de mise à jour de la tâche
  redirectToUpdateTask(missionId: number, idTache: number): void {
    if (!idTache || !missionId) {
      console.error('❌ ID de tâche ou mission invalide pour la mise à jour :', idTache, missionId);
      return;
    }
    this.router.navigate([`/tasks/${missionId}/${idTache}`]);
  }

  onDrop(event: CdkDragDrop<Tache[]>, status: Status): void {
    const movedTask: Tache = event.item.data;

    if (!movedTask || !movedTask.idTache) {
      console.error('❌ Tâche invalide ou sans ID :', movedTask);
      return;
    }

    movedTask.etatTache = status;
    this.removeFromOtherLists(movedTask);
    this.addToCorrectList(movedTask);

    this.taskService.updateTaskStatus(movedTask.idTache, status).subscribe({
      next: (updatedTask) => {
        console.log('✅ Tâche mise à jour avec succès :', updatedTask);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('❌ Erreur lors de la mise à jour de la tâche :', err);
        this.removeFromOtherLists(movedTask);
        this.addToCorrectList(movedTask);
      },
    });
  }

  private addToCorrectList(movedTask: Tache): void {
    switch (movedTask.etatTache) {
      case Status.TODO:
        this.todoTasks.push(movedTask);
        break;
      case Status.DOING:
        this.doingTasks.push(movedTask);
        break;
      case Status.DONE:
        this.doneTasks.push(movedTask);
        break;
      case Status.SUSPENDED:
        this.suspendedTasks.push(movedTask);
        break;
      default:
        console.error('❌ Statut inconnu dans addToCorrectList :', movedTask.etatTache);
    }
    this.cdr.markForCheck();
  }

  removeFromOtherLists(task: Tache): void {
    this.todoTasks = this.todoTasks.filter((t) => t.idTache !== task.idTache);
    this.doingTasks = this.doingTasks.filter((t) => t.idTache !== task.idTache);
    this.doneTasks = this.doneTasks.filter((t) => t.idTache !== task.idTache);
    this.suspendedTasks = this.suspendedTasks.filter((t) => t.idTache !== task.idTache);
    this.cdr.markForCheck();
  }

  deleteTask(idTache: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.taskService.deleteTache(idTache).subscribe({
        next: () => {
          console.log(`✅ Tâche avec ID ${idTache} supprimée`);
          this.tasks = this.tasks.filter((task) => task.idTache !== idTache);
          this.updateTaskLists();
        },
        error: (err) => console.error('❌ Erreur lors de la suppression de la tâche :', err),
      });
    }
  }
}