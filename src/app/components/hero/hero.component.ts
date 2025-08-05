import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BubblesComponent } from "../../bubbles/bubbles.component";

@Component({
  selector: 'app-hero',
  imports: [RouterModule, BubblesComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
