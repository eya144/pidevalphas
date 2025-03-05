import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionCorrectiveService } from '../services/action-corrective.service';
import { ActionCorrective } from '../models/Inspection.model';

@Component({
  selector: 'app-action-detail',
  templateUrl: './action-detail.component.html',
  styleUrls: ['./action-detail.component.css']
})
export class ActionDetailComponent implements OnInit {
  action: ActionCorrective | null = null;

  constructor(
    private route: ActivatedRoute,
    private actionService: ActionCorrectiveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.actionService.getActionById(id).subscribe(data => {
        this.action = data;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/inspections']);


  }
}
