import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
        <h1 class="title">{{name()}}</h1>
        <p>{{title()}}</p>
        <p>{{tagline()}}</p>
    </header>
  `,
  styles: [`
    div {
      background: lightblue;
      padding: 1rem;
      text-align: center;
    }
    header {
        text-align: center;
        margin-bottom: 2rem;
        padding: 1rem;
        background: linear-gradient(135deg, #a42159ff 0%, #4cd6e0ff 100%);
        color: white;
        border-radius: 8px;
    }
    
  `]
})
export class HeaderComponent {
  name = input<string>('Declan Dempsey');
  title = input<string>('Software Engineer');
  tagline = input<string>('The best software engineer you\'ve ever seen!');
}
