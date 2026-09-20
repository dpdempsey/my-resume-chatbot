import { Component, inject, Input } from '@angular/core';
import { LiveStatsService } from '../../services/live-stats.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <section class="hero">
      <div class="hero__copy">
        <h1 class="hero__name">{{ name }}</h1>
        <p class="hero__title">{{ title }}</p>
      </div>

      <div class="hero__visual">
        <div class="hero__wrapper">
          <img class="hero__picture" ngSrc="/me.jpg" width="719" height="719" priority alt="Declan Dempsey">
        </div>

        <!-- <div class="hero__stats" aria-label="key statistics">
          <div class="stats-panel">
            <div class="stats-panel__row">
              <span class="stats-panel__label">currently in</span>
              <strong>London 🇬🇧</strong>
            </div>
            <div class="stats-panel__row stats-panel__row--reading">
              <span class="stats-panel__label">currently reading</span>
              <strong>Just like you</strong>
            </div>
            <div class="stats-panel__row">
              <span class="stats-panel__label">coding clock</span>
              <strong>{{ stats.codingSeconds() }} seconds</strong>
            </div>
          </div>
        </div> -->
        
      </div>
    </section>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() name = '';
  @Input() title = '';
  stats = inject(LiveStatsService);
}