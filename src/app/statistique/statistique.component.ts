import { Component, OnInit } from '@angular/core';
import { StatistiqueServiceService } from '../services/statistique-service.service'; // Assurez-vous que le chemin est correct
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {



  public inspectionsByProjectChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Inspections par Projet',
        data: [],
        backgroundColor: '#4CAF50', // Vert pour représenter les inspections
        borderColor: '#388E3C',
        borderWidth: 1,
      },
    ],
  };
  public inspectionByStatusChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  public inspectionByTypeChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Nombre d\'inspections',
        data: [],
        backgroundColor: '#36A2EB',
      },
    ],
  };

 

  // Données pour les types de non-conformité (graphique en secteur)
  public nonConformityChartData: ChartData<'pie'> = {
    labels: ['Defect Type 1', 'Defect Type 2', 'Defect Type 3'],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4,
        borderWidth: 1,
        borderColor: '#ffffff',
      },
    ],
  };

  // Données pour le statut des non-conformités (graphique en ligne)
  public statutNonConformityChartData: ChartData<'line'> = {
    labels: ['Statut 1', 'Statut 2'],
    datasets: [
      {
        label: 'Non-Conformity Status',
        data: [60, 40],
        borderColor: '#43A047',
        backgroundColor: 'rgba(67, 160, 71, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.3, // Rend la ligne plus lisse
        pointBackgroundColor: '#43A047',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#43A047',
      },
    ],
  };
  

  // Options communes pour tous les graphiques
  public chartOptions: ChartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeOutBounce',
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#ddd',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#ddd',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `Valeur: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        position: 'top',
      },
    },
  };

  constructor(private statistiqueService: StatistiqueServiceService) {}

  ngOnInit(): void {
    this.statistiqueService.getInspectionsByProjectStats().subscribe(
      data => {
        console.log("Données reçues :", data); // Vérifier ce que l'API retourne
  
        if (data && data.length > 0) {
          this.inspectionsByProjectChartData = {
            labels: data.map((item: any) => item.label),
            datasets: [
              {
                label: 'Inspections par Projet',
                data: data.map((item: any) => item.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                borderColor: ['#C2185B', '#1976D2', '#FFA000', '#00897B'],
                borderWidth: 1,
              },
            ],
          };
        } else {
          console.warn("⚠️ Aucune donnée disponible !");
        }
      },
      error => {
        console.error("Erreur lors de la récupération des données :", error);
      }
    );
  
  
    this.fetchNonConformityStats();

    this.fetchStatutNonConformityStats();


    this.statistiqueService.getInspectionsByProjectStats().subscribe(data => {
      this.inspectionsByProjectChartData = {
        labels: data.map((item: any) => item.label),
        datasets: [
          {
            label: 'Inspections par Projet',
            data: data.map((item: any) => item.count),
            backgroundColor: '#4CAF50',
            borderColor: '#388E3C',
            borderWidth: 1,
          },
        ],
      };
    });

  // Charger les statistiques par statut
  this.statistiqueService.getStatutNonConformityStatus().subscribe(data => {
    this.inspectionByStatusChartData = {
      labels: data.map((item: any) => item.label),
      datasets: [
        {
          data: data.map((item: any) => item.count),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    };
  });

  

  // Charger les statistiques par type
  this.statistiqueService.getNonConformityStatstype().subscribe(data => {
    this.inspectionByTypeChartData = {
      labels: data.map((item: any) => item.label),
      datasets: [
        {
          label: 'Nombre d\'inspections',
          data: data.map((item: any) => item.count),
          backgroundColor: '#36A2EB',
        },
      ],
    };
  });




  }


  fetchNonConformityStats() {
    this.statistiqueService.getNonConformityStats().subscribe((data) => {
      this.nonConformityChartData = {
        labels: Object.keys(data),
        datasets: [
          {
            data: Object.values(data),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverOffset: 4,
            borderWidth: 1,
            borderColor: '#ffffff',
          },
        ],
      };
    });
  }

 




  fetchStatutNonConformityStats() {
    this.statistiqueService.getStatutNonConformityStats().subscribe((data) => {
      this.statutNonConformityChartData = {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Non-Conformity Status',
            data: Object.values(data),
            borderColor: '#43A047',
            backgroundColor: 'rgba(67, 160, 71, 0.2)',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#43A047',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#43A047',
          },
        ],
      };
    });
  }

  // Fonction pour obtenir un dégradé de couleurs pour le graphique en barres
  getGradient() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Contexte de dessin non disponible');
    }
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#FF6384');
    gradient.addColorStop(1, '#36A2EB');
    return gradient;
  }
}
