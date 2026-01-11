import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserResponse } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/get';

    getUser(id: string): Observable<IUserResponse> {
        return this.http.get<IUserResponse>(`${this.apiUrl}/${id}`);
    }
}
