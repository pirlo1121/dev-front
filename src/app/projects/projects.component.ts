import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../services/project.service';
import { IProjectResponse } from '../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="projects-container">
      <h2>My Projects</h2>
      
      <div class="projects-grid">
        @for (project of paginatedProjects(); track project._id) {
          <div class="project-card">
            <img [src]="project.image || 'assets/project-placeholder.jpg'" [alt]="project.name">
            <div class="card-content">
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <div class="tags">
                <span *ngFor="let stack of project.stack" class="tag">{{ stack }}</span>
              </div>
              <div class="links">
                <a [href]="project.repository" target="_blank" class="btn">GitHub</a>
                <a *ngIf="project.deploy" [href]="project.deploy" target="_blank" class="btn btn-primary">Live Demo</a>
              </div>
            </div>
          </div>
        } @empty {
          <p>No projects found.</p>
        }
      </div>

      <div class="pagination-controls" *ngIf="projects().length > itemsPerPage">
        <button (click)="prevPage()" [disabled]="currentPage() === 1" class="btn-nav">Previous</button>
        <span class="page-indicator">Page {{ currentPage() }} of {{ totalPages() }}</span>
        <button (click)="nextPage()" [disabled]="currentPage() === totalPages()" class="btn-nav">Next</button>
      </div>

    </section>
  `,
  styles: [`
    .projects-container {
      padding: 4rem 2rem;
      min-height: 100vh;
      background: var(--surface-bg); /* Use surface for this one to alternate? Or bg? Let's use surface. */
      color: var(--text-color);
      text-align: center;
      transition: background-color 0.3s;
    }
    h2 { font-size: 2.5rem; margin-bottom: 2rem; color: var(--text-color); }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      margin-bottom: 2rem;
    }
    .project-card {
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--card-shadow);
      transition: transform 0.3s;
      background: var(--bg-color); /* Card on surface */
      display: flex;
      flex-direction: column;
    }
    .project-card:hover { transform: translateY(-5px); }
    .project-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .card-content { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
    h3 { margin-top: 0; color: var(--text-color); }
    p { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1rem; flex-grow: 1; text-align: left; }
    .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
    .tag { background: var(--surface-bg); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; color: var(--text-secondary); border: 1px solid var(--border-color); }
    .links { display: flex; gap: 1rem; justify-content: flex-start; }
    .btn { text-decoration: none; padding: 0.5rem 1rem; border: 1px solid var(--text-color); border-radius: 4px; color: var(--text-color); transition: all 0.2s; }
    .btn:hover { background: var(--text-color); color: var(--bg-color); }
    .btn-primary { background: var(--primary-btn-bg); color: var(--primary-btn-text); border: 1px solid var(--primary-btn-bg); }
    .btn-primary:hover { opacity: 0.9; background: var(--primary-btn-bg); color: var(--primary-btn-text); }
    
    .pagination-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .btn-nav {
      padding: 0.5rem 1rem;
      background: var(--bg-color);
      border: 1px solid var(--text-color);
      color: var(--text-color);
      cursor: pointer;
      border-radius: 4px;
    }
    .btn-nav:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .page-indicator {
      font-weight: bold;
    }
  `]
})
export class ProjectsComponent {
  private projectService = inject(ProjectService);
  projects = signal<IProjectResponse[]>([]);
  currentPage = signal(1);
  itemsPerPage = 4;

  paginatedProjects = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    return this.projects().slice(startIndex, startIndex + this.itemsPerPage);
  });

  totalPages = computed(() => Math.ceil(this.projects().length / this.itemsPerPage));

  constructor() {
    this.projectService.getProjects().subscribe({
      next: (resp) => {
        if (resp.ok) {
          this.projects.set(resp.projects);
        }
      },
      error: (err) => console.error('Error loading projects', err)
    });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }
}
