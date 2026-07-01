import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, Renderer2, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@layout/header/header.component';
import { FooterComponent } from '@layout/footer/footer.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';
import { ContactComponent } from '../contact/contact.component';
import { ProjectModalComponent } from '../projects/project-modal/project-modal.component';
import { IProjectResponse } from '@core/models/project.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, AboutMeComponent, ProjectsComponent, SkillsComponent, ContactComponent, ProjectModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('reveal', { read: ElementRef }) sections!: QueryList<ElementRef>;
  private renderer = inject(Renderer2);

  // Modal State
  selectedProject = signal<IProjectResponse | null>(null);
  isModalOpen = signal(false);

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'active');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
  }

  handleOpenProject(project: IProjectResponse) {
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
