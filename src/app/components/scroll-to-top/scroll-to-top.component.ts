import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  imports: [CommonModule],
  template: `
    <button
      *ngIf="isVisible"
      class="scroll-to-top"
      (click)="scrollToTop()"
      [class.show]="isVisible"
      title="Scroll to top">
      <i class="fas fa-chevron-up"></i>
    </button>
  `,
  styles: [`
    .scroll-to-top {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      width: 50px;
      height: 50px;
      background: rgba(44, 62, 80, 0.9);
      border: none;
      border-radius: 50%;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: all 0.3s ease;
      z-index: 998;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .scroll-to-top.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .scroll-to-top:hover {
      background: var(--primary-color);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .scroll-to-top:active {
      transform: translateY(-1px) scale(0.98);
    }

    /* Mobile Adjustments */
    @media (max-width: 768px) {
      .scroll-to-top {
        bottom: 1rem;
        left: 1rem;
        width: 45px;
        height: 45px;
        font-size: 1.1rem;
      }
    }

    @media (max-width: 480px) {
      .scroll-to-top {
        bottom: 0.8rem;
        left: 0.8rem;
        width: 40px;
        height: 40px;
        font-size: 1rem;
      }
    }

    /* Ensure it doesn't conflict with FAQ button */
    @media (max-width: 768px) {
      .scroll-to-top {
        bottom: 5rem; /* Move up to avoid FAQ button */
      }
    }
  `]
})
export class ScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Show button when user scrolls down 300px
    this.isVisible = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
