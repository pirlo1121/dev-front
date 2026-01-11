import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectsResponse } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/projects';

    getProjects(): Observable<ProjectsResponse> {
        return this.http.get<ProjectsResponse>(this.apiUrl);
    }
}
