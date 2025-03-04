import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  public notifications: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() {
    this.stompClient = over(new SockJS('http://localhost:8082/pidev/ws'));
    this.stompClient.onConnect = (frame) => {
      this.stompClient.subscribe('/topic/notifications', (message) => {
        const currentNotifications = this.notifications.getValue();
        currentNotifications.push(message.body);
        this.notifications.next(currentNotifications);
      });
    };
    this.stompClient.activate();
  }

  public getNotifications() {
    return this.notifications.asObservable();
  }
}

function over(arg0: WebSocket): Client {
  throw new Error('Function not implemented.');
}
