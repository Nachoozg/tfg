import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jugador } from '../interfaces/jugador';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  private myAppUrl = 'https://localhost:44314/';
  private myApiUrl = 'api/jugador/';

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
}
