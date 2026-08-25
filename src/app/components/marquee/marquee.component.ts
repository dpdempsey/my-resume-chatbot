import { Component } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  template: `
    <div class="marquee">
      <div class="marquee__track">
        <div class="marquee__group">
          @for (word of words; track $index) {
            <span>{{ word }}</span><span class="sep">✳</span>
          }
        </div>
        <div class="marquee__group" aria-hidden="true">
          @for (word of words; track $index) {
            <span>{{ word }}</span><span class="sep">✳</span>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './marquee.component.css'
})
export class MarqueeComponent {
  words = ['ENGINEER', 'PROBLEM SOLVER', 'READER', 'MUSIC LOVER'];
}