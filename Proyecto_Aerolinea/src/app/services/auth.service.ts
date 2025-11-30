import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('usuarioLogeado');
  }

  login(usuario: any) {
    localStorage.setItem('usuarioLogeado', JSON.stringify(usuario));
  }

  logout() {
    localStorage.removeItem('usuarioLogeado');
  }

  getUsuario() {
    const data = localStorage.getItem('usuarioLogeado');
    return data ? JSON.parse(data) : null;
  }
}
