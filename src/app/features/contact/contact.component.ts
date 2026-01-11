import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '@core/services/contact.service';
import { ContactRequest } from '@core/models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
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
