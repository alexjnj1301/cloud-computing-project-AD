import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ChatResponse, MessageToSend } from '../models/Chat'
import { LoginRequest, LoginResponse, RegisterRequest } from '../models/Authent'
import { Constants } from '../constants'

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {
  constructor(public http: HttpClient,
              private constants: Constants) { }

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8001/api/login', request)
  }

  public register(request: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8001/api/register', request)
  }

  public setCurrentUser(currentUser: LoginResponse): void {
    sessionStorage.setItem(this.constants.TOKEN_KEY, currentUser.access_token)
    sessionStorage.setItem(this.constants.CURRENT_USER_KEY, JSON.stringify(currentUser.user))
  }

  public isAuthenticated(): boolean {
    return sessionStorage.getItem(this.constants.TOKEN_KEY) !== null
  }

  public generateChatId(): Observable<string> {
    return this.http.get<string>('http://localhost:8000/chat/generate')
  }

  public sendMessage(messageToSend: MessageToSend): Observable<ChatResponse> {
    return this.http.post<ChatResponse>('http://localhost:8000/bot/chat', messageToSend)
  }
}
