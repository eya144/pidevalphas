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

 /*  ngOnInit(): void {
    const idFacture = this.route.snapshot.paramMap.get('id');
    if (idFacture) {
      this.loadFacture(+idFacture); // Conversion en number
    } else {
      this.error = 'ID de facture non fourni';
      this.isLoading = false;
    }
  }*/
    ngOnInit(): void {
      const idParam = this.route.snapshot.paramMap.get('id');
      
      // Add proper validation
      if (!idParam || isNaN(Number(idParam))) {
        this.error = 'Invalid invoice ID format';
        this.isLoading = false;
        return;
      }
    
      const idFacture = Number(idParam);
      this.loadFacture(idFacture);
    }

/*  private loadFacture(idFacture: number): void {
    this.financeService.getFactureById(idFacture).subscribe({
      next: (facture) => {
        if (!facture) {
          throw new Error('Facture non trouvée');
        }
        this.facture = facture;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur complète:', err);
        this.error = err.error?.message || 'Erreur lors du chargement de la facture';
        this.isLoading = false;
      }
    });
  }
*/
private loadFacture(idFacture: number): void {
  this.isLoading = true;
  this.error = null;

  this.financeService.getFactureById(idFacture).subscribe({
      next: (facture) => {
          if (!facture) {
              throw new Error('Réponse vide du serveur');
          }
          this.facture = facture;
          this.isLoading = false;
      },
      error: (err) => {
          console.error('Détails de l\'erreur:', err);
          this.error = err.error?.message || 
                      err.message || 
                      'Erreur serveur lors du chargement';
          this.isLoading = false;
          
          // Journalisation supplémentaire
          if (err.status === 404) {
              console.warn('Facture introuvable - ID:', idFacture);
          }
      }
  });
}

  proceedToPayment(): void {
    if (!this.facture) return;

    this.isLoading = true;
    this.error = null;

    this.stripeService.createCheckoutSession(
      this.facture.idFacture!,
      this.facture.montantTotal
    ).subscribe({
      next: (session) => {
        this.stripeService.redirectToCheckout(session.id).subscribe({
          next: () => {
            // Mettre à jour le statut après paiement réussi
            this.financeService.updateFactureStatus(
              this.facture!.idFacture!,
              'Paid'
            ).subscribe({
              error: (err) => console.error('Erreur mise à jour statut:', err)
            });
          },
          error: (err) => {
            this.handleError('Erreur lors de la redirection Stripe', err);
          }
        });
      },
      error: (err) => {
        this.handleError('Erreur lors de la création de la session', err);
      }
    });
  }

  private handleError(message: string, err: any): void {
    console.error(message, err);
    this.error = message;
    this.isLoading = false;
  }
}