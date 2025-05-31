import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { clasificacion } from '../interfaces/clasificacion';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
  // private baseUrl = 'https://localhost:44372/api/Clasificacion';
  private baseUrl = '/api/Clasificacion';


  constructor(private http: HttpClient) { }

  getClasificacion(): Observable<clasificacion[]> {
    return this.http.get<clasificacion[]>(this.baseUrl);
  }
}