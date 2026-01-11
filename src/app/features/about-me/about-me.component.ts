import { Component, inject, signal } from '@angular/core';
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
  user = signal<IUser | null>(null);

  constructor() {

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
}
