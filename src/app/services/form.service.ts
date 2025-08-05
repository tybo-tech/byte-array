import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  private readonly API_BASE_URL = 'https://formspree.io/f'; // You can replace with your backend
  private readonly FORM_ID = 'your-form-id'; // Replace with actual form ID

  constructor(private http: HttpClient) { }

  submitContactForm(formData: ContactFormData): Observable<FormResponse> {
    return this.http.post<any>(`${this.API_BASE_URL}/${this.FORM_ID}`, formData)
      .pipe(
        map(response => ({
          success: true,
          message: 'Thank you for your message! We\'ll get back to you within 24-48 hours.',
          data: response
        })),
        catchError(error => {
          console.error('Form submission error:', error);
          return throwError(() => ({
            success: false,
            message: 'Sorry, there was an error sending your message. Please try again or contact us directly.',
            error: error
          }));
        })
      );
  }

  submitQuoteForm(formData: QuoteFormData): Observable<FormResponse> {
    return this.http.post<any>(`${this.API_BASE_URL}/${this.FORM_ID}`, {
      ...formData,
      formType: 'quote'
    })
      .pipe(
        map(response => ({
          success: true,
          message: 'Thank you for your quote request! Our team will review your requirements and get back to you within 24-48 hours.',
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
