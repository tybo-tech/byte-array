import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerComponent } from '../banner/banner.component';
import { FinalCtaComponent } from '../components/final-cta/final-cta.component';
import { WhyChooseComponent } from '../components/why-choose/why-choose.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services-page',
  imports: [
    CommonModule,
    BannerComponent,
    FinalCtaComponent,
    WhyChooseComponent,
    RouterModule,
  ],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss',
})
export class ServicesPageComponent {
  services = [
    {
      title: 'Custom Software Development',
      shortDescription:
        'Tailored solutions built to meet your unique business needs.',
      details: [
        'We design and develop custom software that aligns perfectly with your business operations.',
        'Our solutions are scalable, secure, and optimized for performance.',
        'We handle everything from requirements gathering to post-launch support.',
      ],
      image: '/images/custom-software.jpg',
      expanded: true,
    },
    {
      title: 'AI & Automation Solutions',
      shortDescription:
        'Harness the power of artificial intelligence to optimize your workflow.',
      details: [
        'We build AI-driven automation solutions to enhance efficiency and decision-making.',
        'Our AI models are trained on industry-specific data for high accuracy.',
        'We integrate machine learning, NLP, and predictive analytics into your systems.',
      ],
      image: '/images/ai-automation.jpg',
      expanded: false,
    },
    {
      title: 'Web & Mobile Applications',
      shortDescription:
        'User-friendly, high-performance web and mobile applications.',
      details: [
        'We create responsive, high-speed applications tailored to your business needs.',
        'Our apps provide seamless cross-platform experiences across iOS, Android, and web.',
        'We focus on UX/UI design to maximize engagement and conversions.',
      ],
      image: '/images/web-mobile.jpg',
      expanded: false,
    },
    {
      title: 'Cloud & DevOps Solutions',
      shortDescription: 'Seamless cloud integration and DevOps automation.',
      details: [
        'We deploy scalable cloud infrastructure with AWS, Azure, and Google Cloud.',
        'Our DevOps strategies ensure continuous integration and deployment.',
        'We optimize cloud costs while improving system performance and security.',
      ],
      image: '/images/cloud-devops.jpg',
      expanded: false,
    },
    {
      title: 'Software Consulting & QA',
      shortDescription:
        'Expert advisory and rigorous quality assurance testing.',
      details: [
        'We conduct in-depth software audits to identify security and performance gaps.',
        'Our QA engineers perform manual and automated testing for reliability.',
        'We provide strategic advice on architecture, scalability, and compliance.',
      ],
      image: '/images/software-consulting.jpg',
      expanded: false,
    },
    {
      title: 'Data Management & Security',
      shortDescription:
        'Secure and efficient data storage, processing, and analytics.',
      details: [
        'We design and implement secure databases and data pipelines.',
        'Our solutions comply with industry security standards (GDPR, HIPAA, etc.).',
        'We provide real-time analytics and business intelligence solutions.',
      ],
      image: '/images/data-security.jpg',
      expanded: false,
    },
  ];

  toggleService(index: number) {
    this.services[index].expanded = !this.services[index].expanded;
  }
}
