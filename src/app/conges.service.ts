import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CongesService {

    private http = inject(HttpClient);

    private url = 'http://localhost:8090/api/conges';

    private usersListUrl = 'http://localhost:8090/api/usr/list';


    constructor() { }


    //get all conges
    getAll() {
        return this.http.get(this.url);
    }

    //get conges by id
    getById(id: number) {
        return this.http.get(this.url + '/' + id);
    }

    //delete conges
    delete(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    //add conges
    add(equipe: any) {
        return this.http.post(this.url, equipe);
    }

    //update conges
    update(id: number, data: any) {
        return this.http.put(this.url + '/' + id, data);
    }

    getUsers() {
        return this.http.get(this.usersListUrl).pipe(
          catchError(error => {
            console.error('Request failed', error);
            return throwError(error);
          })
        );
      }
      



}