import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { skillsData, Skill } from '@core/data/skills.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  private sanitizer = inject(DomSanitizer);

  skills: (Skill & { iconSafe: SafeHtml })[] = skillsData.map(skill => ({
    ...skill,
    iconSafe: this.sanitizer.bypassSecurityTrustHtml(skill.icon)
  }));
}
