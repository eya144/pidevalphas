import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FinanceService } from '../finance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-header',
  templateUrl: './back-header.component.html',
  styleUrls: ['./back-header.component.css']
})
export class BackHeaderComponent implements OnInit {
  searchQuery: string = '';
  @Output() searchEvent = new EventEmitter<string>();
  notificationCount: number = 0;
  notifications: string[] = [];
  messages: string[] = [];

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    // S'abonner aux notifications
    this.financeService.getNotifications().subscribe((notifications) => {
      console.log('Notifications reçues:', notifications); // Debugging
      this.notifications = notifications;
      this.notificationCount = notifications.length;
    });
  
    // S'abonner aux messages
    this.financeService.getMessages().subscribe((messages) => {
      console.log('Messages reçus:', messages); // Debugging
      this.messages = messages;
    });
  }
  onSearch() {
    if (this.searchQuery.trim()) {
      this.searchEvent.emit(this.searchQuery);
    }
  }
}
