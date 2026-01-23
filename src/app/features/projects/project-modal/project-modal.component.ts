import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProjectResponse } from '@core/models/project.model';

@Component({
    selector: 'app-project-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './project-modal.component.html',
    styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent {
    @Input() project: IProjectResponse | null = null;
    @Input() isOpen = false;
    @Output() closeModal = new EventEmitter<void>();

    @HostListener('document:keydown.escape')
    onEscapeKey() {
        if (this.isOpen) {
            this.close();
        }
    }

    close() {
        this.closeModal.emit();
    }

    onBackdropClick(event: MouseEvent) {
        if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
            this.close();
        }
    }
}
