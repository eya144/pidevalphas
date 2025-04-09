import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaiementService } from '../paiement.service';
import { Paiement } from '../core/models/Paiement';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from '../stripe.service';
import { FinanceService } from '../finance.service';
import { Facture } from '../core/models/Factures';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  facture: Facture | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private financeService: FinanceService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (!idParam || isNaN(Number(idParam))) {
      this.error = 'Invalid invoice ID format';
      this.isLoading = false;
      return;
    }
  
    const idFacture = Number(idParam);
    this.loadFacture(idFacture);
  }

  private loadFacture(idFacture: number): void {
    this.isLoading = true;
    this.error = null;

    this.financeService.getFactureById(idFacture).subscribe({
      next: (facture) => {
        this.facture = facture;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading invoice:', err);
        this.error = err.error?.message || err.message || 'Error loading invoice';
        this.isLoading = false;
      }
    });
  }

  async proceedToPayment(): Promise<void> {
    if (!this.facture) return;

    this.isLoading = true;
    this.error = null;

    try {
      const session = await this.stripeService.createCheckoutSession(
        this.facture.idFacture!,
        this.facture.montantTotal
      ).toPromise();

      await this.stripeService.redirectToCheckout(session.id);
      
      // Update invoice status after successful payment
      this.financeService.updateFactureStatus(
        this.facture.idFacture!,
        'Paid'
      ).subscribe({
        error: (err) => console.error('Error updating invoice status:', err)
      });
    } catch (err) {
      console.error('Payment error:', err);
      this.error = 'Payment failed. Please try again.';
      this.isLoading = false;
    }
  }
}