import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Rol {
  id: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class RolService {
  // private baseUrl = 'https://localhost:44372/api/Rol';
  private baseUrl = '/api/Rol';

  constructor(private http: HttpClient) {}
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.baseUrl);
  }
}
