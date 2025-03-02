import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>(''); // Sujet pour stocker la valeur de recherche
  search$ = this.searchSubject.asObservable(); // Observable pour écouter les changements

  // Méthode pour mettre à jour la valeur de recherche
  setSearchQuery(query: string) {
    this.searchSubject.next(query);
  }
}
