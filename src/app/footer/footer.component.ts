import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer>
      <div class="footer-content">
        <p>&copy; {{ currentYear }} Musa Portfolio. All rights reserved.</p>
        <div class="social-links">
          <a href="#" target="_blank">LinkedIn</a>
          <a href="#" target="_blank">GitHub</a>
          <a href="#" target="_blank">Twitter</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: var(--footer-bg);
      color: var(--footer-text);
      padding: 2rem;
      text-align: center;
      transition: background-color 0.3s, color 0.3s;
    }
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .social-links {
      display: flex;
      gap: 1.5rem;
    }
    .social-links a {
      color: var(--footer-text);
      opacity: 0.8;
      text-decoration: none;
      transition: opacity 0.3s;
    }
    .social-links a:hover {
      opacity: 1;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
