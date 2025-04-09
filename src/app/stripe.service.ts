import { Injectable, Inject  } from '@angular/core';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;
  private apiUrl = 'http://localhost:8089/pidev/Api/paiement'; 

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe('pk_test_51Qy2JjKpCQHkABgKARu62V68rkleu9aMJPS5sPQhG0i7llQ52C9wsHm5sPtwyg0C7sice93CFKXKVCqAAJhMX03X00oOdAFYjL'); 
  }

  // Méthode pour créer une session de paiement
  createCheckoutSession(factureId: number, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-checkout-session`, {
        factureId,
        amount: Math.round(amount * 100), // Convertir en cents et en nombre
        currency: 'eur',
        successUrl: `${window.location.origin}/paiement/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/paiement/cancel`
    });
}

  // Méthode pour rediriger vers le checkout Stripe
  redirectToCheckout(sessionId: string): Observable<{error?: {message: string}}> {
    return from(this.stripePromise).pipe(
      switchMap(stripe => {
        if (!stripe) {
          throw new Error('Stripe n\'a pas pu être initialisé');
        }
        return from(stripe.redirectToCheckout({ sessionId })).pipe(
          switchMap(result => {
            if (result.error) {
              return from([{ error: { message: result.error.message || 'An unknown error occurred' } }]);
            }
            return from([{}]);
          })
        );
      })
    );
  }

  // Méthode pour créer un payment intent (si vous utilisez Elements)
  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment-intent`, {
      amount: amount * 100,
      currency: 'eur'
    });
  }
}