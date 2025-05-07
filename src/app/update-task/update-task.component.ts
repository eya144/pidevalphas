import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TacheService } from '../tache.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TacheService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      finishDate: ['', Validators.required],
      etatTache: ['', Validators.required],
      priorite: ['', Validators.required],
      chargeTravail: ['', Validators.required],
      responsableId: ['', Validators.required],
      assignesIds: ['']
    });

    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTaskData();
  }

  loadTaskData(): void {
    this.taskService.getTacheById(this.taskId).subscribe(task => {
      this.taskForm.patchValue({
        nom: task.nom,
        description: task.description,
        startDate: task.startDate,
        finishDate: task.finishDate,
        etatTache: task.etatTache,
        priorite: task.priorite,
        chargeTravail: task.chargeTravail,
        responsableId: task.responsableId,
        assignesIds: task.assignesIds.join(', ')
      });
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask = {
        ...this.taskForm.value,
        assignesIds: this.taskForm.value.assignesIds
          .split(',')
          .map((id: string) => Number(id.trim()))
      };

      this.taskService.updateTache(this.taskId, updatedTask).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }

  navigateToTasks(): void {
    this.router.navigate(['/tasks']);
  }
}
