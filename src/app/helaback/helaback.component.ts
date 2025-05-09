import { Component , OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ProjetService } from '../projet.service';
import { Projet } from '../Model/Projet';

@Component({
  selector: 'app-helaback',
  templateUrl: './helaback.component.html',
  styleUrls: ['./helaback.component.css']
})
export class HelabackComponent implements OnInit {
    projets: Projet[] = []; // Pour stocker les projets
    stats: { [key: string]: number } = {}; // Pour stocker les statistiques des projets
    chartType: ChartType = 'pie'; // Type de graphique par défaut
    chartData: any = {
      labels: ['To Do', 'Doing', 'Done', 'Suspended'],
      datasets: [
        {
          label: 'Nombre de projets',
          data: [], // Rempli dynamiquement
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        },
      ],
    };
    chartOptions: ChartConfiguration['options'] = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} projets`,
          },
        },
      },
    };
  
    constructor(private projetService: ProjetService) {}
  
    ngOnInit(): void {
      this.loadProjets(); // Charger les projets au démarrage
    }
  
    // Charger les projets
    loadProjets(): void {
      this.projetService.getProjets().subscribe({
        next: (projets) => {
          this.projets = projets;
          this.calculateStats(); // Calculer les statistiques après avoir chargé les projets
        },
        error: (err) => {
          console.error('Erreur lors du chargement des projets :', err);
        },
      });
    }
  
    // Calculer les statistiques des projets
    calculateStats(): void {
      const statusCount = {
        TODO: 0,
        DOING: 0,
        DONE: 0,
        SUSPENDED: 0,
      };
  
      this.projets.forEach((projet) => {
        if (statusCount[projet.status as keyof typeof statusCount] !== undefined) {
          statusCount[projet.status as keyof typeof statusCount]++;
        }
      });
  
      this.stats = statusCount;
      this.chartData.datasets[0].data = [
        statusCount.TODO,
        statusCount.DOING,
        statusCount.DONE,
        statusCount.SUSPENDED,
      ];
    }
  
    // Changer le type de graphique
    changeChartType(type: ChartType): void {
      this.chartType = type;
    }

}