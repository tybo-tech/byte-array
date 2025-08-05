import { Component } from '@angular/core';
import { WhyChooseComponent } from "../components/why-choose/why-choose.component";
import { HeroComponent } from "../components/hero/hero.component";
import { ServicesSectionComponent } from "../services-section/services-section.component";
import { TestimonialsComponent } from "../components/testimonials/testimonials.component";
import { FinalCtaComponent } from "../components/final-cta/final-cta.component";
import { CustomersComponent } from "../components/customers/customers.component";

@Component({
  selector: 'app-home',
  imports: [WhyChooseComponent, HeroComponent, ServicesSectionComponent, TestimonialsComponent, FinalCtaComponent, CustomersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
