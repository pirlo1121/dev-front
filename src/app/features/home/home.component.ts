import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@layout/header/header.component';
import { FooterComponent } from '@layout/footer/footer.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { ProjectsComponent } from '../projects/projects.component';
import { SkillsComponent } from '../skills/skills.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, AboutMeComponent, ProjectsComponent, SkillsComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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
