import { Component, inject, Input } from '@angular/core';
import { LiveStatsService } from '../../services/live-stats.service';
import { StatPillComponent } from '../../shared/stat-pill.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [StatPillComponent],
  template: `
    <section class="hero">
      <div class="hero__copy">
        <h1 class="hero__name">{{ name }}</h1>
        <p class="hero__title">{{ title }}</p>
      </div>

      <div class="hero__stats" aria-label="key statistics">
        <div class="stat-card stat-card--light">
          <div class="stat-card__row">
            <span class="stat-card__label">is currently in</span>
            <app-stat-pill [value]="'London 🇬🇧'" />
          </div>
        </div>

        <div class="stat-card stat-card--dark">
          <div class="stat-card__row">
            <span class="stat-card__label">is reading</span>
            <app-stat-pill [value]="'Just like you'" />
          </div>
        </div>

        <div class="stat-card stat-card--blue">
          <div class="stat-card__row stat-card__row--wrap">
            <span class="stat-card__label">last commit made</span>
            <app-stat-pill [value]="stats.codingSeconds()"/>
            <span class="stat-card__label">seconds ago</span>
          </div>
        </div>
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