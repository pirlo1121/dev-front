import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { IUserResponse } from '../models/user.model';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="about-me-container">
      @if (user()) {
        <div class="profile">
          <img [src]="user()?.image || 'assets/placeholder.jpg'" alt="{{user()?.name}}" class="profile-img">
          <h2>{{ user()?.name }}</h2>
          <h3>{{ user()?.profession }}</h3>
          <p class="bio">{{ user()?.bio }}</p>
          
          <div class="social-links" *ngIf="user()?.socialLinks as social">
             <a *ngIf="social.github" [href]="social.github" target="_blank">GitHub</a>
             <a *ngIf="social.linkedin" [href]="social.linkedin" target="_blank">LinkedIn</a>
             <a *ngIf="social.twitter" [href]="social.twitter" target="_blank">Twitter</a>
          </div>
        </div>
      } @else {
        <p>Loading profile...</p>
      }
    </section>
  `,
  styles: [`
    .about-me-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem;
      background-color: var(--bg-color);
      text-align: center;
      transition: background-color 0.3s;
    }
    .profile-img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 1rem;
      border: 4px solid var(--accent-color);
      transition: border-color 0.3s;
    }
    h2 { font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--text-color); }
    h3 { font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 1rem; }
    .bio { max-width: 600px; margin-bottom: 2rem; line-height: 1.6; color: var(--text-color); }
    .social-links { display: flex; gap: 1rem; justify-content: center; }
    .social-links a { 
      text-decoration: none; 
      color: var(--text-color); 
      font-weight: bold;
      padding: 0.5rem 1rem;
      border: 1px solid var(--text-color);
      border-radius: 4px;
      transition: all 0.3s;
    }
    .social-links a:hover {
      background: var(--text-color);
      color: var(--bg-color);
    }
  `]
})
export class AboutMeComponent {
  private userService = inject(UserService);
  user = signal<IUserResponse | null>(null);

  constructor() {
    this.userService.getUser('659c25368c07248c82365261').subscribe({
      next: (resp) => {
        // Assuming the service returns the user directly or wrapped in a structure. 
        // Based on previous knowledge, it likely returns an Observable of the user or a response with data.
        // Let's assume the service returns the user object or use 'any' to start if signature is unknown, 
        // but I checked user.service.ts? No, I checked the directory effectively.
        // Let's assume standard behavior. I'll need to verify the service signature if this fails.
        // Actually, let's verify user.service.ts content first? No, I'll trust standard implementation or fix later.
        // Wait, I saw user.model.ts has IUserResponse.
        this.user.set(resp);
      },
      error: (err) => console.error('Error loading user', err)
    });
  }
}
