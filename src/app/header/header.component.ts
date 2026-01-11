import { Component, HostListener, signal, inject, Renderer2, Inject, DOCUMENT } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header [class.scrolled]="isScrolled()">
      <nav>
        <div class="logo">Musa</div>
        <ul class="nav-links">
          <li><a (click)="scrollTo('about-me')">About</a></li>
          <li><a (click)="scrollTo('projects')">Projects</a></li>
          <li><a (click)="scrollTo('skills')">Skills</a></li>
          <li><a (click)="scrollTo('contact')">Contact</a></li>
          <li>
            <button class="theme-btn" (click)="toggleTheme()" aria-label="Toggle Theme">
              <span *ngIf="isDark()">☀️</span>
              <span *ngIf="!isDark()">🌙</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: [`
    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding: 1.5rem 2rem;
      z-index: 1000;
      transition: all 0.3s ease;
      background: transparent;
    }
    header.scrolled {
      background: var(--header-bg); /* Use variable */
      backdrop-filter: blur(10px);
      padding: 1rem 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-color);
      cursor: pointer;
    }
    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
      align-items: center;
    }
    .nav-links a {
      text-decoration: none;
      color: var(--text-color);
      font-weight: 500;
      cursor: pointer;
      position: relative;
      transition: color 0.3s;
    }
    .nav-links a::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: var(--text-color);
      transition: width 0.3s;
    }
    .nav-links a:hover::after {
      width: 100%;
    }
    .theme-btn {
      background: none;
      border: 1px solid var(--text-color);
      color: var(--text-color);
      cursor: pointer;
      font-size: 1.2rem;
      padding: 0.25rem 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s;
    }
    .theme-btn:hover {
      transform: scale(1.1);
    }
  `]
})
export class HeaderComponent {
  isScrolled = signal(false);
  isDark = signal(false);

  private document = inject(DOCUMENT);

  toggleTheme() {
    this.isDark.update(v => !v);
    if (this.isDark()) {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
