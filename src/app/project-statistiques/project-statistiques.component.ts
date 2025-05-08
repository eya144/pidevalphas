import { Component, OnInit } from '@angular/core';
import { CahierDesChargesServiceService } from '../services/cahier-des-charges-service.service';
import { ChartData, ChartOptions } from 'chart.js';
import { StatistiqueServiceService } from '../services/statistique-service.service';

@Component({
  selector: 'app-project-statistiques',
  templateUrl: './project-statistiques.component.html',
  styleUrls: ['./project-statistiques.component.css']
})
export class ProjectStatistiquesComponent implements OnInit {
  chartData: ChartData<'pie'> | undefined;
  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Requirement Book : Validated vs No Validated',
      }
    }
  };

  barChartData: ChartData<'bar'> | undefined;
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Number of Requirement Books per Architect',
      }
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    }
  };

  constructor(private cahierService: StatistiqueServiceService) {}

  ngOnInit(): void {
    this.loadCahierParUserStats();
    this.loadStats();
  }
  loadCahierParUserStats(): void {
    this.cahierService.getCahierParUserStats().subscribe(stats => {
      console.log(stats);  // Vérifie les données dans la console
  
      const userNames = stats.map((stat: any) => stat.userName);
      const counts = stats.map((stat: any) => stat.count);
  
      this.barChartData = {
        labels: userNames,
        datasets: [{
          label: 'Number of Requirement Books',
          data: counts,
          backgroundColor: '#4CAF50',
        }]
      };
    });
  }
  
  loadStats(): void {
    this.cahierService.getStats().subscribe(stats => {
      this.chartData = {
        labels: ['Validated', 'No Validated'],
        datasets: [{
          data: [stats.validated, stats.notValidated],
          backgroundColor: ['#4CAF50', '#F44336'],
        }]
      };
    });
  }
}
