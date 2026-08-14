import { Component, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent, ChatMessage } from '../message/message.component';
import { ResumeAgentService } from '../../services/resume-agent.service';

@Component({
  selector: 'app-chat',
  imports: [MessageComponent, FormsModule],
  template: `
    <div class="chat-container">
      <div class="messages-container" #messagesContainer>
        @if (messages().length === 0) {
          <div class="welcome-message">
            <h3>A normal resume is boring</h3>
            <p>Ask me anything about my experience, skills, or projects.</p>
          </div>
        }
        @for (message of messages(); track message.id) {
          <app-message [message]="message" />
        }
        @if (isTyping()) {
          <div class="typing-indicator">
            <span>Assistant is typing</span>
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        }
      </div>

      <div class="input-container">
        <input 
          type="text" 
          [(ngModel)]="currentMessage"
          (keypress)="onKeyPress($event)"
          placeholder="Type your message..."
          class="message-input"
        />
        <button 
          (click)="sendMessage()"
          class="send-button"
        >
          Send
        </button>
      </div>
    </div>
  `,
  styleUrl: './chat.component.css'
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  messages = signal<ChatMessage[]>([]);
  currentMessage = '';
  isTyping = signal(false);
  private shouldScrollToBottom = false;

  constructor(private resumeAgentService: ResumeAgentService) {}

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = 
        this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  async sendMessage() {
    if (!this.currentMessage.trim()) {
      return; 
    }
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: this.currentMessage.trim(),
      type: 'user',
      timestamp: new Date()
    };

    this.messages.update(currentMessages => [...currentMessages, userMessage]);
    const userQuestion = this.currentMessage.trim();
    this.currentMessage = '';
    
    this.shouldScrollToBottom = true;
    
    this.isTyping.set(true);
    
    try {
      const aiResponse = await this.resumeAgentService.askQuestion(userQuestion);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        type: 'bot',
        timestamp: new Date()
      };
      
      this.messages.update(currentMessages => [...currentMessages, botMessage]);
      
      this.shouldScrollToBottom = true;
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble responding right now. Please try again.",
        type: 'system',
        timestamp: new Date()
      };
      
      this.messages.update(currentMessages => [...currentMessages, errorMessage]);
      
      this.shouldScrollToBottom = true;
    } finally {
      this.isTyping.set(false);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
