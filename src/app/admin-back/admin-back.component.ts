import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
@Component({
  selector: 'app-admin-back',
  templateUrl: './admin-back.component.html',
  styleUrls: ['./admin-back.component.css']
})
export class AdminBackComponent  implements OnInit {

  selectedChart: string = 'bar'; // Default selected chart
  percentageChartType: ChartType = 'doughnut';
  percentageChartData: ChartData<'doughnut'> = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [45, 55],
      backgroundColor: ['#f39c12', '#ecf0f1']
    }]
  };
  
  percentageChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    }
  };
  // Bar Chart
  barChartType: ChartType = 'bar';
  barChartLabels: string[] = ['Total', 'Paid', 'Unpaid'];
  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [0, 0, 0], label: 'Invoices', backgroundColor: ['#7E57C2', '#AB47BC', '#BA68C8']
      }
    ]
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true } }
  };

  // Line Chart (Sine Wave)
  lineChartType: ChartType = 'line';
  lineChartLabels: string[] = [];
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Sine Wave (Total Invoices)',
        borderColor: '#42A5F5',
        fill: false
      }
    ]
  };
  lineChartOptions: ChartOptions = {
    responsive: true,
    elements: { line: { tension: 0.4 } },
    plugins: { legend: { display: true } },
    scales: { y: { beginAtZero: true } }
  };

  // Pie Chart (Circular)
  pieChartType: ChartType = 'pie';
  pieChartData: ChartData<'pie'> = {
    labels: ['Paid', 'Unpaid'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#7E57C2', '#AB47BC']
      }
    ]
  };
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  invoices: any[] = [];
  filteredInvoices: any[] = [];

  paidInvoices = 0;
  unpaidInvoices = 0;
  totalInvoices = 0;

  ngOnInit(): void {
    this.fetchInvoiceData();
    this.calculatePaySlipStatistics();
  }

  fetchInvoiceData() {
    this.filteredInvoices = [
      { status: 'Paid' },
      { status: 'Unpaid' },
 
    ];
    this.calculateStatistics();
  }

  calculateStatistics() {
    this.paidInvoices = this.filteredInvoices.filter(f => f.status === 'Paid').length;
    this.unpaidInvoices = this.filteredInvoices.filter(f => f.status === 'Unpaid').length;
    this.totalInvoices = this.filteredInvoices.length;

    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: [this.totalInvoices, this.paidInvoices, this.unpaidInvoices],
          label: 'Invoices',
          backgroundColor: ['#7E57C2', '#AB47BC', '#BA68C8']
        }
      ]
    };

    this.pieChartData = {
      labels: ['Paid', 'Unpaid'],
      datasets: [
        {
          data: [this.paidInvoices, this.unpaidInvoices],
          backgroundColor: ['#7E57C2', '#AB47BC']
        }
      ]
    };

    this.generateSineWave();
  }

  generateSineWave() {
    const points = 30;
    const labels: string[] = [];
    const data: number[] = [];

    for (let i = 0; i < points; i++) {
      labels.push(`Point ${i + 1}`);
      data.push(Math.round((Math.sin(i * 0.3) + 1) * (this.totalInvoices / 2)));
    }

    this.lineChartLabels = labels;
    this.lineChartData = {
      labels: this.lineChartLabels,
      datasets: [
        {
          data,
          label: 'Sine Wave (Total Invoices)',
          borderColor: '#7E57C2',
          fill: false
        }
      ]
    };
  }

  onChartTypeChange() {
    // Refresh the data if needed when chart type changes
    this.calculateStatistics();
  }

  onSearch(searchValue: string): void {
    console.log('Search event triggered:', searchValue);
    // Implémenter la logique de recherche ici
  }
  // === Pay Slip Charts ===
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
  datasets: [
    {
      data: [0, 0, 0],
      label: 'Pay Slips',
      backgroundColor: ['#4CAF50', '#81C784', '#A5D6A7']
    }
  ]
};

payPieChartData: ChartData<'pie'> = {
  labels: ['Generated', 'Not Generated'],
  datasets: [
    {
      data: [0, 0],
      backgroundColor: ['#4CAF50', '#81C784']
    }
  ]
};

paySlips: any[] = [];
generatedPaySlips = 0;
notGeneratedPaySlips = 0;
totalPaySlips = 0;

calculatePaySlipStatistics() {
  // Fake data (à remplacer par une vraie récupération API plus tard)
  this.paySlips = [
    { status: 'Generated' },
    { status: 'Not Generated' },
    { status: 'Generated' },
    { status: 'Generated' }
  ];

  this.generatedPaySlips = this.paySlips.filter(p => p.status === 'Generated').length;
  this.notGeneratedPaySlips = this.paySlips.filter(p => p.status === 'Not Generated').length;
  this.totalPaySlips = this.paySlips.length;
// Dans calculateStatistics()
this.totalInvoices = this.filteredInvoices.length;
this.paidInvoices = this.filteredInvoices.filter(f => f.status === 'Paid').length;

// Dans calculatePaySlipStatistics()
this.totalPaySlips = this.paySlips.length;
this.generatedPaySlips = this.paySlips.filter(p => p.status === 'Generated').length;
  this.payBarChartData = {
    labels: ['Total', 'Generated', 'Not Generated'],
    datasets: [
      {
        data: [this.totalPaySlips, this.generatedPaySlips, this.notGeneratedPaySlips],
        label: 'Pay Slips',
        backgroundColor: ['#4CAF50', '#81C784', '#A5D6A7']
      }
    ]
  };

  this.payPieChartData = {
    labels: ['Generated', 'Not Generated'],
    datasets: [
      {
        data: [this.generatedPaySlips, this.notGeneratedPaySlips],
        backgroundColor: ['#4CAF50', '#81C784']
      }
    ]
  };
}

}