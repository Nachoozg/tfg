import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ChatResponse {
  reply: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'https://localhost:44372/api/Chat';

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.url, { message });
  }
}
