import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: any;
  private url = 'http://localhost:3000'; // Assurez-vous d'utiliser votre URL du serveur WebSocket.

  constructor() {
    this.socket = io(this.url);
  }

  // Écouter un événement de tâche mise à jour
  listenToTaskUpdate() {
    return new Observable((observer) => {
      this.socket.on('task-updated', (data: any) => {
        observer.next(data);
      });
    });
  }

  // Simuler un envoi d'événement de tâche mise à jour
  sendTaskUpdateNotification(taskId: number) {
    this.socket.emit('task-updated', { taskId });
  }
}
