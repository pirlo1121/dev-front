import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest, ContactResponse } from '../models/contact.model';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/contact';

    sendContactEmail(data: ContactRequest): Observable<ContactResponse> {
        return this.http.post<ContactResponse>(this.apiUrl, data);
    }
}
