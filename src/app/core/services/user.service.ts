import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserResponse } from '../models/user.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/get`;

    getUser(id: string): Observable<IUserResponse> {
        return this.http.get<IUserResponse>(`${this.apiUrl}/${id}`);
    }
}
