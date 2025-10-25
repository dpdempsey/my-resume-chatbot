import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageComponent, ChatMessage } from '../message/message.component';
import { ResumeAgentService } from '../../services/resume-agent.service';

@Component({
  selector: 'app-chat',
  imports: [MessageComponent, FormsModule],
  template: `
    <div class="chat-container">
      <div class="messages-container">
        @if (messages().length === 0) {
          <div class="welcome-message">
            <h3>👋 Welcome to my Resume Chatbot!</h3>
            <p>Ask me anything about my experience, skills, or projects.</p>
          </div>
        }

        <!-- Messages loop - shows all existing messages -->
        @for (message of messages(); track message.id) {
          <app-message [message]="message" />
        }
        
        <!-- Typing indicator -->
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
  styles: [`
    .chat-container {
      width: 100%;
      max-width: 800px;  /* Fixed maximum width */
      min-width: 400px;  /* Minimum width to prevent shrinking */
      border: 1px solid #E5E5EA;
      border-radius: 12px;
      height: 500px;  /* Slightly taller for better proportions */
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      margin: 0 auto;  /* Center the chat container */
    }

    .messages-container {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      background: #F2F2F7;
      min-height: 0;
    }

    .input-container {
      display: flex;
      padding: 1rem;
      border-top: 1px solid #E5E5EA;
      gap: 0.75rem;
      background: #FFFFFF;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }

    .message-input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid #E5E5EA;
      border-radius: 20px;  /* More iPhone-like rounded input */
      outline: none;
      font-size: 1rem;
      background: #F2F2F7;
      transition: all 0.2s ease;
    }

    .message-input:focus {
      border-color: #007AFF;
      background: #FFFFFF;
      box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
    }

    .send-button {
      padding: 0.75rem 1.5rem;
      background: #007AFF;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      min-width: 70px;  /* Prevent button from shrinking */
    }

    .send-button:hover {
      background: #0056CC;
      transform: translateY(-1px);
    }

    .send-button:disabled {
      background: #C7C7CC;
      cursor: not-allowed;
      transform: none;
    }

    /* Welcome message styling */
    .welcome-message {
      text-align: center;
      padding: 3rem 2rem;
      color: #8E8E93;
    }

    .welcome-message h3 {
      color: #1C1C1E;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    /* Typing indicator */
    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      color: #8E8E93;
      font-style: italic;
      font-size: 0.9rem;
    }

    .typing-dots {
      display: flex;
      gap: 0.25rem;
    }

    .typing-dots span {
      width: 6px;
      height: 6px;
      background: #8E8E93;
      border-radius: 50%;
      animation: typingDot 1.4s infinite ease-in-out;
    }

    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

    @keyframes typingDot {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .chat-container {
        min-width: 300px;
        max-width: 95vw;
        height: 450px;
        margin: 0 0.5rem;
      }
      
      .welcome-message {
        padding: 2rem 1rem;
      }
      
      .input-container {
        padding: 0.75rem;
      }
    }
  `]
})
export class ChatComponent {
  messages = signal<ChatMessage[]>([]);
  currentMessage = '';
  isTyping = signal(false);

  constructor(private resumeAgentService: ResumeAgentService) {}

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
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I'm having trouble responding right now. Please try again.",
        type: 'system',
        timestamp: new Date()
      };
      
      this.messages.update(currentMessages => [...currentMessages, errorMessage]);
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
