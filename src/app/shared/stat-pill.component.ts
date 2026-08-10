import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stat-pill',
    standalone: true,
    template: `<span class="pill">{{ value }}<span class="dot"></span></span>`,
    styles: `
    .pill { display:inline-flex; align-items:center; gap:6px; background:var(--ink);
      color:#fff; padding:4px 12px; border-radius:999px; font-weight:700; }
    .dot { width:6px; height:6px; border-radius:50%; background:var(--accent); }
  `
})
export class StatPillComponent {
    @Input() value: string | number | null= '';
}