import { Component, HostListener, signal, inject, Renderer2, Inject, DOCUMENT, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isScrolled = signal(false);
  isDark = signal(true); // Dark mode por defecto
  isMenuOpen = signal(false);

  private document = inject(DOCUMENT);
  private elementRef = inject(ElementRef);

  constructor() {
    // Cargar tema guardado en localStorage o usar dark mode por defecto
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.isDark.set(savedTheme === 'dark');
    } else {
      // Si no hay tema guardado, establecer dark mode por defecto
      this.isDark.set(true);
      localStorage.setItem('theme', 'dark');
    }

    // Aplicar el tema al body
    if (this.isDark()) {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
  }

  toggleTheme() {
    this.isDark.update(v => !v);
    const newTheme = this.isDark() ? 'dark' : 'light';

    // Guardar en localStorage
    localStorage.setItem('theme', newTheme);

    // Aplicar clase al body
    if (this.isDark()) {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  // Close menu when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  // Close menu with Escape key
  @HostListener('document:keydown.escape', [])
  onEscapeKey() {
    if (this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu(); // Close menu after navigation
    }
  }
}
