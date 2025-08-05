import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bubbles',
  imports: [CommonModule],
  templateUrl: './bubbles.component.html',
  styleUrl: './bubbles.component.scss',
})
export class BubblesComponent {
  bubbles: number[] = Array.from({ length: 4 }, (_, i) => i + 1);
}
