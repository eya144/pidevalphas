import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeService } from '../stripe.service';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-paiement-success-component',
  templateUrl: './paiement-success-component.component.html',
  styleUrls: ['./paiement-success-component.component.css']
})
export class PaiementSuccessComponentComponent implements OnInit {
  sessionId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stripeService: StripeService,
    private financeService: FinanceService
  ) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
  }
}
