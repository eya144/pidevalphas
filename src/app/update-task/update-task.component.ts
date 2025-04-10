import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TacheService } from '../tache.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
})
export class UpdateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;
  missionId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TacheService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskId = Number(params.get('idTache'));
      this.missionId = Number(params.get('missionId'));
      console.log('idTache:', this.taskId, 'missionId:', this.missionId);
  
      if (isNaN(this.taskId) || isNaN(this.missionId)) {
        console.error("❌ Paramètres ID invalides !");
        return;
      }
  
      // Initialisation du formulaire avec des valeurs par défaut
      this.taskForm = this.fb.group({
        nom: ['', Validators.required],
        description: ['', Validators.required],
        startDate: ['', Validators.required],
        finishDate: ['', Validators.required],
        etatTache: ['TODO', Validators.required],
        priorite: ['MOYENNE', Validators.required], 
        chargeTravail: [0, [Validators.required, Validators.min(0)]],
        responsableId: ['', Validators.required],
        assignesIds: [''],
      });
  
      // Charger les données de la tâche
      this.loadTaskData();
    });
  }

  loadTaskData(): void {
    this.taskService.getTacheById(this.taskId).subscribe(
      (task) => {
        console.log('Tâche récupérée :', task); // Vérifier la structure de la tâche récupérée
    
        if (task) {
          // Ensure task.startDate and task.finishDate are Date objects
          const startDate = this.formatDate(new Date(task.startDate));  // Convert to Date
          const finishDate = this.formatDate(new Date(task.finishDate));  // Convert to Date
    
          // Pré-remplir le formulaire avec les données de la tâche
          this.taskForm.patchValue({
            nom: task.nom,
            description: task.description,
            startDate: startDate,
            finishDate: finishDate,
            etatTache: task.etatTache,
            priorite: task.priorite,
            chargeTravail: task.chargeTravail,
            responsableId: task.responsableId,
            assignesIds: task.assignesIds ? task.assignesIds : [], // Garder assignesIds comme tableau
          });
        }
      },
      (error) => {
        console.error('Erreur lors du chargement de la tâche', error);
      }
    );
  }
  
  private formatDate(date: Date): string {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // Retourne au format yyyy-MM-dd
  }
  

  onSubmit(): void {
    if (this.taskForm.valid) {
      let taskData = { ...this.taskForm.value, missionId: this.missionId };

      if (typeof taskData.assignesIds === 'string' && taskData.assignesIds.trim() !== '') {
        taskData.assignesIds = taskData.assignesIds.split(',').map((id: string) => Number(id.trim()));
      } else {
        taskData.assignesIds = [];
      }

      this.taskService.updateTache(this.taskId, taskData).subscribe(
        (response) => {
          console.log('Tâche mise à jour avec succès', response);
          this.router.navigate([`/tasks/${this.missionId}`]);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la tâche', error);
        }
      );
    }
  }

  navigateToTasks(): void {
    this.router.navigate([`/tasks/${this.missionId}`]);
  }

  redirectToUpdateTask(missionId: number, idTache: number): void {
    if (!idTache || !missionId) {
      console.error("❌ ID de tâche ou mission invalide pour la redirection vers la mise à jour :", idTache, missionId);
      return;
    }
    this.router.navigate([`/tasks/${missionId}/${idTache}`]);
  }
}
