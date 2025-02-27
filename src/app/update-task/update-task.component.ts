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
    // Récupérer les IDs depuis l'URL
    this.taskId = Number(this.route.snapshot.paramMap.get('taskId'));
    this.missionId = Number(this.route.snapshot.paramMap.get('missionId'));

    // Initialisation du formulaire avec des valeurs par défaut
    this.taskForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      finishDate: ['', Validators.required],
      etatTache: ['TODO', Validators.required],
      priorite: ['MEDIUM', Validators.required],
      chargeTravail: [0, [Validators.required, Validators.min(0)]],
      responsableId: ['', Validators.required],
      assignesIds: [''],
    });

    // Charger les données de la tâche existante
    this.taskService.getTacheById(this.taskId).subscribe(
      (task) => {
        this.taskForm.patchValue({
          nom: task.nom,
          description: task.description,
          startDate: task.startDate,
          finishDate: task.finishDate,
          etatTache: task.etatTache,
          priorite: task.priorite,
          chargeTravail: task.chargeTravail,
          responsableId: task.responsableId,
          assignesIds: task.assignesIds ? task.assignesIds.join(', ') : '',
        });
      },
      (error) => {
        console.error('Erreur lors du chargement de la tâche', error);
      }
    );
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      let taskData = { ...this.taskForm.value, missionId: this.missionId };

      // Convertir les IDs assignés de string à tableau de nombres
      if (typeof taskData.assignesIds === 'string' && taskData.assignesIds.trim() !== '') {
        taskData.assignesIds = taskData.assignesIds.split(',').map((id: string) => Number(id.trim()));
      } else {
        taskData.assignesIds = [];
      }

      // Mettre à jour la tâche
      this.taskService.updateTache(this.taskId, taskData).subscribe(
        (response) => {
          console.log('Tâche mise à jour avec succès', response);
          // Rediriger vers la page des tâches de la mission après la mise à jour
          this.router.navigate([`/tasks/${this.missionId}`]);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la tâche', error);
        }
      );
    }
  }

  navigateToTasks(): void {
    // Rediriger vers la liste des tâches de la mission
    this.router.navigate([`/tasks/${this.missionId}`]);
  }
}
