import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jugador } from '../interfaces/jugador';
import { JugadorEstadisticas } from '../interfaces/jugador-estadisticas';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private myAppUrl = 'https://localhost:44372/';
  private myApiUrl = 'api/Jugador/';

  constructor(private http: HttpClient) { }

  getListJugadores(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteJugador(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveJugador(jugador: jugador): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, jugador);
  }

  getJugador(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  updateJugador(id: number, jugador: jugador): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, jugador);
  }

  getJugadoresPorColegio(colegioId: number): Observable<jugador[]> {
    return this.http.get<jugador[]>(`${this.myAppUrl}api/Jugador/colegio/${colegioId}`);
  }
  
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl + 'upload', formData);
  }

  getStatsJugador(id: number) {
  return this.http.get<JugadorEstadisticas>(`${this.myAppUrl}api/EstadisticasJugador/jugador/${id}`);
  }
}