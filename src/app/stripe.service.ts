import { Injectable, Inject  } from '@angular/core';
import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private backendUrl = 'http://localhost:8089/pidev/Api/paiement';
  
  constructor(private http: HttpClient) {}
  createCheckoutSession(factureId: number, amount: number): Observable<any> {
    return this.http.post(`${this.backendUrl}/create-checkout-session`, {
      factureId,
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'eur',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`
    });
  }

  async redirectToCheckout(sessionId: string): Promise<void> {
    const stripe = await loadStripe('pk_test_51Qy2JjKpCQHkABgKARu62V68rkleu9aMJPS5sPQhG0i7llQ52C9wsHm5sPtwyg0C7sice93CFKXKVCqAAJhMX03X00oOdAFYjL');
    
    if (!stripe) {
      throw new Error('Stripe initialization failed');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      throw error;
    }
  }
}