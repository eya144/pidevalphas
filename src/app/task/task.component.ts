import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TacheService } from '../tache.service';
import { Status, Priorite, Tache } from '../core/models/Tache';
import { debounceTime, Subject } from 'rxjs';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('50ms', [
            animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', 
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class TaskComponent implements OnInit {
  missionId!: number;
  tasks: Tache[] = [];
  isDragging = false;
  
  // Pour les filtres et tris
  searchTerm = '';
  searchTermSubject = new Subject<string>();
  selectedStatus: Status | '' = '';
  selectedPriority: Priorite | '' = '';
  sortField: 'priorite' | 'startDate' = 'startDate';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Constantes enum
  Status = Status;
  Priorite = Priorite;

  // Options pour les selects
  statusOptions = [
    { value: Status.TODO, viewValue: 'To Do' },
    { value: Status.DOING, viewValue: 'Doing' },
    { value: Status.DONE, viewValue: 'Done' },
    { value: Status.SUSPENDED, viewValue: 'Suspended' }
  ];

  priorityOptions = [
    { value: Priorite.HAUTE, viewValue: 'High' },
    { value: Priorite.MOYENNE, viewValue: 'Medium' },
    { value: Priorite.BASSE, viewValue: 'Low' }
  ];

  // Colonnes du board
  boardColumns = [
    { title: 'To Do', tasks: [] as Tache[], status: Status.TODO, id: 'todo' },
    { title: 'Doing', tasks: [] as Tache[], status: Status.DOING, id: 'doing' },
    { title: 'Done', tasks: [] as Tache[], status: Status.DONE, id: 'done' },
    { title: 'Suspended', tasks: [] as Tache[], status: Status.SUSPENDED, id: 'suspended' }
  ];

  boardColumnIds = this.boardColumns.map(col => col.id);

  constructor(
    private route: ActivatedRoute,
    private taskService: TacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.missionId = Number(this.route.snapshot.paramMap.get('missionId'));
    if (this.missionId) {
      this.loadTasks();
    }

    this.searchTermSubject.pipe(debounceTime(300)).subscribe(() => {
      this.applyFiltersAndSorting();
    });
  }

  loadTasks(): void {
    this.taskService.getTasksByMission(this.missionId).subscribe({
      next: (tasks) => {
        this.tasks = tasks || [];
        this.applyFiltersAndSorting();
      },
      error: (err) => console.error('Error loading tasks', err)
    });
  }
  
  onDragStarted() {
    this.isDragging = true;
  }
  
  onDragEnded() {
    setTimeout(() => {
      this.isDragging = false;
    }, 150); // Increased delay to allow animations to finish
  }
  

  isDraggingDisabled(task: Tache): boolean {
    return task.etatTache === Status.DONE;
  }

  applyFiltersAndSorting(): void {
    let filtered = [...this.tasks];

    // Filtre par recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.nom.toLowerCase().includes(term) || 
        t.description?.toLowerCase().includes(term)
      );
    }

    // Filtre par statut
    if (this.selectedStatus) {
      filtered = filtered.filter(t => t.etatTache === this.selectedStatus);
    }

    // Filtre par priorité
    if (this.selectedPriority) {
      filtered = filtered.filter(t => t.priorite === this.selectedPriority);
    }

    // Tri
    filtered = this.sortTasks(filtered);

    // Mise à jour des colonnes
    this.updateBoardColumns(filtered);
  }

   private sortTasks(tasks: Tache[]): Tache[] {
    return tasks.sort((a, b) => {
      if (this.sortField === 'startDate') {
        const dateA = this.getDateValue(a.startDate);
        const dateB = this.getDateValue(b.startDate);
        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      else {
        const priorityOrder = { 
          [Priorite.HAUTE]: 3, 
          [Priorite.MOYENNE]: 2, 
          [Priorite.BASSE]: 1 
        };
        const priorityA = priorityOrder[a.priorite] || 0;
        const priorityB = priorityOrder[b.priorite] || 0;
        return this.sortDirection === 'asc' ? priorityA - priorityB : priorityB - priorityA;
      }
    });
  }

  private getDateValue(date: any): number {
    if (!date) return 0;
    if (date instanceof Date) return date.getTime();
    if (typeof date === 'string') return new Date(date).getTime();
    return 0;
  }

  private updateBoardColumns(filteredTasks: Tache[]): void {
    this.boardColumns.forEach(col => {
      col.tasks = filteredTasks.filter(t => 
        t.etatTache === col.status
      );
    });
  }

  getPriorityLabel(priority: Priorite): string {
    return this.priorityOptions.find(p => p.value === priority)?.viewValue || '';
  }

  searchTasks(): void {
    this.searchTermSubject.next(this.searchTerm);
  }

  changeSorting(field: 'priorite' | 'startDate'): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSorting();
  }

  onDrop(event: CdkDragDrop<Tache[]>, newStatus: Status): void {
    if (event.previousContainer === event.container) return;

    const task: Tache = event.item.data;
    const prevStatus = task.etatTache;

    // Mise à jour optimiste
    task.etatTache = newStatus;
    this.applyFiltersAndSorting();

    // Appel API
    this.taskService.updateTaskStatus(task.idTache!, newStatus).subscribe({
      error: () => {
        // Rollback en cas d'erreur
        task.etatTache = prevStatus;
        this.applyFiltersAndSorting();
      }
    });
  }

  deleteTask(idTache: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTache(idTache).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.idTache !== idTache);
          this.applyFiltersAndSorting();
        },
        error: (err) => console.error('Error deleting task', err)
      });
    }
  }

  redirectToAddTask(): void {
    this.router.navigate([`/tasks/add/${this.missionId}`]);
  }

  redirectToTaskDetails(idTache: number): void {
    this.router.navigate([`/tasks/details/${idTache}`]);
  }

  truncateText(text: string, limit: number = 50): string {
    if (!text) return '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }

  getStatusIcon(status: Status): string {
    switch(status) {
      case Status.TODO: return 'assignment';
      case Status.DOING: return 'autorenew';
      case Status.DONE: return 'check_circle';
      case Status.SUSPENDED: return 'pause_circle';
      default: return 'help_outline';
    }
  }
}
