import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stat-pill',
    standalone: true,
    template: `<span class="pill">{{ value }}<span class="dot"></span></span>`,
    styles: `
    .pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--ink);
      color: #fff;
      padding: 0.2rem 0.9rem 0.25rem 0.9rem;
      border-radius: 999px;
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.1;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
    }
    .dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: var(--accent);
      display: inline-block;
      box-shadow: 0 0 0 2px rgba(198, 93, 90, 0.18);
    }
  `
})
export class StatPillComponent {
    @Input() value: string | number | null= '';
}