import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-entretien',
  templateUrl: './notification-entretien.component.html',
  styleUrls: ['./notification-entretien.component.css'],
})
export class NotificationEntretienComponent implements OnInit {
  notifications: string[] = [];

  constructor() {}

  ngOnInit() {
  }
}