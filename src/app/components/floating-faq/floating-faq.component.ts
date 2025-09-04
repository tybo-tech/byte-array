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
            (click)="setActiveTab('faq')">
            <i class="fas fa-question-circle"></i>
            <span>Frequently Asked Questions</span>
          </button>
          <button
            class="tab-button"
            [class.active]="activeTab === 'process'"
            (click)="setActiveTab('process')">
            <i class="fas fa-route"></i>
            <span>How Our Process Works</span>
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
              Our comprehensive quote process ensures you receive accurate estimates and transparent pricing. Here's how we transform your vision into reality.
            </p>

            <div class="process-overview">
              <div class="overview-stats">
                <div class="stat-item">
                  <i class="fas fa-clock"></i>
                  <span class="stat-number">24-48h</span>
                  <span class="stat-label">Response Time</span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-handshake"></i>
                  <span class="stat-number">100%</span>
                  <span class="stat-label">Transparent</span>
                </div>
                <div class="stat-item">
                  <i class="fas fa-shield-alt"></i>
                  <span class="stat-number">Free</span>
                  <span class="stat-label">Consultation</span>
                </div>
              </div>
            </div>

            <div class="process-steps">
              <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-icon">
                  <i class="fas fa-clipboard-list"></i>
                </div>
                <div class="step-content">
                  <h3>Project Overview & Requirements</h3>
                  <p>Tell us about your project type, required features, and desired timeline. We'll ask about your target audience, platform preferences, and specific functionality needs.</p>
                  <div class="step-details">
                    <div class="detail-item">
                      <i class="fas fa-check-circle"></i>
                      <span>Project type selection (Web, Mobile, AI, etc.)</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-check-circle"></i>
                      <span>Feature complexity assessment</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-check-circle"></i>
                      <span>Technology stack recommendations</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-icon">
                  <i class="fas fa-coins"></i>
                </div>
                <div class="step-content">
                  <h3>Budget & Timeline Planning</h3>
                  <p>Specify your budget range and project timeline in South African Rands. This helps us tailor our approach and provide realistic estimates that fit your constraints.</p>
                  <div class="step-details">
                    <div class="detail-item">
                      <i class="fas fa-chart-line"></i>
                      <span>Budget optimization strategies</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-calendar-alt"></i>
                      <span>Realistic timeline planning</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-balance-scale"></i>
                      <span>Cost-benefit analysis</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="process-step">
                <div class="step-number">3</div>
                <div class="step-icon">
                  <i class="fas fa-lightbulb"></i>
                </div>
                <div class="step-content">
                  <h3>Detailed Requirements Gathering</h3>
                  <p>Describe your project vision, business goals, and technical requirements. Include information about integrations, scalability needs, and any specific challenges you're facing.</p>
                  <div class="step-details">
                    <div class="detail-item">
                      <i class="fas fa-bullseye"></i>
                      <span>Business objectives alignment</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-puzzle-piece"></i>
                      <span>Third-party integration assessment</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-expand-arrows-alt"></i>
                      <span>Scalability and growth planning</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="process-step">
                <div class="step-number">4</div>
                <div class="step-icon">
                  <i class="fas fa-address-card"></i>
                </div>
                <div class="step-content">
                  <h3>Contact Information & Preferences</h3>
                  <p>Provide your contact details and communication preferences. Let us know the best times to reach you and your preferred method of communication for project updates.</p>
                  <div class="step-details">
                    <div class="detail-item">
                      <i class="fas fa-phone"></i>
                      <span>Consultation scheduling</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-comments"></i>
                      <span>Communication preference setup</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-globe"></i>
                      <span>Timezone coordination</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="process-step final-step">
                <div class="step-number">
                  <i class="fas fa-trophy"></i>
                </div>
                <div class="step-icon">
                  <i class="fas fa-file-contract"></i>
                </div>
                <div class="step-content">
                  <h3>Comprehensive Quote & Proposal</h3>
                  <p>Receive a detailed proposal within 24-48 hours including project breakdown, timeline, team structure, technology recommendations, and transparent pricing in ZAR.</p>
                  <div class="step-details">
                    <div class="detail-item">
                      <i class="fas fa-sitemap"></i>
                      <span>Detailed project breakdown</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-users"></i>
                      <span>Team composition and expertise</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-rocket"></i>
                      <span>Implementation roadmap</span>
                    </div>
                    <div class="detail-item">
                      <i class="fas fa-money-check-alt"></i>
                      <span>Transparent pricing structure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- What Happens Next Section -->
            <div class="next-steps-section">
              <h3>
                <i class="fas fa-arrow-right"></i>
                What Happens Next?
              </h3>
              <div class="next-steps-grid">
                <div class="next-step">
                  <i class="fas fa-video"></i>
                  <h4>Free Consultation</h4>
                  <p>We'll schedule a video call to discuss your project in detail and answer any questions.</p>
                </div>
                <div class="next-step">
                  <i class="fas fa-drafting-compass"></i>
                  <h4>Project Planning</h4>
                  <p>Our team will create detailed wireframes and technical specifications for your approval.</p>
                </div>
                <div class="next-step">
                  <i class="fas fa-code"></i>
                  <h4>Development Kickoff</h4>
                  <p>Once approved, we'll start development with regular updates and milestone demonstrations.</p>
                </div>
              </div>
            </div>

            <!-- Process CTA -->
            <div class="process-cta enhanced">
              <div class="cta-icon-large">
                <i class="fas fa-calculator"></i>
              </div>
              <div class="cta-content">
                <h4>Ready to Transform Your Ideas into Reality?</h4>
                <p>Get your personalized quote today and discover how we can bring your vision to life with cutting-edge technology and expert craftsmanship.</p>
                <button class="btn-primary enhanced" (click)="scrollToQuote()">
                  <i class="fas fa-paper-plane"></i>
                  Start Your Quote Journey
                </button>
              </div>
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

    /* Tab Navigation */
    .tab-navigation {
      display: flex;
      border-bottom: 2px solid #e9ecef;
      margin-bottom: 2rem;
    }

    .tab-button {
      flex: 1;
      background: none;
      border: none;
      padding: 1rem 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-weight: 600;
      color: #666;
      transition: all 0.3s ease;
      border-bottom: 3px solid transparent;
    }

    .tab-button:hover {
      background: #f8f9fa;
      color: var(--primary-color);
    }

    .tab-button.active {
      color: var(--primary-color);
      border-bottom-color: var(--primary-color);
      background: #f8f9fa;
    }

    .tab-button span {
      font-size: 0.95rem;
    }

    .tab-button i {
      font-size: 1.1rem;
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

    /* Process Overview Stats */
    .process-overview {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      color: white;
    }

    .overview-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 1rem;
    }

    .stat-item {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .stat-item i {
      font-size: 1.5rem;
      opacity: 0.9;
    }

    .stat-number {
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 1;
    }

    .stat-label {
      font-size: 0.85rem;
      opacity: 0.9;
      font-weight: 500;
    }

    /* Enhanced Process Steps */
    .process-steps {
      margin-bottom: 2rem;
    }

    .process-step {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 12px;
      border-left: 4px solid var(--primary-color);
      transition: all 0.3s ease;
      position: relative;
    }

    .process-step:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .process-step.final-step {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
      border-left-color: #667eea;
    }

    .step-number {
      width: 40px;
      height: 40px;
      background: var(--primary-color);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .final-step .step-number {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

    .step-icon {
      width: 50px;
      height: 50px;
      background: white;
      border: 3px solid var(--primary-color);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    }

    .step-icon i {
      font-size: 1.3rem;
      color: var(--primary-color);
    }

    .final-step .step-icon {
      border-color: #667eea;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
    }

    .final-step .step-icon i {
      color: #667eea;
    }

    .step-content {
      flex: 1;
    }

    .step-content h3 {
      margin: 0 0 0.8rem 0;
      color: #333;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .step-content p {
      margin: 0 0 1rem 0;
      color: #666;
      line-height: 1.6;
    }

    .step-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #555;
      font-size: 0.9rem;
    }

    .detail-item i {
      color: var(--primary-color);
      font-size: 0.8rem;
    }

    /* Next Steps Section */
    .next-steps-section {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
    }

    .next-steps-section h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.3rem;
    }

    .next-steps-section h3 i {
      color: var(--primary-color);
    }

    .next-steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .next-step {
      text-align: center;
      padding: 1.5rem 1rem;
      background: #f8f9fa;
      border-radius: 10px;
      transition: all 0.3s ease;
    }

    .next-step:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    .next-step i {
      font-size: 2rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
      display: block;
    }

    .next-step h4 {
      margin: 0 0 0.75rem 0;
      color: #333;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .next-step p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    /* Enhanced Process CTA */
    .process-cta.enhanced {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 2.5rem 2rem;
      border-radius: 16px;
      border: none;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    .cta-icon-large {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      backdrop-filter: blur(10px);
    }

    .cta-icon-large i {
      font-size: 2.5rem;
      color: white;
    }

    .process-cta.enhanced .cta-content h4 {
      margin: 0 0 1rem 0;
      font-size: 1.4rem;
      font-weight: 700;
      color: white;
    }

    .process-cta.enhanced .cta-content p {
      margin: 0 0 2rem 0;
      font-size: 1.1rem;
      line-height: 1.6;
      opacity: 0.95;
      color: white;
    }

    .btn-primary.enhanced {
      background: white;
      color: var(--primary-color);
      padding: 1rem 2rem;
      font-size: 1.1rem;
      font-weight: 700;
      border-radius: 50px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      border: none;
    }

    .btn-primary.enhanced:hover {
      background: #f8f9fa;
      transform: translateY(-3px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
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

      .tab-button {
        padding: 0.8rem 1rem;
        font-size: 0.9rem;
      }

      .tab-button span {
        display: none;
      }

      .overview-stats {
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
      }

      .stat-number {
        font-size: 1.4rem;
      }

      .stat-label {
        font-size: 0.75rem;
      }

      .process-step {
        flex-direction: column;
        gap: 1rem;
        padding: 1.2rem;
      }

      .step-number, .step-icon {
        align-self: flex-start;
      }

      .next-steps-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .next-step {
        padding: 1.2rem 1rem;
      }

      .cta-icon-large {
        width: 60px;
        height: 60px;
        margin-bottom: 1rem;
      }

      .cta-icon-large i {
        font-size: 2rem;
      }

      .process-cta.enhanced {
        padding: 2rem 1.5rem;
      }

      .process-cta.enhanced .cta-content h4 {
        font-size: 1.2rem;
      }

      .process-cta.enhanced .cta-content p {
        font-size: 1rem;
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

      .process-overview {
        padding: 1rem;
      }

      .overview-stats {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .stat-item {
        flex-direction: row;
        justify-content: space-between;
        text-align: left;
      }

      .detail-item {
        font-size: 0.85rem;
      }

      .next-steps-section {
        padding: 1.5rem;
      }

      .next-step i {
        font-size: 1.5rem;
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
