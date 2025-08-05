import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';
import { FormService, ContactFormData } from '../../services/form.service';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-final-cta',
  imports: [ScrollAnimateDirective, ReactiveFormsModule, CommonModule, SuccessModalComponent],
  templateUrl: './final-cta.component.html',
  styleUrl: './final-cta.component.scss'
})
export class FinalCtaComponent implements OnInit {
  email = 'info@bytearray.co.za';
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  showSuccessModal = false;

  constructor(
    private fb: FormBuilder,
    private formService: FormService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      inquiry: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Component initialization if needed
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';

      const formData: ContactFormData = {
        ...this.contactForm.value,
        submittedAt: new Date().toISOString()
      };

      this.formService.submitContactForm(formData).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.submitMessage = response.message;
          this.contactForm.reset();
          this.isSubmitting = false;
          this.showSuccessModal = true;
        },
        error: (error) => {
          this.submitSuccess = false;
          this.submitMessage = error.message || 'An error occurred while sending your message. Please try again or contact us directly.';
          this.isSubmitting = false;
          console.error('Contact form submission error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        const fieldLabel = this.getFieldLabel(fieldName);
        return `${fieldLabel} is required`;
      }
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) {
        const fieldLabel = this.getFieldLabel(fieldName);
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${fieldLabel} must be at least ${requiredLength} characters`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      inquiry: 'Business inquiry',
      message: 'Message'
    };
    return labels[fieldName] || fieldName;
  }

  onModalClose(): void {
    this.showSuccessModal = false;
    this.submitMessage = '';
    this.submitSuccess = false;
  }
}
