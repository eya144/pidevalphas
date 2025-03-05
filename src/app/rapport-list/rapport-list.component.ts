import { Component, OnInit } from '@angular/core';
import { RapportQualite } from '../models/Inspection.model';
import { RapportService } from '../services/rapport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rapport-list',
  templateUrl: './rapport-list.component.html',
  styleUrls: ['./rapport-list.component.css']
})
export class RapportListComponent implements OnInit {
  rapports: RapportQualite[] = [];

  constructor(private rapportService: RapportService) {}

  ngOnInit(): void {
    this.loadRapports();
  }

  loadRapports(): void {
    this.rapportService.getAllRapports().subscribe(
      (data) => {
        this.rapports = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des rapports :', error);
      }
    );
  }

  deleteRapport(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rapport ?')) {
      this.rapportService.deleteRapport(id).subscribe(() => {
        this.rapports = this.rapports.filter(r => r.idR !== id);
      });
    }
  }
}