import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FinanceService } from '../finance.service';
import { FichedepaieService } from '../fichedepaie.service';

@Component({
  selector: 'app-admin-back',
  templateUrl: './admin-back.component.html',
  styleUrls: ['./admin-back.component.css']
})
export class AdminBackComponent  implements OnInit {
  paidInvoices: number = 0;
  unpaidInvoices: number = 0;
  totalInvoices: number = 0;
  paidFiches: number = 0; // Nombre de fiches de paie payées
  unpaidFiches: number = 0; // Nombre de fiches de paie impayées
  totalFiches: number = 0; // Nombre total de fiches de paie

  allInvoices: any[] = []; // Liste complète des factures
  filteredInvoices: any[] = []; // Liste filtrée des factures
  allFiches: any[] = []; // Liste complète des fiches de paie
  filteredFiches: any[] = []; // Liste filtrée des fiches de paie

  // Variables pour contrôler l'affichage des barres
  showPaid: boolean = true;
  showUnpaid: boolean = true;
  showTotal: boolean = true;
  showPaidFiche: boolean = true; // Contrôle pour les barres de fiches de paie payées
  showUnpaidFiche: boolean = true; // Contrôle pour les barres de fiches de paie impayées

  constructor(private financeService: FinanceService, private fichedepaieService: FichedepaieService) {}

  ngOnInit(): void {
    this.fetchInvoiceData();
    this.fetchFicheDePaieData(); // Ajouter la récupération des données de fiches de paie
  }

  fetchInvoiceData() {
    this.financeService.getAllFactures().subscribe(
      (factures) => {
        this.allInvoices = factures;
        this.filteredInvoices = factures;
        this.calculateStatistics();
        this.updateBarHeights(); // Mettre à jour les hauteurs des barres
      },
      (error) => {
        console.error('Erreur lors de la récupération des factures', error);
      }
    );
  }

  fetchFicheDePaieData() {
    this.fichedepaieService.getFicheDePaie().subscribe(
      (fiches) => {
        this.allFiches = fiches;
        this.filteredFiches = fiches;
        this.calculateStatistics(); // Calculer les statistiques pour les fiches de paie aussi
        this.updateBarHeights(); // Mettre à jour les hauteurs des barres
      },
      (error) => {
        console.error('Erreur lors de la récupération des fiches de paie', error);
      }
    );
  }

  calculateStatistics() {
    // Statistiques des factures
    this.paidInvoices = this.filteredInvoices.filter(facture => facture.status === 'Paid').length;
    this.unpaidInvoices = this.filteredInvoices.filter(facture => facture.status === 'Unpaid').length;
    this.totalInvoices = this.filteredInvoices.length;

    // Statistiques des fiches de paie
    this.paidFiches = this.filteredFiches.filter(fiche => fiche.statutPaiementL === 'Paid').length;
    this.unpaidFiches = this.filteredFiches.filter(fiche => fiche.statutPaiementL === 'Unpaid').length;
    this.totalFiches = this.filteredFiches.length;
  }

  updateBarHeights() {
    // Mettre à jour les hauteurs des barres pour les factures
    const maxValueInvoices = Math.max(this.paidInvoices, this.unpaidInvoices, this.totalInvoices);
    const paidHeight = (this.paidInvoices / maxValueInvoices) * 100;
    const unpaidHeight = (this.unpaidInvoices / maxValueInvoices) * 100;
    const totalHeight = (this.totalInvoices / maxValueInvoices) * 100;
  
    // Appliquer les hauteurs aux barres des factures
    const paidBar = document.getElementById('paid-bar');
    const unpaidBar = document.getElementById('unpaid-bar');
    const totalBar = document.getElementById('total-bar');
    if (paidBar) paidBar.style.height = `${paidHeight}%`;  // Utiliser "height" au lieu de "setProperty"
    if (unpaidBar) unpaidBar.style.height = `${unpaidHeight}%`;
    if (totalBar) totalBar.style.height = `${totalHeight}%`;
  
    // Mettre à jour les hauteurs des barres pour les fiches de paie
    const maxValueFiches = Math.max(this.paidFiches, this.unpaidFiches, this.totalFiches);
    const paidFicheHeight = (this.paidFiches / maxValueFiches) * 100;
    const unpaidFicheHeight = (this.unpaidFiches / maxValueFiches) * 100;
  
    // Appliquer les hauteurs aux barres des fiches de paie
    const paidFicheBar = document.getElementById('paid-fiche-bar');
    const unpaidFicheBar = document.getElementById('unpaid-fiche-bar');
    if (paidFicheBar) paidFicheBar.style.height = `${paidFicheHeight}%`;
    if (unpaidFicheBar) unpaidFicheBar.style.height = `${unpaidFicheHeight}%`;
  }
  
  onSearch(query: string) {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();

      // Filtrer les factures par statut
      this.filteredInvoices = this.allInvoices.filter(facture =>
        facture.status && facture.status.toLowerCase() === lowerCaseQuery
      );

      // Filtrer les fiches de paie par statut
      this.filteredFiches = this.allFiches.filter(fiche =>
        fiche.statutPaiementL && fiche.statutPaiementL.toLowerCase() === lowerCaseQuery
      );

      // Afficher uniquement la barre correspondante pour les factures
      this.showPaid = lowerCaseQuery === 'paid';
      this.showUnpaid = lowerCaseQuery === 'unpaid';
      this.showTotal = false; // Masquer la barre "Total"

      // Afficher uniquement la barre correspondante pour les fiches de paie
      this.showPaidFiche = lowerCaseQuery === 'paid';
      this.showUnpaidFiche = lowerCaseQuery === 'unpaid';
    } else {
      // Réinitialiser les filtres
      this.filteredInvoices = this.allInvoices;
      this.filteredFiches = this.allFiches;
      this.showPaid = true;
      this.showUnpaid = true;
      this.showTotal = true;
      this.showPaidFiche = true;
      this.showUnpaidFiche = true;
    }

    // Recalculer les statistiques après le filtrage
    this.calculateStatistics();
    this.updateBarHeights(); // Mettre à jour les hauteurs des barres
  }
}