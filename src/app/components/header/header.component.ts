import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="profile-section">
        <div class="avatar">
          {{getInitials()}}
        </div>
        <div class="info">
          <h1 class="name">{{name()}}</h1>
          <p class="title">{{title()}}</p>
          <!-- <p class="tagline">{{tagline()}}</p> -->
        </div>
      </div>
      <div class="status-indicator">
        <span class="status-dot"></span>
        <span class="status-text">Available for chat</span>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #007AFF 0%, #5856D6 100%);
      color: white;
      padding: 2rem 1.5rem 1.5rem 1.5rem;
      border-radius: 16px 16px 0 0;
      box-shadow: 0 2px 20px rgba(0, 122, 255, 0.2);
      margin-bottom: 0;
      position: relative;
    }

    .profile-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .avatar {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.2rem;
      backdrop-filter: blur(10px);
    }

    .info {
      flex: 1;
    }

    .name {
      margin: 0 0 0.25rem 0;
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .title {
      margin: 0 0 0.25rem 0;
      font-size: 1rem;
      opacity: 0.9;
      font-weight: 500;
    }

    .tagline {
      margin: 0;
      font-size: 0.875rem;
      opacity: 0.8;
      font-weight: 400;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: #34C759;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .status-text {
      font-weight: 500;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.6; }
      100% { opacity: 1; }
    }
  `]
})
export class HeaderComponent {
  name = input<string>('');
  title = input<string>('');
  //tagline = input<string>('The best software engineer you\'ve ever seen!');

  getInitials(): string {
    const nameParts = this.name().split(' ');
    return nameParts.map(part => part.charAt(0)).join('').slice(0, 2);
  }
}
