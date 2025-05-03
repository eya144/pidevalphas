import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private backendUrl = 'http://localhost:8089/pidev/Api/paiement';
  private stripePromise: Promise<Stripe | null>;
  
  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe('pk_test_51Qy2JjKpCQHkABgKARu62V68rkleu9aMJPS5sPQhG0i7llQ52C9wsHm5sPtwyg0C7sice93CFKXKVCqAAJhMX03X00oOdAFYjL');
  }

  createCheckoutSession(factureId: number, amount: number): Observable<{id: string}> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
     // 'Accept': 'application/json'
    });
  
    const body = {
      factureId,
      amount: Math.round(amount * 100), // Stripe expects the amount in cents
      currency: 'eur',
      successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/cancel`,
      metadata: { factureId: factureId.toString() }
    };
  
    return this.http.post<{id: string}>(
      `${this.backendUrl}/create-checkout-session`,
      body,
      { headers }
    ).pipe(
      catchError(error => {
        console.error('Error creating checkout session:', error);
        throw error;
      })
    );
  }

  async redirectToCheckout(sessionId: string): Promise<void> {
    const stripe = await this.stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe initialization failed');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      throw error;
    }
  }
}