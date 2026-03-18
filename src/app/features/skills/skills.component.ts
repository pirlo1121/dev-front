import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@core/services/user.service';

interface SkillCategory {
  name: string;
  skills: string[];
}

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

  /**
   * Mapa de clasificación: skill -> categoría
   * Las skills que no estén en este mapa se asignan a "Otros"
   */
  private categoryMap: Record<string, string> = {
    'Typescript': 'Frontend',
    'Javascript': 'Frontend',
    'Angular': 'Frontend',
    'HTML': 'Frontend',
    'CSS': 'Frontend',
    'React': 'Frontend',
    'Vue': 'Frontend',
    'SASS': 'Frontend',
    'Tailwind': 'Frontend',

    'Python': 'Backend',
    'Express': 'Backend',
    'MongoDB': 'Backend',
    'MVC': 'Backend',
    'Prisma': 'Backend',
    'Node': 'Backend',
    'NestJS': 'Backend',
    'SQL': 'Backend',
    'PostgreSQL': 'Backend',
    'Firebase': 'Backend',

    'Linux': 'DevOps & Tools',
    'AWS': 'DevOps & Tools',
    'Docker': 'DevOps & Tools',
    'Git': 'DevOps & Tools',
    'CI/CD': 'DevOps & Tools',
    'Kubernetes': 'DevOps & Tools',
    'Terraform': 'DevOps & Tools',
  };

  /** Orden de las categorías para mostrar */
  private categoryOrder = ['Frontend', 'Backend', 'DevOps & Tools', 'Otros'];

  /** Signal computado que agrupa las skills por categoría */
  groupedSkills = computed<SkillCategory[]>(() => {
    const raw = this.skills();
    if (!raw.length) return [];

    const groups: Record<string, string[]> = {};

    for (const skill of raw) {
      const category = this.categoryMap[skill] ?? 'Otros';
      if (!groups[category]) groups[category] = [];
      groups[category].push(skill);
    }

    return this.categoryOrder
      .filter(cat => groups[cat]?.length)
      .map(cat => ({ name: cat, skills: groups[cat] }));
  });

  constructor() {
    this.userService.getUser('696c287de69192f9b00097c6').subscribe({
      next: (resp) => {
        if (resp && resp.user.skills) {
          this.skills.set(resp.user.skills);
        }
      },
      error: (err) => console.error('Error loading skills', err)
    });
  }
}
