import { Component } from '@angular/core';
import { FinalCtaComponent } from "../components/final-cta/final-cta.component";
import { FaqComponent } from "../components/faq/faq.component";
import { BannerComponent } from "../banner/banner.component";

@Component({
  selector: 'app-quotes',
  imports: [FinalCtaComponent, FaqComponent, BannerComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {

}
