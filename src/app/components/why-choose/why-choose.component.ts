import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-why-choose',
  imports: [RouterModule, CommonModule],
  templateUrl: './why-choose.component.html',
  styleUrl: './why-choose.component.scss',
})
export class WhyChooseComponent {
  @Input() showCta = false;
}
