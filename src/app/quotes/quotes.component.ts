import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinalCtaComponent } from "../components/final-cta/final-cta.component";
import { FaqComponent } from "../components/faq/faq.component";
import { BannerComponent } from "../banner/banner.component";
import { FormService, QuoteFormData } from '../services/form.service';

interface QuoteStep {
  title: string;
  description: string;
  fields: string[];
}

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
export class QuotesComponent implements OnInit {
  quoteForm: FormGroup;
  currentStep = 1;
  totalSteps = 4;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  steps: QuoteStep[] = [
    {
      title: 'Project Type',
      description: 'Tell us about your project requirements',
      fields: ['service', 'projectType', 'features']
    },
    {
      title: 'Budget & Timeline',
      description: 'Help us understand your budget and timeline',
      fields: ['budget', 'timeline', 'teamSize']
    },
    {
      title: 'Project Details',
      description: 'Describe your project in detail',
      fields: ['message']
    },
    {
      title: 'Contact Information',
      description: 'How can we reach you?',
      fields: ['name', 'email', 'phone', 'company']
    }
  ];

  serviceOptions = [
    { value: 'custom-software', label: 'Custom Software Development' },
    { value: 'ai-solutions', label: 'AI & Automation Solutions' },
    { value: 'web-mobile', label: 'Web & Mobile Applications' },
    { value: 'cloud-services', label: 'Cloud & DevOps Solutions' },
    { value: 'consulting', label: 'Software Consulting & QA' },
    { value: 'data-security', label: 'Data Management & Security' },
    { value: 'other', label: 'Other / Custom Solution' }
  ];

  projectTypeOptions = [
    { value: 'new-project', label: 'New Project from Scratch' },
    { value: 'enhancement', label: 'Enhance Existing System' },
    { value: 'migration', label: 'System Migration/Upgrade' },
    { value: 'integration', label: 'Third-party Integration' },
    { value: 'maintenance', label: 'Ongoing Maintenance & Support' }
  ];

  budgetOptions = [
    { value: 'under-50k', label: 'Under R50,000', range: 'Small Project' },
    { value: '50k-200k', label: 'R50,000 - R200,000', range: 'Medium Project' },
    { value: '200k-500k', label: 'R200,000 - R500,000', range: 'Large Project' },
    { value: '500k-1m', label: 'R500,000 - R1,000,000', range: 'Enterprise Project' },
    { value: '1m-plus', label: 'R1,000,000+', range: 'Enterprise Solution' },
    { value: 'discuss', label: 'Let\'s Discuss', range: 'Custom Quote' }
  ];

  timelineOptions = [
    { value: 'urgent', label: 'Urgent (ASAP)', description: 'Rush delivery' },
    { value: '1-3-months', label: '1-3 Months', description: 'Standard timeline' },
    { value: '3-6-months', label: '3-6 Months', description: 'Complex project' },
    { value: '6-12-months', label: '6-12 Months', description: 'Large-scale project' },
    { value: 'flexible', label: 'Flexible', description: 'No rush' }
  ];

  teamSizeOptions = [
    { value: 'solo', label: '1 Developer', description: 'Simple project' },
    { value: 'small', label: '2-3 Developers', description: 'Small team' },
    { value: 'medium', label: '4-6 Developers', description: 'Medium team' },
    { value: 'large', label: '7+ Developers', description: 'Large team' },
    { value: 'discuss', label: 'Let\'s Discuss', description: 'Custom team size' }
  ];

  featureOptions = [
    { value: 'user-auth', label: 'User Authentication & Authorization' },
    { value: 'database', label: 'Database Design & Management' },
    { value: 'api', label: 'REST/GraphQL API Development' },
    { value: 'ui-ux', label: 'Custom UI/UX Design' },
    { value: 'mobile-app', label: 'Mobile App (iOS/Android)' },
    { value: 'admin-panel', label: 'Admin Dashboard/Panel' },
    { value: 'payment', label: 'Payment Gateway Integration' },
    { value: 'analytics', label: 'Analytics & Reporting' },
    { value: 'ai-ml', label: 'AI/Machine Learning Features' },
    { value: 'real-time', label: 'Real-time Features (Chat, Notifications)' },
    { value: 'third-party', label: 'Third-party Integrations' },
    { value: 'testing', label: 'Automated Testing & QA' }
  ];  constructor(
    private fb: FormBuilder,
    private formService: FormService
  ) {
    this.quoteForm = this.fb.group({
      // Step 1: Project Type
      service: ['', Validators.required],
      projectType: ['', Validators.required],
      features: [[]],
      
      // Step 2: Budget & Timeline
      budget: ['', Validators.required],
      timeline: ['', Validators.required],
      teamSize: [''],
      
      // Step 3: Project Details
      message: ['', [Validators.required, Validators.minLength(20)]],
      
      // Step 4: Contact Information
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: ['']
    });
  }

  ngOnInit() {
    // Load existing data from localStorage if available
    const savedData = this.formService.getQuoteData();
    if (Object.keys(savedData).length > 0) {
      this.quoteForm.patchValue(savedData);
      this.currentStep = savedData.currentStep || 1;
    }
  }

  get currentStepData() {
    return this.steps[this.currentStep - 1];
  }

  get progressPercentage() {
    return (this.currentStep / this.totalSteps) * 100;
  }

  nextStep() {
    if (this.isCurrentStepValid()) {
      // Save current step data
      this.saveCurrentStepData();
      
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        this.formService.updateQuoteStep(this.currentStep);
      }
    } else {
      this.markCurrentStepTouched();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.saveCurrentStepData();
      this.currentStep--;
      this.formService.updateQuoteStep(this.currentStep);
    }
  }

  private saveCurrentStepData() {
    const currentFormValue = this.quoteForm.value;
    this.formService.saveQuoteData(currentFormValue);
  }

  private isCurrentStepValid(): boolean {
    const stepFields = this.currentStepData.fields;
    return stepFields.every(field => {
      const control = this.quoteForm.get(field);
      return control?.valid;
    });
  }

  private markCurrentStepTouched() {
    const stepFields = this.currentStepData.fields;
    stepFields.forEach(field => {
      const control = this.quoteForm.get(field);
      control?.markAsTouched();
    });
  }

  onFeatureChange(feature: string, checked: boolean) {
    const features = this.quoteForm.get('features')?.value || [];
    if (checked) {
      if (!features.includes(feature)) {
        features.push(feature);
      }
    } else {
      const index = features.indexOf(feature);
      if (index > -1) {
        features.splice(index, 1);
      }
    }
    this.quoteForm.patchValue({ features });
    this.saveCurrentStepData();
  }

  isFeatureSelected(feature: string): boolean {
    const features = this.quoteForm.get('features')?.value || [];
    return features.includes(feature);
  }

  onSubmit() {
    if (this.quoteForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';

      const formData: QuoteFormData = {
        ...this.quoteForm.value,
        submittedAt: new Date().toISOString()
      };

      // Use the new email service to send formatted quote email
      this.formService.submitQuoteForm(formData).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.submitMessage = response.message;
          this.formService.clearQuoteData(); // Clear saved data after successful submission
          this.isSubmitting = false;
          
          // Optional: Show success message for longer
          setTimeout(() => {
            this.submitMessage = '';
          }, 5000);
        },
        error: (error) => {
          this.submitSuccess = false;
          this.submitMessage = error.message || 'An error occurred while sending your quote request. Please try again or contact us directly.';
          this.isSubmitting = false;
          console.error('Quote submission error:', error);
        }
      });
    } else {
      this.markCurrentStepTouched();
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.quoteForm.get(fieldName);
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
      service: 'Service type',
      projectType: 'Project type',
      budget: 'Budget range',
      timeline: 'Timeline',
      message: 'Project description',
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone number',
      company: 'Company name'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.quoteForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  // Reset form and start over
  startOver() {
    this.currentStep = 1;
    this.quoteForm.reset();
    this.formService.clearQuoteData();
    this.submitMessage = '';
    this.submitSuccess = false;
  }

  // Skip optional steps
  skipStep() {
    if (this.currentStep === 3 && this.quoteForm.get('message')?.value?.length < 20) {
      // Add minimal message for skipping
      this.quoteForm.patchValue({ 
        message: 'I would like to discuss my project requirements with your team.' 
      });
    }
    this.nextStep();
  }
}
