import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-modal',
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible" class="modal-backdrop" (click)="onBackdropClick()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="success-header">
          <div class="success-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <h2>{{ title }}</h2>
        </div>

        <div class="success-body">
          <p>{{ message }}</p>

          <div *ngIf="showNextSteps" class="next-steps">
            <h3>What's Next?</h3>
            <ul>
              <li *ngFor="let step of nextSteps">{{ step }}</li>
            </ul>
          </div>
        </div>

        <div class="success-footer">
          <button class="btn-primary" (click)="onClose()">
            {{ closeButtonText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease-out;
    }

    .modal-content {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      animation: slideIn 0.3s ease-out;
    }

    .success-header {
      text-align: center;
      padding: 2rem 2rem 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px 12px 0 0;
    }

    .success-icon {
      font-size: 4rem;
      color: #28a745;
      margin-bottom: 1rem;
      background: white;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
    }

    .success-header h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .success-body {
      padding: 2rem;
      color: #333;
    }

    .success-body p {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      color: #666;
    }

    .next-steps {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid var(--primary-color);
    }

    .next-steps h3 {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.2rem;
    }

    .next-steps ul {
      margin: 0;
      padding-left: 1.2rem;
      list-style-type: disc;
    }

    .next-steps li {
      margin-bottom: 0.5rem;
      color: #666;
      line-height: 1.5;
    }

    .success-footer {
      padding: 1rem 2rem 2rem;
      text-align: center;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 0.8rem 2rem;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 120px;
    }

    .btn-primary:hover {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (max-width: 768px) {
      .modal-content {
        width: 95%;
        margin: 1rem;
      }

      .success-header,
      .success-body,
      .success-footer {
        padding: 1.5rem;
      }

      .success-icon {
        width: 60px;
        height: 60px;
        font-size: 3rem;
      }
    }
  `]
})
export class SuccessModalComponent {
  @Input() isVisible = false;
  @Input() title = 'Success!';
  @Input() message = 'Your message has been sent successfully.';
  @Input() closeButtonText = 'Close';
  @Input() showNextSteps = false;
  @Input() nextSteps: string[] = [];

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onBackdropClick(): void {
    this.onClose();
  }
}
