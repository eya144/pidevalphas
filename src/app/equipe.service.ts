import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EquipeService {

    private http = inject(HttpClient);

    private url = 'http://localhost:8083/api/equipes';

    private usersListUrl = 'http://localhost:8083/api/usr/list';

    constructor() { }


    //get all equipe
    getAll() {
        return this.http.get(this.url);
    }

    //delete equipe
    delete(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    //add equipe
    add(equipe: any) {
        return this.http.post(this.url, equipe);
    }

    //update equipe
    update(id: number, data: any) {
        return this.http.put(this.url + '/' + id, data);
    }

    //get equipe by id
    getById(id: number) {
        return this.http.get(this.url + '/' + id);
    }

    //add member to equipe
    addMember(equipeId: number, userId: number) {
        return this.http.post(this.url + '/' + equipeId + '/addMember/' + userId, {});
    }

    //remove member from equipe
    removeMember(equipeId: number, userId: number) {
        return this.http.post(this.url + '/' + equipeId + '/removeMember/' + userId, {});
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