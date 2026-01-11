import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  private userService = inject(UserService);
  skills = signal<string[]>([]);

  constructor() {
    this.userService.getUser('69600dfbc55366ae7a0fd6a4').subscribe({
      next: (resp) => {
        if (resp && resp.user.skills) {
          this.skills.set(resp.user.skills);
        }
      },
      error: (err) => console.error('Error loading skills', err)
    });
  }
}
