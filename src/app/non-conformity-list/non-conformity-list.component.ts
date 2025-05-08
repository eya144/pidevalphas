
// 1. Composant Liste des Non-Conformités
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NonConformity } from 'src/models/Inspection.model';
import Swal from 'sweetalert2';
import { NonconformityService } from '../services/nonconformity.service';

@Component({
  selector: 'app-non-conformity-list',
  templateUrl: './non-conformity-list.component.html',
  styleUrls: ['./non-conformity-list.component.css']
})export class NonConformityListComponent implements OnInit {
  nonConformities: NonConformity[] = [];

  constructor(private nonConformityService: NonconformityService,private router: Router) {}

  ngOnInit(): void {
    this.getAllNonConformities();
  }



  getAllNonConformities(): void {
      this.nonConformityService.getAllNonConformity().subscribe(
        (data: NonConformity[]) => {
          console.log("Données reçues:", data); // Vérifier si les IDs sont bien présents
          this.nonConformities = data;
        },
        (error) => {
          console.error("Erreur lors de la récupération des inspections!", error);
        }
      );
    }

    deleteNonConformity(id: number): void {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you really want to delete this Non-Conformity?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          this.nonConformityService.deleteNonConformity(id).subscribe(() => {
            this.getAllNonConformities();
            Swal.fire('Deleted!', 'The Non-Conformity has been deleted.', 'success');
          });
        }
      });
    }
  
  
  
    goToDetail(id: number) {
      this.router.navigate([`/Nonconform/${id}`]);
    }
    goToEdit(id: number): void {
      this.router.navigate([`/NonConformityEdit/${id}`]);
    }
    
  
  }