import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-admin-back',
  templateUrl: './admin-back.component.html',
  styleUrls: ['./admin-back.component.css']
})
export class AdminBackComponent  implements OnInit {
  paidInvoices: number = 0;
  unpaidInvoices: number = 0;
  totalInvoices: number = 0;
  allInvoices: any[] = []; // Liste complète des factures
  filteredInvoices: any[] = []; // Liste filtrée des factures

  // Variables pour contrôler l'affichage des barres
  showPaid: boolean = true;
  showUnpaid: boolean = true;
  showTotal: boolean = true;

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.fetchInvoiceData();
  }

  fetchInvoiceData() {
    this.financeService.getAllFactures().subscribe(
      (factures) => {
        this.allInvoices = factures; // Stocker toutes les factures
        this.filteredInvoices = factures; // Initialiser la liste filtrée
        this.calculateStatistics();
        this.updateBarHeights(); // Mettre à jour les hauteurs des barres
      },
      (error) => {
        console.error('Erreur lors de la récupération des factures', error);
      }
    );
  }

  calculateStatistics() {
    this.paidInvoices = this.filteredInvoices.filter(facture => facture.status === 'Paid').length;
    this.unpaidInvoices = this.filteredInvoices.filter(facture => facture.status === 'Unpaid').length;
    this.totalInvoices = this.filteredInvoices.length; // Total des factures filtrées
  }

  updateBarHeights() {
    const maxValue = Math.max(this.paidInvoices, this.unpaidInvoices, this.totalInvoices);

    // Calculer les hauteurs en pourcentage
    const paidHeight = (this.paidInvoices / maxValue) * 100;
    const unpaidHeight = (this.unpaidInvoices / maxValue) * 100;
    const totalHeight = (this.totalInvoices / maxValue) * 100;

    // Appliquer les hauteurs aux barres
    const paidBar = document.getElementById('paid-bar');
    const unpaidBar = document.getElementById('unpaid-bar');
    const totalBar = document.getElementById('total-bar');

    if (paidBar) paidBar.style.setProperty('--bar-height', `${paidHeight}%`);
    if (unpaidBar) unpaidBar.style.setProperty('--bar-height', `${unpaidHeight}%`);
    if (totalBar) totalBar.style.setProperty('--bar-height', `${totalHeight}%`);
  }

  onSearch(query: string) {
    if (query) {
      // Convertir la requête en minuscules pour une recherche insensible à la casse
      const lowerCaseQuery = query.toLowerCase();

      // Filtrer les factures par statut
      this.filteredInvoices = this.allInvoices.filter(facture =>
        facture.status && facture.status.toLowerCase() === lowerCaseQuery
      );

      // Afficher uniquement la barre correspondante
      this.showPaid = lowerCaseQuery === 'paid';
      this.showUnpaid = lowerCaseQuery === 'unpaid';
      this.showTotal = false; // Masquer la barre "Total"
    } else {
      // Si la recherche est vide, afficher toutes les barres
      this.filteredInvoices = this.allInvoices;
      this.showPaid = true;
      this.showUnpaid = true;
      this.showTotal = true;
    }

    // Recalculer les statistiques après le filtrage
    this.calculateStatistics();
    this.updateBarHeights(); // Mettre à jour les hauteurs des barres
  }
  
}