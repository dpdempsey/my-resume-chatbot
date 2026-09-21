import { Component, Input } from '@angular/core';
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

        <nav class="contact-links" aria-label="Contact links">
          <a class="contact-link contact-link--linkedin" href="https://www.linkedin.com/in/declan-dempsey" target="_blank" rel="noreferrer">
            <svg class="contact-link__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 8.5H3.2V20h3.3V8.5ZM4.85 3A2 2 0 1 0 4.8 7a2 2 0 0 0 .05-4ZM21 13.4c0-3.45-1.84-5.05-4.3-5.05-1.98 0-2.86 1.1-3.35 1.87V8.5H10V20h3.35v-6.18c0-1.63.3-3.2 2.32-3.2 2 0 2.03 1.86 2.03 3.3V20H21v-6.6Z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a class="contact-link contact-link--github" href="https://github.com/dpdempsey" target="_blank" rel="noreferrer">
            <svg class="contact-link__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5a9.5 9.5 0 0 0-3 18.51c.48.09.65-.21.65-.46v-1.63c-2.65.58-3.21-1.12-3.21-1.12-.43-1.1-1.06-1.4-1.06-1.4-.87-.6.07-.59.07-.59.96.07 1.46.99 1.46.99.85 1.45 2.23 1.03 2.77.79.09-.62.33-1.03.6-1.27-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.42-1.21.1-2.52 0 0 .8-.26 2.62.98A9.15 9.15 0 0 1 12 7.18c.81 0 1.63.11 2.4.32 1.82-1.24 2.62-.98 2.62-.98.52 1.31.2 2.28.1 2.52.61.67.98 1.52.98 2.56 0 3.67-2.23 4.48-4.36 4.72.34.29.64.86.64 1.74v2.59c0 .25.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a class="contact-link contact-link--email" href="mailto:website@declandempsey.dev">
            <svg class="contact-link__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3.5 5.5h17v13h-17v-13Zm1.1 1.4 6.9 5.3a.8.8 0 0 0 1 0l6.9-5.3M4.1 17.1l5.1-4M19.9 17.1l-5.1-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7" />
            </svg>
            <span>Email</span>
          </a>
        </nav>
        
      </div>
    </section>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() name = '';
  @Input() title = '';
}