import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

// TODO: Create the ChatMessage interface
// HINTS: 
// - Remember your TypeScript playground? Use similar structure
// - Properties needed: id (string), content (string), type, timestamp (Date)
// - type should be: 'user' | 'bot' | 'system'
export interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

type MessageType = 'user' | 'bot' | 'system';

@Component({
  selector: 'app-message',
  imports: [DatePipe], // This lets us format dates in templates
  template: `
    <div class="message" [class]="'message-'+ message().type">
        <div class="message-header">
            <span class="sender">
            @if (message().type === 'user') {
                You
            } @else if (message().type === 'bot') {
                Assistant  
            } @else {
                System
            }
            </span>
            <span class="time">{{ message().timestamp | date:'short' }}</span>
        </div>
        <div class="content">{{ message().content }}</div>
    </div>
  `,
  styles: [`
    /* Base message styling - iPhone style */
    .message {
      padding: 0.75rem 1rem;
      margin: 0.25rem 0;
      border-radius: 18px;
      max-width: 75%;
      position: relative;
      animation: slideIn 0.3s ease-out;
      word-wrap: break-word;
      line-height: 1.4;
    }

    /* Message header with sender and time */
    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.25rem;
      font-size: 0.7rem;
      opacity: 0.7;
    }

    .sender {
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      font-size: 0.65rem;
    }

    .time {
      font-size: 0.65rem;
      opacity: 0.8;
    }

    /* Message content */
    .content {
      line-height: 1.4;
      word-wrap: break-word;
      font-size: 0.95rem;
    }

    /* User messages - iMessage blue style */
    .message-user {
      background: #007AFF;  /* Official iMessage blue */
      color: white;
      margin-left: auto;
      margin-right: 0;
      border-bottom-right-radius: 6px;
      box-shadow: 0 1px 2px rgba(0, 122, 255, 0.3);
    }

    .message-user .sender {
      color: rgba(255,255,255,0.8);
    }

    .message-user .time {
      color: rgba(255,255,255,0.7);
    }

    /* Bot messages - iPhone gray style */
    .message-bot {
      background: #E9E9EB;  /* iPhone gray bubble */
      color: #000;
      margin-left: 0;
      margin-right: auto;
      border-bottom-left-radius: 6px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .message-bot .sender {
      color: #007AFF;
    }

    .message-bot .time {
      color: #666;
    }

    /* System messages - iPhone style notification */
    .message-system {
      background: #F0F0F0;
      color: #666;
      border: none;
      margin: 0.5rem auto;
      text-align: center;
      font-style: italic;
      max-width: 60%;
      font-size: 0.85rem;
      border-radius: 12px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .message-system .sender {
      color: #666;
    }

    /* Hover effects - subtle like iPhone */
    .message:hover {
      transform: translateY(-0.5px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.12);
    }

    .message-user:hover {
      box-shadow: 0 2px 4px rgba(0, 122, 255, 0.4);
    }

    /* Animation - smooth like iPhone */
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(8px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Responsive design - iPhone style */
    @media (max-width: 768px) {
      .message {
        max-width: 85%;
        padding: 0.6rem 0.9rem;
        font-size: 0.9rem;
      }
      
      .message-system {
        max-width: 80%;
        font-size: 0.8rem;
      }

      .content {
        font-size: 0.9rem;
      }
      
      .message-header {
        font-size: 0.65rem;
      }
      
      .sender, .time {
        font-size: 0.6rem;
      }
    }

    /* Focus for accessibility */
    .message:focus {
      outline: 2px solid #007AFF;
      outline-offset: 2px;
    }

    /* Add subtle spacing between consecutive messages */
    .message + .message {
      margin-top: 0.15rem;
    }
  `]
})
export class MessageComponent {
  // TODO: Create input signal for message data
  // HINTS:
  // - Use input.required<ChatMessage>() since every message needs data
  // - This makes the message prop required when using the component
  
  message = input.required<ChatMessage>();
}
