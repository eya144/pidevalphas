import { Component, OnInit } from '@angular/core';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { ActionCorrective } from '../models/Inspection.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {
  actions: ActionCorrective[] = [];

  constructor(private actionService: ActionCorrectiveService, private router: Router) {}

  ngOnInit(): void {
    this.getAllActions();
  }

  getAllActions(): void {
    this.actionService.getAllActions().subscribe(data => {
      this.actions = data;
    });
  }

  deleteAction(id: number | undefined): void {
    if (id === undefined) {
      console.error("ID is undefined!");
      return;
    }
    
    // SweetAlert for confirmation before deletion
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this corrective action?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.actionService.deleteAction(id).subscribe(() => {
          this.getAllActions(); // Refresh the list after deletion
          Swal.fire('Deleted!', 'The corrective action has been deleted.', 'success');
        });
      }
    });
  }

  goToEdit(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/edit-action', id]);
    }
  }

  goToDetail(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/action-detail', id]);
    }
  }
}
