import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { colegio } from '../interfaces/colegio';

@Injectable({
  providedIn: 'root'
})
export class ColegioService {

  private myApiUrl = '/api/Colegio/';

  constructor(private http: HttpClient) { }

  getListColegios(): Observable<colegio[]> {
    return this.http.get<colegio[]>(this.myApiUrl);
  }

  getColegio(id: number): Observable<colegio> {
    return this.http.get<colegio>(`${this.myApiUrl}${id}`);
  }

  saveColegio(data: colegio): Observable<colegio> {
    return this.http.post<colegio>(this.myApiUrl, data);
  }

  updateColegio(id: number, data: colegio): Observable<colegio> {
    return this.http.put<colegio>(`${this.myApiUrl}${id}`, data);
  }

  deleteColegio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myApiUrl}${id}`);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.myApiUrl}upload`, formData);
  }
}
