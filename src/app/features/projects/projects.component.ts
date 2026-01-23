import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '@core/services/project.service';
import { IProjectResponse } from '@core/models/project.model';
import { ProjectModalComponent } from './project-modal/project-modal.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectModalComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  private projectService = inject(ProjectService);
  projects = signal<IProjectResponse[]>([]);
  currentPage = signal(1);
  itemsPerPage = 4;

  // Modal state
  selectedProject = signal<IProjectResponse | null>(null);
  isModalOpen = signal(false);

  paginatedProjects = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    return this.projects().slice(startIndex, startIndex + this.itemsPerPage);
  });

  totalPages = computed(() => Math.ceil(this.projects().length / this.itemsPerPage));

  constructor() {
    this.projectService.getProjects().subscribe({
      next: (resp) => {
        if (resp.ok) {
          const processedProjects = resp.projects.map(p => ({
            ...p,
            stack: p.stack.flatMap(s => s.split(' '))
          }));
          this.projects.set(processedProjects);
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

  openModal(project: IProjectResponse) {
    this.selectedProject.set(project);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }
}

