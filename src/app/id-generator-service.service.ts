import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorServiceService {
  private idCounter: number = 1;

  generateId(): number {
    return this.idCounter++;
  }
  constructor() { }
}
