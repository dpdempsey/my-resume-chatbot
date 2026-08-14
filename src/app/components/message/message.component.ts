import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

export interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
}

type MessageType = 'user' | 'bot' | 'system';

@Component({
  selector: 'app-message',
  imports: [DatePipe],
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
  styleUrl: './message.component.css'
})
export class MessageComponent {
  
  message = input.required<ChatMessage>();
}
