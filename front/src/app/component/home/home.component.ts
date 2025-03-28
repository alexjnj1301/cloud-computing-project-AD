import { Component } from '@angular/core';
import { ChatBotComponent } from '../chat-bot/chat-bot.component'
import { FileUploaderComponent } from '../file-uploader/file-uploader.component'

@Component({
  selector: 'app-home',
  imports: [
    ChatBotComponent,
    FileUploaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
