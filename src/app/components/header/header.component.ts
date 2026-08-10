import { Component, inject, Input } from '@angular/core';
import { LiveStatsService } from '../../services/live-stats.service';
import { StatPillComponent } from '../../shared/stat-pill.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [StatPillComponent, DecimalPipe],
  template: `
    <section class="hero">
      <h1 class="hero__name">{{ name }}</h1>

      <div class="stats-grid">
        <div class="card card--pink">
          open to <app-stat-pill [value]="stats.openToWork() ? 'new roles' : 'not looking'" />
        </div>
        <div class="card card--slate">
          has <app-stat-pill [value]="stats.yearsExperience() + ' yrs'" /> experience
        </div>
        <div class="card card--wide card--blue">
          been coding for <app-stat-pill [value]="stats.codingSeconds() | number" /> seconds.
          Portfolio last shipped <app-stat-pill [value]="stats.daysSinceCommit()" /> days ago
        </div>
      </div>
    </section>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() name = '';
  stats = inject(LiveStatsService);
}