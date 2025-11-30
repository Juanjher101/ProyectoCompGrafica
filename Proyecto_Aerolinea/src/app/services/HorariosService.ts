import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TipoVuelo {
  id: number;
  nombre: string;
  descripcion: string;
  multiplicador: number;
}

export interface Horario {
  idHorario: string;
  idRuta: string;
  horaSalida: string;
  horaLlegada: string;
  asientosDisponibles: number;
}

export interface Ruta {
  idRuta: string;
  origen: number;
  destino: number;
  precioBase: number;
}

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private apiUrl = 'https://localhost:7202/api'; // Ajusta según tu API

  constructor(private http: HttpClient) { }

  // GET: Todos los horarios
  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}/Horarios`);
  }

  // GET: Horario por ID
  getHorario(id: string): Observable<Horario> {
    return this.http.get<Horario>(`${this.apiUrl}/Horarios/${id}`);
  }

  // GET: Todos los tipos de vuelo
  getTiposVuelo(): Observable<TipoVuelo[]> {
    return this.http.get<TipoVuelo[]>(`${this.apiUrl}/TipoVuelo`);
  }

  // GET: Tipo de vuelo por ID
  getTipoVuelo(id: number): Observable<TipoVuelo> {
    return this.http.get<TipoVuelo>(`${this.apiUrl}/TipoVuelo/${id}`);
  }

  // GET: Todas las rutas
  getRutas(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(`${this.apiUrl}/Rutas`);
  }

  // GET: Ruta por ID
  getRuta(id: string): Observable<Ruta> {
    return this.http.get<Ruta>(`${this.apiUrl}/Rutas/${id}`);
  }


  // GET: Buscar ruta por origen y destino
  getRutaPorOrigenDestino(idOrigen: number, idDestino: number): Observable<Ruta> {
    return this.http.get<Ruta>(`${this.apiUrl}/Rutas/BuscarRuta?idOrigen=${idOrigen}&idDestino=${idDestino}`);
  }

  // Calcular precio final multiplicando precioBase de la ruta por el multiplicador del tipo de vuelo
  calcularPrecio(precioBase: number, multiplicador: number): number {
    return precioBase * multiplicador;
  }
}
