import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private stompClient: Client;

  constructor(private toastr: ToastrService) {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8087/pidev/ws/tasks',
      connectHeaders: {},
      debug: (str) => console.log(str), // Vérifiez si cette ligne logue bien les événements de connexion WebSocket
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      webSocketFactory: () => new SockJS('http://localhost:8087/pidev/ws/tasks')
    });
  
    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/tasks', (message: IMessage) => {
        this.showNotification(message.body);  // Affichage de la notification via ngx-toastr
      });
    };
  
    this.stompClient.activate();
  }
  

  showNotification(message: string) {
    this.toastr.info(message, 'Notification', {
      closeButton: true,
      timeOut: 5000,
      progressBar: true
    });
  }
  
}
