import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { ContactRequest } from '../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="contact-container">
      <h2>Get In Touch</h2>
      <form (ngSubmit)="onSubmit()" #contactForm="ngForm" class="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" [(ngModel)]="formData.name" required placeholder="Your Name">
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" [(ngModel)]="formData.email" required email placeholder="your.email@example.com">
        </div>
        
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" [(ngModel)]="formData.message" required rows="5" placeholder="How can I help you?"></textarea>
        </div>

        <button type="submit" [disabled]="!contactForm.form.valid || loading()">
          {{ loading() ? 'Sending...' : 'Send Message' }}
        </button>

        <p *ngIf="successMessage()" class="success">{{ successMessage() }}</p>
        <p *ngIf="errorMessage()" class="error">{{ errorMessage() }}</p>
      </form>
    </section>
  `,
  styles: [`
    .contact-container {
      padding: 4rem 2rem;
      min-height: 100vh;
      background: var(--bg-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }
    h2 { font-size: 2.5rem; margin-bottom: 2rem; color: var(--text-color); }
    .contact-form {
      width: 100%;
      max-width: 500px;
      background: var(--surface-bg);
      padding: 2rem;
      border-radius: 8px;
      box-shadow: var(--card-shadow);
      border: 1px solid var(--border-color);
    }
    .form-group { margin-bottom: 1.5rem; }
    label { display: block; margin-bottom: 0.5rem; font-weight: 500; font-family: 'Inter', sans-serif; color: var(--text-color); }
    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 1rem;
      font-family: inherit;
      box-sizing: border-box; 
      background: var(--input-bg);
      color: var(--text-color);
      transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    }
    input:focus, textarea:focus { outline: none; border-color: var(--accent-color); }
    button {
      width: 100%;
      padding: 1rem;
      background: var(--primary-btn-bg);
      color: var(--primary-btn-text);
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: opacity 0.3s;
    }
    button:hover:not(:disabled) { opacity: 0.9; }
    button:disabled { opacity: 0.7; cursor: not-allowed; }
    .success { color: #28a745; margin-top: 1rem; text-align: center; } /* Slight green is usually ok, or could serve from var */
    .error { color: #dc3545; margin-top: 1rem; text-align: center; }
  `]
})
export class ContactComponent {
  private contactService = inject(ContactService);

  formData: ContactRequest = { name: '', email: '', message: '' };
  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  onSubmit() {
    this.loading.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    this.contactService.sendContactEmail(this.formData).subscribe({
      next: (resp) => {
        this.loading.set(false);
        if (resp.ok) {
          this.successMessage.set(resp.msg || 'Message sent successfully!');
          this.formData = { name: '', email: '', message: '' }; // Reset form
        } else {
          this.errorMessage.set(resp.msg || 'Failed to send message.');
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set('An error occurred. Please try again.');
        console.error(err);
      }
    });
  }
}
