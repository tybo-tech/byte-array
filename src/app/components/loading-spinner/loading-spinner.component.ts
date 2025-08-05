import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [class.overlay]="overlay">
      <div class="spinner" [class.small]="size === 'small'" [class.large]="size === 'large'">
        <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
      </div>
      <span *ngIf="message" class="spinner-message">{{ message }}</span>
    </div>
  `,
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message: string = '';
  @Input() overlay: boolean = false;
}
