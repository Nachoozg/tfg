import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jugador } from '../interfaces/jugador';
import { JugadorEstadisticas } from '../interfaces/jugador-estadisticas';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private myApiUrl = '/api/Jugador/';

  constructor(private http: HttpClient) { }

  getListJugadores(): Observable<jugador[]> {
    return this.http.get<jugador[]>(this.myApiUrl);
  }

  getJugador(id: number): Observable<jugador> {
    return this.http.get<jugador>(`${this.myApiUrl}${id}`);
  }

  saveJugador(data: jugador): Observable<jugador> {
    return this.http.post<jugador>(this.myApiUrl, data);
  }

  updateJugador(id: number, data: jugador): Observable<jugador> {
    return this.http.put<jugador>(`${this.myApiUrl}${id}`, data);
  }

  deleteJugador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myApiUrl}${id}`);
  }

  getJugadoresPorColegio(colegioId: number): Observable<jugador[]> {
    return this.http.get<jugador[]>(`/api/Jugador/colegio/${colegioId}`);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.myApiUrl}upload`, formData);
  }

  getStatsJugador(id: number): Observable<JugadorEstadisticas> {
    return this.http.get<JugadorEstadisticas>(`/api/EstadisticasJugador/jugador/${id}`);
  }
}
