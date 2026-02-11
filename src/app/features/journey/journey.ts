import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface JourneyItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

interface JourneyData {
  intro: string;
  items: JourneyItem[];
}

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey.html',
  styleUrl: './journey.css'
})
export class JourneyComponent {
  journeyData: JourneyData = {
    intro: "I enjoy learning by building and teaching. This is part of my path so far.",
    items: [
      {
        id: "developer",
        title: "Software Developer",
        description: "I build web applications focused on functionality, clarity and maintainability, mainly using JavaScript, Angular and Node.js.",
        tags: ["JavaScript", "Angular", "Node.js", "MongoDB"]
      },
      {
        id: "mentor",
        title: "Technical Mentor",
        description: "I help students understand programming concepts through real projects, guiding them step by step from idea to implementation.",
        tags: ["Teaching", "Mentorship", "Web Development"]
      },
      {
        id: "learner",
        title: "Continuous Learner",
        description: "I'm constantly improving my skills through courses, documentation and hands-on practice, always aiming to understand things deeply.",
        tags: ["Self-learning", "Courses", "Practice"]
      }
    ]
  };
}
