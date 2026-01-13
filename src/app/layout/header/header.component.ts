import { Component, HostListener, signal, inject, Renderer2, Inject, DOCUMENT } from '@angular/core';
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

  scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.closeMenu(); // Close menu after navigation
    }
  }
}
