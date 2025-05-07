import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { RapportService } from '../rapport.service';


@Component({
  selector: 'app-rapport-projet',
  templateUrl: './rapport-projet.component.html',
  styleUrls: ['./rapport-projet.component.css']
})
export class RapportProjetComponent implements OnInit {
  rapport: any;
  projetId = 1;

  pieChartLabels: string[] = ['TODO', 'DOING', 'DONE', 'SUSPENDED'];
  pieChartData: number[] = [];
  pieChartType: ChartType = 'pie';

  barChartLabels: string[] = [];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [],
        label: 'Avancement des missions',
        backgroundColor: '#3f51b5'
      }
    ]
  };

  lineChartLabels: string[] = [];
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.lineChartLabels,
    datasets: [
      {
        data: [],
        label: 'Progression mensuelle',
        fill: false,
        borderColor: '#4caf50',
        tension: 0.4
      }
    ]
  };

  radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['Mission 1', 'Mission 2', 'Mission 3'],
    datasets: [
      {
        label: 'Avancement (%)',
        data: [40, 70, 90],
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        pointBackgroundColor: 'rgba(54,162,235,1)'
      }
    ]
  };

  radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  constructor(
    private rapportService: RapportService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.rapportService.getRapportProjet(this.projetId).subscribe((data) => {
      this.rapport = data;
      this.generateChartData();
    });
  }

  generateChartData(): void {
    const missionLabels: string[] = [];
    const missionProgress: number[] = [];
    const taskStatusCounts = { TODO: 0, DOING: 0, DONE: 0, SUSPENDED: 0 };

    this.rapport?.missions?.forEach((m: any) => {
      missionLabels.push(m.nom);
      missionProgress.push(m.progression);

      m.taches?.forEach((t: any) => {
        taskStatusCounts[t.etatTache as keyof typeof taskStatusCounts]++;
      });
    });

    this.radarChartData.labels = missionLabels;
    this.radarChartData.datasets[0].data = missionProgress;

    this.pieChartData = [
      taskStatusCounts.TODO,
      taskStatusCounts.DOING,
      taskStatusCounts.DONE,
      taskStatusCounts.SUSPENDED
    ];

    this.barChartLabels = missionLabels;
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: missionProgress,
          label: 'Avancement des missions',
          backgroundColor: '#3f51b5'
        }
      ]
    };

    this.lineChartLabels = ['Jan', 'Feb', 'Mar', 'Apr'];
    this.lineChartData = {
      labels: this.lineChartLabels,
      datasets: [
        {
          data: [50, 60, 70, 80],
          label: 'Progression mensuelle',
          fill: false,
          borderColor: '#4caf50',
          tension: 0.4
        }
      ]
    };
  }

  exportToExcel(): void {
    const data: any[] = [];
    this.rapport?.missions?.forEach((m: any) => {
      m.taches?.forEach((t: any) => {
        data.push({
          Mission: m.nom,
          Tâche: t.nom,
          Statut: t.etatTache,
          Responsable: t.responsableId
        });
      });
    });
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { Rapport: worksheet }, SheetNames: ['Rapport'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    FileSaver.saveAs(new Blob([excelBuffer]), `rapport-projet-${this.projetId}.xlsx`);
    this.toastr.success('Export Excel réussi');
  }

  exportToPDF(): void {
    const panels = document.querySelectorAll('mat-expansion-panel');
    panels.forEach((panel: any) => panel.open?.());

    const data = document.getElementById('rapportToPrint');
    if (!data) {
      this.toastr.error('Element with ID "rapportToPrint" not found');
      return;
    }

    setTimeout(() => {
      html2canvas(data, { scale: 2, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let position = 0;
        let remainingHeight = imgHeight;

        while (remainingHeight > 0) {
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          remainingHeight -= pdf.internal.pageSize.getHeight();
          if (remainingHeight > 0) {
            pdf.addPage();
            position = -pdf.internal.pageSize.getHeight();
          }
        }

        pdf.save(`rapport-projet-${this.projetId}.pdf`);
        this.toastr.success('Export PDF réussi');
      });
    }, 500);
  }
  sendReportByEmail() {
    html2canvas(document.getElementById('rapportProjet')!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = canvas.height * pdfWidth / canvas.width;
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const pdfBlob = doc.output('blob');
  
      const formData = new FormData();
      formData.append('file', pdfBlob, 'rapport.pdf');
      formData.append('email', 'email@destinataire.com'); // tu peux rendre ça dynamique
  
      this.http.post('http://localhost:8081/api/email/send-report', formData).subscribe(
        () => this.toastr.success('Email envoyé avec succès !'),
        () => this.toastr.error('Erreur lors de l’envoi du mail')
      );
    });
  }
  
  
}