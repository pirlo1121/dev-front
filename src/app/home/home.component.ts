import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, AboutMeComponent, ProjectsComponent, SkillsComponent, ContactComponent],
  template: `
    <app-header></app-header>
    
    <main class="content-container">
      <section id="about-me" class="scroll-section reveal">
        <app-about-me></app-about-me>
      </section>
      
      <section id="projects" class="scroll-section reveal">
        <app-projects></app-projects>
      </section>
      
      <section id="skills" class="scroll-section reveal">
        <app-skills></app-skills>
      </section>
      
      <section id="contact" class="scroll-section reveal">
        <app-contact></app-contact>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    .content-container {
      padding-top: 80px; /* Space for fixed header */
      min-height: 100vh;
      /* overflow-x: hidden; Removed to let body handle it */
    }
    .scroll-section {
      min-height: 90vh; /* Allow some overlap or spacing */
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4rem 0;
      opacity: 0;
      transform: translateY(50px);
      transition: all 1s ease-out;
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
  `]
})
export class HomeComponent implements AfterViewInit {
  @ViewChildren('reveal', { read: ElementRef }) sections!: QueryList<ElementRef>;
  private renderer = inject(Renderer2);

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'active');
          // Optional: Unobserve if we only want the animation once
          // observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    // Wait a tick to ensure ViewChildren are available if needed, though ngAfterViewInit should be fine
    this.sections.forEach(section => {
      // Need to query selector because ViewChildren points to components if not carefully selected?
      // Actually @ViewChildren works on components or elements.
      // But here I have local ref? No, I used class name query.
      // Let's use simpler querySelectorAll in native element for robustness here or add template refs.
      // Using class query directly on DOM for simplicity with IntersectionObserver often works well.
    });

    // Let's select by class manually to be sure
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));
  }
}
