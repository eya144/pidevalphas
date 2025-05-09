import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-back-fichedepaie',
  templateUrl: './back-fichedepaie.component.html',
  styleUrls: ['./back-fichedepaie.component.css']
})
export class BackFichedepaieComponent implements OnInit {
  selectedPayChart: string = 'bar';

  payBarChartType: ChartType = 'bar';
  payPieChartType: ChartType = 'pie';

  payBarChartOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true } }
  };

  payPieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  payBarChartData: ChartData<'bar'> = {
    labels: ['Total', 'Generated', 'Not Generated'],
    datasets: [{
      data: [0, 0, 0],
      label: 'Pay Slips',
      backgroundColor: ['#4CAF50', '#81C784', '#A5D6A7']
    }]
  };

  payPieChartData: ChartData<'pie'> = {
    labels: ['Generated', 'Not Generated'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#4CAF50', '#81C784']
    }]
  };

  paySlips: any[] = [];
  generatedPaySlips = 0;
  notGeneratedPaySlips = 0;
  totalPaySlips = 0;

  ngOnInit(): void {
    this.calculatePaySlipStatistics();
  }

  calculatePaySlipStatistics() {
    this.paySlips = [
      { status: 'Generated' },
      { status: 'Not Generated' },
      { status: 'Generated' },
      { status: 'Generated' }
    ];

    this.generatedPaySlips = this.paySlips.filter(p => p.status === 'Generated').length;
    this.notGeneratedPaySlips = this.paySlips.filter(p => p.status === 'Not Generated').length;
    this.totalPaySlips = this.paySlips.length;

    this.payBarChartData.datasets[0].data = [
      this.totalPaySlips,
      this.generatedPaySlips,
      this.notGeneratedPaySlips
    ];

    this.payPieChartData.datasets[0].data = [
      this.generatedPaySlips,
      this.notGeneratedPaySlips
    ];
  }
}
