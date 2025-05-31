import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // private baseUrl: string = 'https://localhost:44372/api/Usuario';
  private baseUrl: string = '/api/Usuario';


  constructor(private http: HttpClient) { }

  registroUsuario(user: usuario): Observable<any> {
    return this.http.post(`${this.baseUrl}/registro`, user);
  }
  
  login(request: { mail: string; password: string }) {
    return this.http.post<{ user: any }>(`${this.baseUrl}/login`, request);
  }
}
