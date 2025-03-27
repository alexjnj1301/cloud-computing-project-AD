import { Component } from '@angular/core';
import { ChatBotComponent } from './component/chat-bot/chat-bot.component'

@Component({
  selector: 'app-root',
  imports: [ChatBotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
