import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinalCtaComponent } from "../components/final-cta/final-cta.component";
import { FaqComponent } from "../components/faq/faq.component";
import { BannerComponent } from "../banner/banner.component";
import { FormService, QuoteFormData } from '../services/form.service';

@Component({
  selector: 'app-quotes',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FinalCtaComponent,
    FaqComponent,
    BannerComponent
  ],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {
  quoteForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor(
    private fb: FormBuilder,
    private formService: FormService
  ) {
    this.quoteForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      service: ['', Validators.required],
      budget: ['', Validators.required],
      timeline: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.quoteForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';

      const formData: QuoteFormData = this.quoteForm.value;

      this.formService.submitFormWithoutBackend(formData).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.submitMessage = response.message;
          this.quoteForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          this.submitSuccess = false;
          this.submitMessage = error.message || 'An error occurred. Please try again.';
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.quoteForm.controls).forEach(key => {
      const control = this.quoteForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.quoteForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} is too short`;
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.quoteForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
}
