import { Component, HostListener, signal, inject, DOCUMENT } from '@angular/core';
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
  isDark = signal(true);
  isHidden = signal(false);
  private lastScrollY = 0;

  private document = inject(DOCUMENT);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDark.set(savedTheme === 'dark');
    } else {
      this.isDark.set(true);
      localStorage.setItem('theme', 'dark');
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDark.update(v => !v);
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDark()) {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      this.isHidden.set(true);
    } else if (currentScrollY < this.lastScrollY) {
      this.isHidden.set(false);
    }

    this.isScrolled.set(currentScrollY > 20);
    this.lastScrollY = currentScrollY;
  }

  scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
