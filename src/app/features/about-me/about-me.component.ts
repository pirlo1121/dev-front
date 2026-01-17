import { Component, inject, signal, DOCUMENT } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@core/services/user.service';
import { IUser } from '@core/models/user.model';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
  private userService = inject(UserService);
  private document = inject(DOCUMENT);

  user = signal<IUser | null>(null);
  isDark = signal(true);

  constructor() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDark.set(savedTheme === 'dark');
    } else {
      this.isDark.set(true);
      localStorage.setItem('theme', 'dark');
    }
  }

  ngOnInit(): void {
    this.userService.getUser('69600dfbc55366ae7a0fd6a4').subscribe({
      next: (resp) => {
        this.user.set(resp.user);
        console.log(resp.user);
      },
      error: (err) => console.error('Error loading user', err)
    });
  }

  toggleTheme() {
    this.isDark.update(v => !v);
    const newTheme = this.isDark() ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);

    if (this.isDark()) {
      this.document.body.classList.add('dark-theme');
    } else {
      this.document.body.classList.remove('dark-theme');
    }
  }
}
