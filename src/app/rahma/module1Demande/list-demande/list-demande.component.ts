import { Component, OnInit } from '@angular/core';
import { MaterielService } from 'serviceLogistique/materiel.service';
import { Demande } from '../../model/demande.model';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {
  demandes: Demande[] = [];

  constructor(private demandeService: MaterielService) {}

  ngOnInit(): void {
    this.loadDemandes();
  }

  loadDemandes(): void {
    this.demandeService.getAllDemandes().subscribe(
      (data: Demande[]) => {
        this.demandes = data;
      },
      (error) => {
        console.error('Erreur de chargement des demandes', error);
      }
    );
  }
}
