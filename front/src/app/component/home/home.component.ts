import { Component } from '@angular/core';
import { ChatBotComponent } from '../chat-bot/chat-bot.component'

@Component({
  selector: 'app-home',
  imports: [
    ChatBotComponent,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
