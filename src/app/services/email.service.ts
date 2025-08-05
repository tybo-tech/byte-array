import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { QuoteFormData } from './form.service';

export interface EmailRequest {
  sender_name: string;
  recipient_name: string;
  recipient_email: string;
  subject: string;
  message: string;
}

export interface EmailResponse {
  message: string;
  success?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly EMAIL_API_URL = 'https://cms.tybo.co.za/send.php';
  private readonly COMPANY_NAME = 'Byte Array';
  private readonly COMPANY_EMAIL = 'info@bytearray.co.za';

  constructor(private http: HttpClient) { }

  /**
   * Send quote email to customer with formatted HTML content
   */
  sendQuoteEmail(quoteData: QuoteFormData): Observable<EmailResponse> {
    const emailContent = this.formatQuoteEmail(quoteData);

    const emailRequest: EmailRequest = {
      sender_name: this.COMPANY_NAME,
      recipient_name: quoteData.name,
      recipient_email: this.COMPANY_EMAIL,
      subject: `Quote Request Confirmation - ${quoteData.service}`,
      message: emailContent
    };

    return this.sendEmail(emailRequest);
  }

  /**
   * Send contact form email to customer
   */
  sendContactEmail(contactData: any): Observable<EmailResponse> {
    const emailContent = this.formatContactEmail(contactData);

    const emailRequest: EmailRequest = {
      sender_name: this.COMPANY_NAME,
      recipient_name: contactData.name,
      recipient_email: contactData.email,
      subject: 'Thank you for contacting Byte Array',
      message: emailContent
    };

    return this.sendEmail(emailRequest);
  }

  /**
   * Send email via Tybo Solutions API
   */
  private sendEmail(emailRequest: EmailRequest): Observable<EmailResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<EmailResponse>(this.EMAIL_API_URL, emailRequest, { headers })
      .pipe(
        map(response => ({
          ...response,
          success: true
        })),
        catchError(error => {
          console.error('Email sending error:', error);
          return throwError(() => ({
            message: 'Failed to send email',
            success: false,
            error: error
          }));
        })
      );
  }

  /**
   * Format quote data into beautiful HTML email
   */
  private formatQuoteEmail(quoteData: QuoteFormData): string {
    const featuresHtml = quoteData.features && quoteData.features.length > 0
      ? quoteData.features.map(feature => `<li style="margin: 5px 0; color: #333;">${feature}</li>`).join('')
      : '<li style="margin: 5px 0; color: #333;">No specific features selected</li>';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote Request Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Byte Array</h1>
                            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Quote Request Confirmation</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">Dear ${quoteData.name},</h2>

                            <p style="color: #666; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
                                Thank you for your interest in our services! We have received your quote request and our team is reviewing your requirements. Below is a summary of your submission:
                            </p>

                            <!-- Quote Details Table -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 6px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Quote Details</h3>

                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #333; font-size: 14px;">Service Required:</strong>
                                                </td>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                                    <span style="color: #667eea; font-weight: 600; font-size: 14px;">${quoteData.service}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #333; font-size: 14px;">Budget Range:</strong>
                                                </td>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                                    <span style="color: #28a745; font-weight: 600; font-size: 14px;">${quoteData.budget}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #333; font-size: 14px;">Timeline:</strong>
                                                </td>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                                    <span style="color: #fd7e14; font-weight: 600; font-size: 14px;">${quoteData.timeline}</span>
                                                </td>
                                            </tr>
                                            ${quoteData.projectType ? `
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #333; font-size: 14px;">Project Type:</strong>
                                                </td>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                                    <span style="color: #6f42c1; font-weight: 600; font-size: 14px;">${quoteData.projectType}</span>
                                                </td>
                                            </tr>
                                            ` : ''}
                                            ${quoteData.company ? `
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #333; font-size: 14px;">Company:</strong>
                                                </td>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                                    <span style="color: #333; font-weight: 600; font-size: 14px;">${quoteData.company}</span>
                                                </td>
                                            </tr>
                                            ` : ''}
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <strong style="color: #333; font-size: 14px;">Contact Phone:</strong>
                                                </td>
                                                <td style="padding: 8px 0; text-align: right;">
                                                    <span style="color: #333; font-weight: 600; font-size: 14px;">${quoteData.phone || 'Not provided'}</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Features Section -->
                            ${quoteData.features && quoteData.features.length > 0 ? `
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 6px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Selected Features:</h3>
                                        <ul style="margin: 0; padding: 0 0 0 20px; list-style-type: disc;">
                                            ${featuresHtml}
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}

                            <!-- Message Section -->
                            ${quoteData.message ? `
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 6px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Additional Requirements:</h3>
                                        <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px; font-style: italic;">
                                            "${quoteData.message}"
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}

                            <!-- Next Steps -->
                            <div style="background-color: #e3f2fd; border-left: 4px solid #2196f3; padding: 20px; margin: 25px 0; border-radius: 0 6px 6px 0;">
                                <h3 style="color: #1976d2; margin: 0 0 10px 0; font-size: 18px;">What's Next?</h3>
                                <ul style="color: #666; margin: 0; padding: 0 0 0 20px; line-height: 1.6;">
                                    <li style="margin: 5px 0;">Our team will review your requirements within 24-48 hours</li>
                                    <li style="margin: 5px 0;">We'll prepare a detailed proposal tailored to your needs</li>
                                    <li style="margin: 5px 0;">A project manager will contact you to discuss the next steps</li>
                                </ul>
                            </div>

                            <p style="color: #666; line-height: 1.6; margin: 25px 0 0 0; font-size: 16px;">
                                If you have any questions or need to discuss your requirements further, please don't hesitate to contact us.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #2c3e50; padding: 30px; text-align: center;">
                            <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px;">Byte Array</h3>
                            <p style="color: #bdc3c7; margin: 0 0 10px 0; font-size: 14px;">
                                Email: info@bytearray.co.za<br>
                                Phone: +27 11 123 4567<br>
                                Website: www.bytearray.co.za
                            </p>
                            <p style="color: #95a5a6; margin: 15px 0 0 0; font-size: 12px; line-height: 1.4;">
                                This email was sent in response to your quote request on our website.<br>
                                © 2025 Byte Array. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
  }

  /**
   * Format contact form data into HTML email
   */
  private formatContactEmail(contactData: any): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for contacting us</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4f4f4; padding: 20px 0;">
        <tr>
            <td align="center">
                <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Byte Array</h1>
                            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Thank you for reaching out!</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">Dear ${contactData.name},</h2>

                            <p style="color: #666; line-height: 1.6; margin: 0 0 25px 0; font-size: 16px;">
                                Thank you for contacting Byte Array! We have received your message and will get back to you within 24-48 hours.
                            </p>

                            <!-- Contact Details -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 6px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: #333; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Your Message Details</h3>

                                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #333; font-size: 14px;">Name:</strong>
                                                </td>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                                    <span style="color: #333; font-weight: 600; font-size: 14px;">${contactData.name}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #333; font-size: 14px;">Email:</strong>
                                                </td>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                                    <span style="color: #667eea; font-weight: 600; font-size: 14px;">${contactData.email}</span>
                                                </td>
                                            </tr>
                                            ${contactData.phone ? `
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #333; font-size: 14px;">Phone:</strong>
                                                </td>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                                    <span style="color: #333; font-weight: 600; font-size: 14px;">${contactData.phone}</span>
                                                </td>
                                            </tr>
                                            ` : ''}
                                            ${contactData.company ? `
                                            <tr>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                                                    <strong style="color: #333; font-size: 14px;">Company:</strong>
                                                </td>
                                                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; text-align: right;">
                                                    <span style="color: #333; font-weight: 600; font-size: 14px;">${contactData.company}</span>
                                                </td>
                                            </tr>
                                            ` : ''}
                                            ${contactData.inquiry ? `
                                            <tr>
                                                <td style="padding: 8px 0;">
                                                    <strong style="color: #333; font-size: 14px;">Inquiry Type:</strong>
                                                </td>
                                                <td style="padding: 8px 0; text-align: right;">
                                                    <span style="color: #28a745; font-weight: 600; font-size: 14px;">${contactData.inquiry}</span>
                                                </td>
                                            </tr>
                                            ` : ''}
                                        </table>
                                    </td>
                                </tr>
                            </table>

                            <!-- Message Content -->
                            ${contactData.message ? `
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 6px; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="color: #333; margin: 0 0 15px 0; font-size: 18px;">Your Message:</h3>
                                        <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px; font-style: italic;">
                                            "${contactData.message}"
                                        </p>
                                    </td>
                                </tr>
                            </table>
                            ` : ''}

                            <p style="color: #666; line-height: 1.6; margin: 25px 0 0 0; font-size: 16px;">
                                We appreciate your interest in our services and look forward to discussing how we can help you achieve your goals.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #2c3e50; padding: 30px; text-align: center;">
                            <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px;">Byte Array</h3>
                            <p style="color: #bdc3c7; margin: 0 0 10px 0; font-size: 14px;">
                                Email: info@bytearray.co.za<br>
                                Phone: +27 11 123 4567<br>
                                Website: www.bytearray.co.za
                            </p>
                            <p style="color: #95a5a6; margin: 15px 0 0 0; font-size: 12px; line-height: 1.4;">
                                This email was sent in response to your contact form submission.<br>
                                © 2025 Byte Array. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
  }
}
