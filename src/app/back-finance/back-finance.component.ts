import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-back-finance',
  templateUrl: './back-finance.component.html',
  styleUrls: ['./back-finance.component.css']
})
export class BackFinanceComponent implements OnInit {
  // Variables pour stocker les statistiques
  paidInvoices: number = 0;
  unpaidInvoices: number = 0;
  totalInvoices: number = 0;

  constructor(private financeService: FinanceService) {} // Injectez le service

  ngOnInit(): void {
    this.fetchInvoiceData(); // Récupérez les données au chargement du composant
  }

  fetchInvoiceData() {
    // Appelez le service pour récupérer les factures
    this.financeService.getAllFactures().subscribe(
      (factures) => {
        // Calculez les statistiques
        this.paidInvoices = factures.filter(facture => facture.status === 'Paid').length;
        this.unpaidInvoices = factures.filter(facture => facture.status === 'Unpaid').length;
        this.totalInvoices = this.paidInvoices + this.unpaidInvoices;
      },
      (error) => {
        console.error('Erreur lors de la récupération des factures', error);
      }
    );
  }
}