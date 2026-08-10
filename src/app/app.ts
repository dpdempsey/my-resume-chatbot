import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MessageComponent, ChatMessage } from './components/message/message.component';
import { ChatComponent } from './components/chat/chat.component';
import { MarqueeComponent } from './components/marquee/marquee.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ChatComponent, MarqueeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-resume-chatbot');
}
