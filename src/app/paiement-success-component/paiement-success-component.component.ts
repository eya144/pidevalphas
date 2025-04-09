import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paiement-success-component',
  templateUrl: './paiement-success-component.component.html',
  styleUrls: ['./paiement-success-component.component.css']
})
export class PaiementSuccessComponentComponent implements OnInit {
  sessionId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.queryParamMap.get('session_id');
  }
}
