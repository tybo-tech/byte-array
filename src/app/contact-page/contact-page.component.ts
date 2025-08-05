import { Component } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { FinalCtaComponent } from "../components/final-cta/final-cta.component";
import { FaqComponent } from "../components/faq/faq.component";

@Component({
  selector: 'app-contact-page',
  imports: [BannerComponent, FinalCtaComponent, FaqComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {

}
