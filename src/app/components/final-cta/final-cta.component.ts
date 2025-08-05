import { Component } from '@angular/core';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-final-cta',
  imports: [ScrollAnimateDirective],
  templateUrl: './final-cta.component.html',
  styleUrl: './final-cta.component.scss'
})
export class FinalCtaComponent {
email = 'info@bytearray.co.za'

}
