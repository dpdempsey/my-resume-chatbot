import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LiveStatsService {
  private codingStart = new Date('2022-01-01').getTime();
  codingSeconds = signal(0);
  yearsExperience = signal(2);
  openToWork = signal(false);
  daysSinceCommit = signal(2);

  constructor() {
    setInterval(() => {
      this.codingSeconds.set(Math.floor((Date.now() - this.codingStart) / 1000));
    }, 1000);
  }
}