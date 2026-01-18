import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectsResponse } from '../models/project.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/projects`;

    getProjects(): Observable<ProjectsResponse> {
        return this.http.get<ProjectsResponse>(this.apiUrl);
    }
}
