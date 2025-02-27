import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TacheService } from '../tache.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;
  missionId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TacheService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la mission depuis l'URL
    this.missionId = Number(this.route.snapshot.paramMap.get('missionId'));

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

      // Ajouter la tâche
      this.taskService.addTache(taskData, this.missionId).subscribe(
        (response) => {
          console.log('Tâche ajoutée avec succès', response);
          // Rediriger vers la page des tâches de la mission après l'ajout
          this.router.navigate([`/tasks/${this.missionId}`]);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la tâche', error);
        }
      );
    }
  }

  navigateToTasks(): void {
    // Rediriger vers la page des tâches de la mission (en cas de cancel ou d'autres actions)
    this.router.navigate([`/tasks/${this.missionId}`]);
  }
}
