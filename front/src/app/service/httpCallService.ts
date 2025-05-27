import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Chat, ChatResponse, Message, MessageToSend } from '../models/Chat'
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../models/Authent'
import { Constants } from '../constants'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {
  public laravelApiUrl: string = environment.apiUrl

  constructor(public http: HttpClient,
              private constants: Constants) { }

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.laravelApiUrl}/api/login`, request)
  }

  public register(request: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.laravelApiUrl}/api/register`, request)
  }

  public setCurrentUser(currentUser: LoginResponse): void {
    sessionStorage.setItem(this.constants.TOKEN_KEY, currentUser.access_token)
    sessionStorage.setItem(this.constants.CURRENT_USER_KEY, JSON.stringify(currentUser.user))
  }

  public getCurrentUser(): User {
    return JSON.parse(sessionStorage.getItem(this.constants.CURRENT_USER_KEY)!)
  }

  public isAuthenticated(): boolean {
    return sessionStorage.getItem(this.constants.TOKEN_KEY) !== null
  }

  public generateChatId(): Observable<string> {
    return this.http.get<string>('http://localhost:8000/chat/generate')
  }

  public saveChat(chatId: string): Observable<any> {
    return this.http.post(`${this.laravelApiUrl}/api/chat/store`, {chat_ref: chatId, user_id: this.getCurrentUser().id})
  }

  public sendMessage(messageToSend: MessageToSend): Observable<ChatResponse> {
    return this.http.post<ChatResponse>('http://localhost:8000/bot/chat', messageToSend)
  }

  public getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.laravelApiUrl}/api/chat/show/${this.getCurrentUser().id}`)
  }

  public getMessagesByChatRef(chat_ref: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.laravelApiUrl}/api/message/${chat_ref}`)
  }

  public sendFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.laravelApiUrl}/api/upload`, formData);
  }
}
