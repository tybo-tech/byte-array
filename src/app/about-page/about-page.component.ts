import { Component } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { FinalCtaComponent } from "../components/final-cta/final-cta.component";
import { WhyChooseComponent } from "../components/why-choose/why-choose.component";

@Component({
  selector: 'app-about-page',
  imports: [BannerComponent, FinalCtaComponent, WhyChooseComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {

}
