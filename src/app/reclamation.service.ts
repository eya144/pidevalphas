import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private http = inject(HttpClient);
  private url = 'http://localhost:8083/api/reclamations';

  constructor() {}

  getAll() {
    return this.http.get(this.url);
  }

  getById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  add(reclamation: any) {
    return this.http.post(this.url, reclamation);
  }

  update(id: number, reclamation: any) {
    return this.http.put(`${this.url}/${id}`, reclamation);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  markAsResolved(id: number) {
    return this.http.get(`${this.url}/${id}/resolve`);
  }

  markAsUnresolved(id: number) {
    return this.http.get(`${this.url}/${id}/unresolve`);
  }
}
