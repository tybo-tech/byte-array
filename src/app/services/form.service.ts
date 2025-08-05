import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EmailService } from './email.service';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  inquiry?: string;
}

export interface QuoteFormData extends ContactFormData {
  service: string;
  budget: string;
  timeline: string;
  projectType?: string;
  features?: string[];
  teamSize?: string;
  currentStep?: number;
}

export interface FormResponse {
  success: boolean;
  message: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly QUOTE_STORAGE_KEY = 'byte_array_quote_data';

  constructor(
    private http: HttpClient,
    private emailService: EmailService
  ) { }

  // Local Storage Methods for Multi-step Form
  saveQuoteData(data: Partial<QuoteFormData>): void {
    const existingData = this.getQuoteData();
    const updatedData = { ...existingData, ...data };
    localStorage.setItem(this.QUOTE_STORAGE_KEY, JSON.stringify(updatedData));
  }

  getQuoteData(): Partial<QuoteFormData> {
    const stored = localStorage.getItem(this.QUOTE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  clearQuoteData(): void {
    localStorage.removeItem(this.QUOTE_STORAGE_KEY);
  }

  updateQuoteStep(step: number): void {
    const data = this.getQuoteData();
    data.currentStep = step;
    this.saveQuoteData(data);
  }

  submitContactForm(formData: ContactFormData): Observable<FormResponse> {
    return this.emailService.sendContactEmail(formData)
      .pipe(
        map(response => ({
          success: response.success || true,
          message: response.message || 'Thank you for your message! We\'ll get back to you within 24-48 hours.',
          data: response
        })),
        catchError(error => {
          console.error('Contact form submission error:', error);
          return throwError(() => ({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again or contact us directly.',
            error: error
          }));
        })
      );
  }

  submitQuoteForm(formData: QuoteFormData): Observable<FormResponse> {
    return this.emailService.sendQuoteEmail(formData)
      .pipe(
        map(response => ({
          success: response.success || true,
          message: response.message || 'Thank you for your quote request! Our team will review your requirements and get back to you within 24-48 hours.',
          data: response
        })),
        catchError(error => {
          console.error('Quote form submission error:', error);
          return throwError(() => ({
            success: false,
            message: 'Sorry, there was an error submitting your quote request. Please try again or contact us directly.',
            error: error
          }));
        })
      );
  }

  // Alternative method for when no backend is available - using Formspree or similar
  submitFormWithoutBackend(formData: any): Observable<FormResponse> {
    // This is a mock implementation - replace with actual service
    return new Observable(observer => {
      setTimeout(() => {
        // Simulate form submission
        observer.next({
          success: true,
          message: 'Thank you for your submission! We\'ll get back to you soon.'
        });
        observer.complete();
      }, 1000);
    });
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone number (basic)
  validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }
}
