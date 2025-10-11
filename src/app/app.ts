import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MessageComponent, ChatMessage } from './components/message/message.component';
import { ChatComponent } from './components/chat/chat.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MessageComponent, ChatComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-resume-chatbot');

  // Sample messages to test your MessageComponent
  sampleMessages: ChatMessage[] = [
    {
      id: '1',
      content: 'Hi! Tell me about your experience with Python.',
      type: 'user',
      timestamp: new Date(Date.now() - 5 * 60000) // 5 minutes ago
    },
    {
      id: '2', 
      content: 'I have extensive experience with Python! I\'ve built e-commerce APIs, worked with Django, and use it for data processing.',
      type: 'bot',
      timestamp: new Date(Date.now() - 4 * 60000) // 4 minutes ago
    },
    {
      id: '3',
      content: 'What about your current projects?',
      type: 'user', 
      timestamp: new Date(Date.now() - 2 * 60000) // 2 minutes ago
    }
  ];

  // Method to demonstrate signal updates
  updateTitle() {
    const newTitles = [
      'Angular Architecture Demo',
      'Learning TypeScript + Angular',
      'Resume Chatbot Project',
      'my-resume-chatbot'
    ];
    
    const currentTitle = this.title();
    const currentIndex = newTitles.indexOf(currentTitle);
    const nextIndex = (currentIndex + 1) % newTitles.length;
    
    this.title.set(newTitles[nextIndex]);
  }
}
