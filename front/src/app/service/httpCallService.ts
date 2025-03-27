import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ChatResponse, MessageToSend } from '../models/Chat'

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {
  constructor(public http: HttpClient) { }

  public generateChatId(): Observable<string> {
    return this.http.get<string>('http://localhost:8000/chat/generate')
  }

  public sendMessage(messageToSend: MessageToSend): Observable<ChatResponse> {
    return this.http.post<ChatResponse>('http://localhost:8000/bot/chat', messageToSend)
  }
}
