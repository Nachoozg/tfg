import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { partido } from '../interfaces/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  private myApiUrl = '/api/Partido/';

  constructor(private http: HttpClient) { }

  getListPartidos(): Observable<partido[]> {
    return this.http.get<partido[]>(this.myApiUrl);
  }

  getPartido(id: number): Observable<partido> {
    return this.http.get<partido>(`${this.myApiUrl}${id}`);
  }

  savePartido(data: partido): Observable<partido> {
    return this.http.post<partido>(this.myApiUrl, data);
  }

  updatePartido(id: number, data: partido): Observable<partido> {
    return this.http.put<partido>(`${this.myApiUrl}${id}`, data);
  }

  deletePartido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myApiUrl}${id}`);
  }
}
