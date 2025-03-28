import { Component } from '@angular/core'
import { MatFormField, MatInput, MatSuffix } from '@angular/material/input'
import { MatIconButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { FormsModule } from '@angular/forms'
import { HttpCallService } from '../../service/httpCallService'
import { ChatResponse, Message, MessageToSend } from '../../models/Chat'
import { DatePipe, NgClass } from '@angular/common'
import { Constants } from '../../constants'


@Component({
  selector: 'app-chat-bot',
  imports: [
    MatInput,
    MatFormField,
    MatSuffix,
    MatIconButton,
    MatIcon,
    FormsModule,
    NgClass,
    DatePipe,
  ],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent {
  chatId: string = ''
  message: string = ''
  messages: Message[] = []
  messageToSend: MessageToSend | undefined
  isBotTyping: boolean = false

  public constructor(private httpCallService: HttpCallService,
                     public constants: Constants) {
    this.generateChatId()
  }

  public getDate(): string {
    return new Date().getTime().toString()
  }

  public send(): void {
    this.isBotTyping = true
    const date = this.getDate()

    this.messageToSend = {
      input_text: this.message,
      chat_id: this.chatId,
      conversation_history: this.messages,
      time: date
    }

    this.httpCallService.sendMessage(this.messageToSend).subscribe({
      next: (value: ChatResponse) => {
        this.messages = value.conversation_history
        this.isBotTyping = false
      },
      error: err => {
        console.log(err)
        this.isBotTyping = false
      }
    })

    this.message = ''
  }

  public generateChatId(): void {
    this.httpCallService.generateChatId().subscribe({
      next: value => {
        this.chatId = value
      },
      error: err => {
        console.log(err)
      }
    })
  }
}
