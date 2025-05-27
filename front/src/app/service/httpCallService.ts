import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Chat, ChatResponse, Message, MessageToSend } from '../models/Chat'
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../models/Authent'
import { Constants } from '../constants'
import { environment } from '../environments/environment'
import { Teams } from '../models/Teams'
import { Projects } from '../models/Projects'

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

  public sendFile(file: File, projectId: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_id', projectId);
    formData.append('user_id', this.getCurrentUser().id.toString());
    return this.http.post(`${this.laravelApiUrl}/api/upload`, formData);
  }

  public getTeams(): Observable<Teams[]> {
    return this.http.get<Teams[]>(`${this.laravelApiUrl}/api/team/byUser/${this.getCurrentUser().id}`)
  }

  public getProjectsByTeam(teamId: number): Observable<Projects[]> {
    return this.http.get<Projects[]>(`${this.laravelApiUrl}/api/project/byTeam/${teamId}`)
  }

  public getProjectById(projectId: string): Observable<Projects> {
    return this.http.get<Projects>(`${this.laravelApiUrl}/api/project/show/${projectId}`)
  }

  public createTeam(teamName: string): Observable<string> {
    const request = {
      name: teamName
    }
    return this.http.post<string>(`${this.laravelApiUrl}/api/team/store`, request)
  }

  public createProject(projectName: string, teamId: number): Observable<string> {
    const request = {
      name: projectName,
      team_id: teamId,
      user_id: this.getCurrentUser().id
    }
    return this.http.post<string>(`${this.laravelApiUrl}/api/project/store`, request)
  }
}
