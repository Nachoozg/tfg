import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { clasificacion } from '../interfaces/clasificacion';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
  private myAppUrl = 'https://localhost:44372/';
  private myApiUrl = 'api/Clasificacion/';
  
  constructor(private http: HttpClient) { }

  updateClasificacion(): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl + 'Actualizar', {});
  }

  getClasificacion(): Observable<clasificacion[]> {
    return this.http.get<clasificacion[]>(this.myAppUrl + this.myApiUrl);
  }
}
