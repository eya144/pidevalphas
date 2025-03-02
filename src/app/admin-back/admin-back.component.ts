import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-admin-back',
  templateUrl: './admin-back.component.html',
  styleUrls: ['./admin-back.component.css']
})
export class AdminBackComponent implements OnInit {
  // Variables pour stocker les statistiques
  paidInvoices: number = 0;
  unpaidInvoices: number = 0;
  totalInvoices: number = 0;


  constructor(private financeService: FinanceService , router: Router) {} // Injectez le service

  ngOnInit(): void {
    this.fetchInvoiceData(); 

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
