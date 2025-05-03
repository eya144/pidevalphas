import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaiementService } from '../paiement.service';
import { Paiement } from '../core/models/Paiement';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from '../stripe.service';
import { FinanceService } from '../finance.service';
import { Facture } from '../core/models/Factures';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

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

 /* ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (!idParam || isNaN(Number(idParam))) {
      this.error = 'Invalid invoice ID format';
      this.isLoading = false;
      return;
    }
  
    const idFacture = Number(idParam);
    this.loadFacture(idFacture);
  }  */
    ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        this.loadFacture(Number(idParam));
      }
    }

 /* private loadFacture(idFacture: number): void {
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
  } */
    private loadFacture(idFacture: number): void {
      this.isLoading = true;
      this.financeService.getFactureById(idFacture).subscribe({
        next: (facture) => {
          this.facture = facture;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erreur chargement facture:', err);
          this.error = 'Erreur lors du chargement de la facture';
          this.isLoading = false;
        }
      });
    }

 /* async proceedToPayment(): Promise<void> {
    if (!this.facture) return;
  
    this.isLoading = true;
    this.error = null;
  
    try {
      const response = await lastValueFrom(
        this.stripeService.createCheckoutSession(
          this.facture.idFacture!,
          this.facture.montantTotal
        )
      );
  
      await this.stripeService.redirectToCheckout(response.id);
      
    } catch (err: any) {
      console.error('Payment error:', err);
      this.error = err.error?.message || err.message || 'Payment failed';
      this.isLoading = false;
    }
  } */
    async proceedToPayment(): Promise<void> {
      if (!this.facture) return;
  
      this.isLoading = true;
      this.error = null;
  
      try {
        // Créer la session de paiement
        const session = await lastValueFrom(
          this.stripeService.createCheckoutSession(
            this.facture.idFacture!,
            this.facture.montantTotal
          )
        );
  
        // Rediriger vers Stripe
        await this.stripeService.redirectToCheckout(session.id);
      } catch (err: any) {
        console.error('Erreur paiement:', err);
        this.error = 'Erreur lors du processus de paiement';
        this.isLoading = false;
      }
    }
}