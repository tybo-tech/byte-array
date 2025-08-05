import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqs = [
    {
      question: 'What services does Byte Array offer?',
      answer: 'We specialize in custom software development, AI-powered solutions, cloud computing, and cybersecurity.',
      open: false,
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity, but most solutions are delivered within 4-12 weeks.',
      open: false,
    },
    {
      question: 'Do you provide ongoing support and maintenance?',
      answer: 'Yes, we offer ongoing support, software updates, and system optimization services.',
      open: false,
    },
    {
      question: 'Is my data secure with Byte Array?',
      answer: 'Absolutely! We implement enterprise-grade security measures, encryption, and compliance with industry standards.',
      open: false,
    },
    {
      question: 'How can I get started?',
      answer: 'Simply contact us through our form, and we’ll schedule a free consultation to discuss your project.',
      open: false,
    },
  ];

  toggleFAQ(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
