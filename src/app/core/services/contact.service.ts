import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest, ContactResponse } from '../models/contact.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/contact`;

    sendContactEmail(data: ContactRequest): Observable<ContactResponse> {
        return this.http.post<ContactResponse>(this.apiUrl, data);
    }
}
