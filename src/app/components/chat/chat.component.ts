import { Component, computed, signal, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
        @if (questionLimitReached()) {
          <p class="question-limit" role="status">
            Please don't use all my credits! Thanks for stopping by.
          </p>
        }
      </div>

      <div class="input-container">
        <input 
          type="text" 
          #messageInput
          [(ngModel)]="currentMessage"
          (keypress)="onKeyPress($event)"
          placeholder="Type your message..."
          class="message-input"
          [disabled]="questionLimitReached() || isTyping()"
        />
        <button 
          (click)="sendMessage()"
          class="send-button"
          [disabled]="questionLimitReached() || isTyping() || !currentMessage.trim()"
        >
          Send
        </button>
      </div>
    </div>
  `,
  styleUrl: './chat.component.css'
})
export class ChatComponent implements AfterViewChecked {
  private readonly maxQuestions = 5;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef<HTMLInputElement>;
  
  messages = signal<ChatMessage[]>([]);
  currentMessage = '';
  isTyping = signal(false);
  questionLimitReached = computed(() => this.userQuestionCount() >= this.maxQuestions);
  private userQuestionCount = computed(
    () => this.messages().filter(message => message.type === 'user').length
  );
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
    if (!this.currentMessage.trim() || this.questionLimitReached() || this.isTyping()) {
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
      this.focusMessageInput();
    }
  }

  private focusMessageInput(): void {
    if (this.questionLimitReached()) {
      return;
    }

    setTimeout(() => this.messageInput?.nativeElement.focus());
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !this.questionLimitReached() && !this.isTyping()) {
      this.sendMessage();
    }
  }
}
