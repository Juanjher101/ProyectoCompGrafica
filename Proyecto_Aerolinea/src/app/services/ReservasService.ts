import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reserva {
  IdUsuario: number;
  IdRuta: string;
  IdHorario: string;
  IdAsiento: number;
  IdTipoVuelo: number
  EstadoPago: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private apiUrl = 'https://localhost:7202/api/Reservas';

  constructor(private http: HttpClient) {}

  // Obtener todas las reservas
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  // Obtener reserva por ID
  getReserva(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  // Crear reserva
  addReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  // Actualizar reserva
  updateReserva(id: number, reserva: Reserva): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, reserva);
  }

  // Eliminar reserva
  deleteReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Reservas por usuario
  getReservasPorUsuario(idUsuario: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/PorUsuario/${idUsuario}`);
  }
}
