import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-faq',
  imports: [CommonModule],
  template: `
    <!-- Floating FAQ Button -->
    <div class="floating-faq-button"
         (click)="toggleModal()"
         [class.pulse]="!hasBeenOpened"
         title="Help & Information">
      <i class="fas fa-question"></i>
    </div>

    <!-- FAQ Modal -->
    <div *ngIf="isModalOpen" class="faq-modal-backdrop" (click)="closeModal()">
      <div class="faq-modal-content" (click)="$event.stopPropagation()">
        <!-- Modal Header -->
        <div class="modal-header">
          <h2>
            <i class="fas fa-question-circle"></i>
            Help & Information
          </h2>
          <button class="close-button" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Tab Navigation -->
        <div class="tab-navigation">
          <button
            class="tab-button"
            [class.active]="activeTab === 'faq'"
            (click)="activeTab = 'faq'">
            <i class="fas fa-question-circle"></i>
            FAQ
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'process'"
            (click)="activeTab = 'process'">
            <i class="fas fa-clipboard-list"></i>
            How it Works
          </button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">

          <!-- FAQ Tab -->
          <div *ngIf="activeTab === 'faq'">
            <p class="modal-description">
              Find answers to the most common questions about our services and processes.
            </p>

            <!-- FAQ List -->
            <div class="faq-list">
              <div *ngFor="let faq of faqs; let i = index"
                   class="faq-item"
                   [class.open]="faq.open">
                <!-- Question -->
                <div class="faq-question" (click)="toggleFAQ(i)">
                  <i class="fas" [ngClass]="faq.open ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
                  <span>{{ faq.question }}</span>
                </div>

                <!-- Answer -->
                <div class="faq-answer" [class.open]="faq.open">
                  <div class="answer-content">
                    <p>{{ faq.answer }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact CTA -->
            <div class="faq-cta">
              <p>Still have questions?</p>
              <button class="btn-primary" (click)="scrollToContact()">
                <i class="fas fa-envelope"></i>
                Contact Us
              </button>
            </div>
          </div>

          <!-- How it Works Tab -->
          <div *ngIf="activeTab === 'process'">
            <p class="modal-description">
              Our smart quote process is designed to understand your needs and provide accurate estimates.
            </p>

            <div class="process-steps">
              <div class="process-step">
                <div class="step-icon">
                  <i class="fas fa-clipboard-list"></i>
                </div>
                <div class="step-content">
                  <h3>Steps 1-2: Project Details</h3>
                  <p>Tell us about your project type, required features, budget range, and timeline. All budget estimates are provided in South African Rands for transparent pricing.</p>
                </div>
              </div>

              <div class="process-step">
                <div class="step-icon">
                  <i class="fas fa-comment-dots"></i>
                </div>
                <div class="step-content">
                  <h3>Step 3: Requirements</h3>
                  <p>Describe your project in detail - your goals, target users, key features, and technical requirements. The more information you provide, the more accurate our quote will be.</p>
                </div>
              </div>

              <div class="process-step">
                <div class="step-icon">
                  <i class="fas fa-user-check"></i>
                </div>
                <div class="step-content">
                  <h3>Step 4: Contact Information</h3>
                  <p>Provide your contact details so our team can reach out to you with a detailed proposal and schedule a consultation to discuss your project.</p>
                </div>
              </div>

              <div class="process-step">
                <div class="step-icon">
                  <i class="fas fa-handshake"></i>
                </div>
                <div class="step-content">
                  <h3>Response: Detailed Quote</h3>
                  <p>Receive a comprehensive quote within 24-48 hours, including project timeline, team structure, technology recommendations, and transparent pricing.</p>
                </div>
              </div>
            </div>

            <!-- Process CTA -->
            <div class="process-cta">
              <p>Ready to get started?</p>
              <button class="btn-primary" (click)="scrollToQuote()">
                <i class="fas fa-calculator"></i>
                Start Quote Process
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Floating FAQ Button */
    .floating-faq-button {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;
      z-index: 999;
      border: none;
      outline: none;
    }

    .floating-faq-button:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
    }

    .floating-faq-button.pulse {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }

    /* Modal Backdrop */
    .faq-modal-backdrop {
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
      padding: 1rem;
      overflow-y: auto;
    }

    /* Modal Content */
    .faq-modal-content {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      max-width: 700px;
      width: 100%;
      max-height: 80vh;
      overflow-y: auto;
      animation: slideUp 0.3s ease-out;
      position: relative;
    }

    /* Modal Header */
    .modal-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem 2rem;
      border-radius: 12px 12px 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h2 {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .close-button {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: background-color 0.3s ease;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-button:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Modal Body */
    .modal-body {
      padding: 2rem;
    }

    .modal-description {
      color: #666;
      margin-bottom: 2rem;
      font-size: 1.1rem;
      line-height: 1.6;
    }

    /* FAQ List */
    .faq-list {
      margin-bottom: 2rem;
    }

    .faq-item {
      border: 1px solid #e9ecef;
      border-radius: 8px;
      margin-bottom: 1rem;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .faq-item:hover {
      border-color: var(--primary-color);
      box-shadow: 0 2px 10px rgba(102, 126, 234, 0.1);
    }

    .faq-question {
      padding: 1.2rem 1.5rem;
      background: #f8f9fa;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-weight: 600;
      color: #333;
      transition: all 0.3s ease;
    }

    .faq-question:hover {
      background: #e9ecef;
    }

    .faq-item.open .faq-question {
      background: var(--primary-color);
      color: white;
    }

    .faq-question i {
      font-size: 1rem;
      transition: transform 0.3s ease;
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease;
    }

    .faq-answer.open {
      max-height: 300px;
    }

    .answer-content {
      padding: 1.5rem;
      background: white;
      border-top: 1px solid #e9ecef;
    }

    .answer-content p {
      margin: 0;
      color: #666;
      line-height: 1.6;
    }

    /* FAQ CTA */
    .faq-cta {
      text-align: center;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border: 2px dashed #dee2e6;
    }

    .faq-cta p {
      margin: 0 0 1rem 0;
      color: #666;
      font-weight: 600;
    }

    .btn-primary {
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 0.8rem 1.5rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary:hover {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .floating-faq-button {
        bottom: 1rem;
        right: 1rem;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
      }

      .faq-modal-backdrop {
        padding: 0.5rem;
      }

      .modal-header {
        padding: 1rem 1.5rem;
      }

      .modal-header h2 {
        font-size: 1.2rem;
      }

      .modal-body {
        padding: 1.5rem;
      }

      .faq-question {
        padding: 1rem;
      }

      .answer-content {
        padding: 1rem;
      }
    }

    @media (max-width: 480px) {
      .floating-faq-button {
        bottom: 0.8rem;
        right: 0.8rem;
        width: 45px;
        height: 45px;
        font-size: 1.1rem;
      }

      .modal-header h2 {
        font-size: 1.1rem;
      }
    }
  `]
})
export class FloatingFaqComponent {
  isModalOpen = false;
  hasBeenOpened = false;
  activeTab: 'faq' | 'process' = 'faq';

  faqs = [
    {
      question: 'What services does Byte Array offer?',
      answer: 'We specialize in custom software development, AI-powered solutions, cloud computing, web & mobile development, data security, and software consulting.',
      open: false,
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity, but most solutions are delivered within 4-12 weeks. We provide detailed project timelines during our initial consultation.',
      open: false,
    },
    {
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer comprehensive ongoing support, software updates, security patches, and system optimization services to ensure your solution continues to perform optimally.',
      open: false,
    },
    {
      question: 'Is my data secure with Byte Array?',
      answer: 'Absolutely! We implement enterprise-grade security measures, end-to-end encryption, secure cloud infrastructure, and full compliance with industry standards like GDPR and ISO 27001.',
      open: false,
    },
    {
      question: 'What are your pricing models?',
      answer: 'We offer flexible pricing models including fixed-price projects, time & materials, and retainer-based agreements. Pricing depends on project scope, complexity, and timeline.',
      open: false,
    },
    {
      question: 'Do you work with international clients?',
      answer: 'Yes, we work with clients globally. Our team is experienced in working across different time zones and we provide remote collaboration tools for seamless communication.',
      open: false,
    },
    {
      question: 'How can I get started?',
      answer: 'Simply contact us through our quote form or contact form, and we\'ll schedule a free consultation to discuss your project requirements and provide a tailored proposal.',
      open: false,
    },
  ];

  toggleModal(): void {
    this.isModalOpen = !this.isModalOpen;
    if (this.isModalOpen) {
      this.hasBeenOpened = true;
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'auto';
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  toggleFAQ(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

  setActiveTab(tab: 'faq' | 'process') {
    this.activeTab = tab;
  }

  scrollToQuote() {
    this.closeModal();
    // Small delay to allow modal to close before scrolling
    setTimeout(() => {
      const element = document.getElementById('quote-section') || document.querySelector('.quote-container');
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // If no quote section found, navigate to quotes page
        window.location.href = '/quotes';
      }
    }, 300);
  }

  scrollToContact(): void {
    this.closeModal();
    // Small delay to allow modal to close before scrolling
    setTimeout(() => {
      const contactElement = document.querySelector('.final-cta') || document.querySelector('app-final-cta');
      if (contactElement) {
        contactElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300);
  }
}
