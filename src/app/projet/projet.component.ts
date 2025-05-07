import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjetService } from '../projet.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { Projet } from '../Model/Projet';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projets: Projet[] = [];
  showWeather: boolean = false; 
  currentPage: number = 1;
  itemsPerPage: number = 1;
  stats: any = {};
  chartData: any = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50']
    }]
  };
  chartType: ChartType = 'pie';
  weatherForecast: any = null;

  // Define weatherIconUrl property
  weatherIconUrl: string = '';
  
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => tooltipItem.raw + ' projets'
        }
      }
    },
    scales: {
      y: {
        ticks: {}
      }
    }
  };

  chefProjetMap: { [key: number]: string } = {
    1: 'Hela Ben Amor',
    2: 'Ahmed Zribi',
    3: 'Fares Mansouri',
    4: 'Zaid Khelifi'
  };
  isLoading: boolean = false; // Loading state

  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit(): void {
    this.getProjets();
  }
  

  nomRecherche: string = '';
  statusRecherche: string = '';

  filtrerProjets(): void {
    this.isLoading = true;
    this.projetService.searchProjets(this.nomRecherche, this.statusRecherche).subscribe({
      next: (data: Projet[]) => {
        this.projets = data.map(projet => ({
          ...projet,
          nomChefProjet: this.getChefProjetName(projet.chefProjetId)
        }));
        this.updateChartData();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Erreur lors de la recherche des projets :', err);
        this.isLoading = false;
      }
    });
  }

  getProjets(): void {
    this.isLoading = true;
    this.projetService.getProjets().subscribe({
      next: (data: Projet[]) => {
        this.projets = data.map(projet => ({
          ...projet,
          nomChefProjet: this.getChefProjetName(projet.chefProjetId)
        }));
        this.updateChartData();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Erreur lors de la récupération des projets :', err);
        this.isLoading = false;
      }
    });
  }

  updateChartData(): void {
    const statusCount = {
      TODO: 0,
      DOING: 0,
      DONE: 0,
      SUSPENDED: 0
    };

    this.projets.forEach(projet => {
      if (statusCount[projet.status as keyof typeof statusCount] !== undefined) {
        statusCount[projet.status as keyof typeof statusCount]++;
      }
    });

    this.chartData.labels = Object.keys(statusCount);
    this.chartData.datasets[0].data = Object.values(statusCount);
  }

  getChefProjetName(id: number): string {
    return this.chefProjetMap[id] ?? 'Non attribué';
  }

  pageChanged(page: number): void {
    this.currentPage = page;
  }

  viewMissions(projetId: number): void {
    this.router.navigate([`/projets/${projetId}/missions`]);
  }

  viewDetails(projetId: number): void {
    if (!projetId) {
      console.warn('⚠️ ID du projet invalide.');
      return;
    }
    this.router.navigate(['/details-projet', projetId]);
  }

  ajouterProjet(): void {
    this.router.navigate(['/add-projet']);
  }

  modifierProjet(id: number): void {
    if (!id) {
      console.warn('⚠️ ID du projet invalide.');
      return;
    }
    this.router.navigate([`/edit-projet/${id}`]);
  }

  supprimerProjet(id: number): void {
    if (!id) {
      console.warn('⚠️ ID du projet invalide.');
      return;
    }

    if (confirm('Êtes-vous sûre de vouloir supprimer ce projet ?')) {
      this.projetService.deleteProjet(id).subscribe({
        next: () => {
          console.log(`✅ Projet ${id} supprimé avec succès.`);
          this.getProjets();
        },
        error: (err) => console.error('❌ Erreur lors de la suppression du projet :', err)
      });
    }
  }

  getWeatherForProjet(projetId: number): void {
    this.isLoading = true;
    this.projetService.getProjectWeather(projetId).subscribe({
      next: (weatherData: any) => {
        console.log('Weather Data:', weatherData);
  
        if (weatherData && weatherData.list && weatherData.list.length > 0) {
          const firstForecast = weatherData.list[0];
          this.weatherForecast = {
            condition: firstForecast.weather[0].description,
            temperature: firstForecast.main.temp,
            humidity: firstForecast.main.humidity,
            windSpeed: firstForecast.wind.speed
          };
  
          this.weatherIconUrl = this.getWeatherIconUrl(firstForecast.weather[0].icon);
        } else {
          console.error('❌ Aucune donnée météo disponible.');
          this.weatherForecast = null;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur météo: ", err);
        this.weatherForecast = null;
        this.isLoading = false;
      }
    });
  }

  getWeatherIconUrl(iconId: string): string {
    const iconMapping: { [key: string]: string } = {
      '01d': 'fas fa-sun', // Clear sky day
      '01n': 'fas fa-moon', // Clear sky night
      '02d': 'fas fa-cloud-sun', // Few clouds day
      '02n': 'fas fa-cloud-moon', // Few clouds night
      '03d': 'fas fa-cloud', // Scattered clouds
      '03n': 'fas fa-cloud', // Scattered clouds
      '04d': 'fas fa-cloud-meatball', // Broken clouds
      '04n': 'fas fa-cloud-meatball', // Broken clouds
      '09d': 'fas fa-cloud-showers-heavy', // Showers day
      '09n': 'fas fa-cloud-showers-heavy', // Showers night
      '10d': 'fas fa-cloud-rain', // Rain day
      '10n': 'fas fa-cloud-rain', // Rain night
      '11d': 'fas fa-bolt', // Thunderstorm day
      '11n': 'fas fa-bolt', // Thunderstorm night
      '13d': 'fas fa-snowflake', // Snow day
      '13n': 'fas fa-snowflake', // Snow night
      '50d': 'fas fa-smog', // Mist day
      '50n': 'fas fa-smog' // Mist night
    };
    return iconMapping[iconId] || 'fas fa-sun'; // Default to sunny icon if unknown
  }

  onProjectSelect(projetId: number): void {
    this.showWeather = true; 

    this.getWeatherForProjet(projetId);
  }
  voirRapport(idProjet: number) {
    // Redirection vers la page de rapport
    this.router.navigate(['/rapport', idProjet]);
  }
  
}
