import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="skills-container">
      <h2>Skills</h2>
      <div class="skills-grid">
        @for (skill of skills(); track skill) {
          <div class="skill-badge">{{ skill }}</div>
        } @empty {
          <p>Loading skills...</p>
        }
      </div>
    </section>
  `,
  styles: [`
    .skills-container {
      padding: 4rem 2rem;
      min-height: 100vh;
      background: var(--surface-bg);
      color: var(--text-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s, color 0.3s;
    }
    h2 { font-size: 2.5rem; margin-bottom: 3rem; text-align: center; }
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: center;
      max-width: 800px;
    }
    .skill-badge {
      background: var(--bg-color);
      padding: 0.75rem 1.5rem;
      border-radius: 50px;
      font-size: 1.1rem;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      cursor: default;
      color: var(--text-color);
      box-shadow: var(--card-shadow);
    }
    .skill-badge:hover {
      background: var(--text-color);
      color: var(--bg-color);
      transform: scale(1.1);
    }
  `]
})
export class SkillsComponent {
  private userService = inject(UserService);
  skills = signal<string[]>([]);

  constructor() {
    this.userService.getUser('659c25368c07248c82365261').subscribe({
      next: (resp) => {
        if (resp && resp.skills) {
          this.skills.set(resp.skills);
        }
      },
      error: (err) => console.error('Error loading skills', err)
    });
  }
}
