import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollAnimateDirective } from '../../directives/scroll-animate.directive';

@Component({
  selector: 'app-footer',
  imports: [RouterModule,ScrollAnimateDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
