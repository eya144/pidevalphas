import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { MaterielService } from 'serviceLogistique/materiel.service';

@Component({
  selector: 'app-top-materiel',
  templateUrl: './top-materiel.component.html',
  styleUrls: ['./top-materiel.component.css']
})
export class TopMaterielComponent implements OnInit {
  selectedStat: string = 'topMateriels'; // Affichage par défaut
  topMateriels: any[] = [];
  chart: any;
  categories: string[] = [];
  quantitess: number[] = [];
  chartt: any;

  constructor(private materielService: MaterielService) {}

  ngOnInit(): void {
    this.loadTopMateriels();
    this.getMaterielsParCategorie();
  }

  loadTopMateriels(): void {
    this.materielService.getTopMateriels().subscribe(
      (data) => {
        this.topMateriels = data;
        if (this.selectedStat === 'topMateriels') {
          this.createChart();
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des statistiques', error);
      }
    );
  }

  createChart(): void {
    setTimeout(() => {
      if (this.chart) {
        this.chart.destroy();
      }

      const labels = this.topMateriels.map(m => m.nomMateriel);
      const data = this.topMateriels.map(m => m.quantiteTotale);

      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      if (!ctx) return;

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Quantité demandée',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }, 0);
  }

  getMaterielsParCategorie(): void {
    this.materielService.getMaterielsParCategorie().subscribe(data => {
      this.categories = [];
      this.quantitess = [];

      data.forEach(item => {
        this.categories.push(item[0]);
        this.quantitess.push(item[1]);
      });

      if (this.selectedStat === 'parCategorie') {
        this.createChartt();
      }
    });
  }

  createChartt(): void {
    setTimeout(() => {
      if (this.chartt) {
        this.chartt.destroy();
      }

      const ctx = document.getElementById('materielChart') as HTMLCanvasElement;
      if (!ctx) return;

      this.chartt = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.categories,
          datasets: [{
            label: 'Quantité demandée',
            data: this.quantitess,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem: any) {
                  const total = tooltipItem.chart.data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0);
                  const currentValue = tooltipItem.raw as number;
                  const percentage = Math.floor(((currentValue / total) * 100) + 0.5);

                  return `${currentValue} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    }, 0);
  }

  updateChart(): void {
    if (this.selectedStat === 'topMateriels') {
      this.createChart();
    } else {
      this.createChartt();
    }
  }
}
