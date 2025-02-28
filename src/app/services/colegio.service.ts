import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { colegio } from '../interfaces/colegio';

@Injectable({
  providedIn: 'root'
})
export class ColegioService {

  private myAppUrl = 'https://localhost:44372/';
  private myApiUrl = 'api/Colegio/';

  constructor(private http: HttpClient) { }

  getListColegios(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteColegio(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveColegio(colegio: colegio): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, colegio);
  }

  getColegio(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + id);
  }

  updateColegio(id: number, colegio: colegio): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, colegio);
  }
}
