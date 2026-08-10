import { Component } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  template: `
    <div class="marquee">
      <div class="marquee__track">
        @for (word of words; track $index) {
          <span>{{ word }}</span><span class="sep">✳</span>
        }
        @for (word of words; track $index) {
          <span aria-hidden="true">{{ word }}</span><span class="sep" aria-hidden="true">✳</span>
        }
      </div>
    </div>
  `,
  styleUrl: './marquee.component.css'
})
export class MarqueeComponent {
  words = ['ENGINEER', 'PROBLEM SOLVER', 'FULL-STACK', 'ANGULAR ENTHUSIAST'];
}