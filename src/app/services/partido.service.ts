import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { partido } from '../interfaces/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
    private myAppUrl = 'https://localhost:44372/';
    private myApiUrl = 'api/Partido/';

    constructor(private http: HttpClient) { }

    getListPartidos(): Observable<any> {
      return this.http.get(this.myAppUrl + this.myApiUrl);
    }

    getPartidosPorEquipo(equipoId: number): Observable<any> {
      return this.http.get(`${this.myAppUrl}${this.myApiUrl}equipo/${equipoId}`);
    }

    deletePartido(id: number): Observable<any> {
      return this.http.delete(this.myAppUrl + this.myApiUrl + id);
    }

    savePartido(partido: partido): Observable<any> {
      return this.http.post(this.myAppUrl + this.myApiUrl, partido);
    }

    getPartido(id: number): Observable<any> {
      return this.http.get(this.myAppUrl + this.myApiUrl + id);
    }

    updatePartido(id: number, partido: partido): Observable<any> {
      return this.http.put(this.myAppUrl + this.myApiUrl + id, partido);
    }
}