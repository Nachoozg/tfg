import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  nombre: string;
  mail: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    const raw = localStorage.getItem('currentUser');
    if (raw) {
      this.userSubject.next(JSON.parse(raw));
    }
  }

  login(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUser?.rol.toLowerCase() === 'administrador';
  }

  isArbitro(): boolean {
    return this.currentUser?.rol.toLowerCase() === 'arbitro';
  }

  isColegio(): boolean {
    return this.currentUser?.rol.toLowerCase() === 'colegio';
  }

  isLogged(): boolean {
    return !!this.currentUser;
  }
}
