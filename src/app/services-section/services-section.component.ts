import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';

@Component({
  selector: 'app-services-section',
  imports: [RouterModule, ScrollAnimateDirective],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss'
})
export class ServicesSectionComponent {

}
