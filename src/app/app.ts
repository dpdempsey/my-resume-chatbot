import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  protected readonly apiMessage = signal('');

  constructor(private http: HttpClient) {
    // Test API call like in the tutorial
    this.http.get('/api/AgentService')
      .subscribe((resp: any) => this.apiMessage.set(resp.text));
  }
}
