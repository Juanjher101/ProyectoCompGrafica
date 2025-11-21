import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface Vuelo {
  id: number;
  nombreDestino: string;
  descripcion: string;
  imagenUrl: string;
  destacado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VuelosService {

  private apiUrl = 'https://localhost:7202/api/Vuelos';

  constructor(private http: HttpClient) {}

  getVuelos(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(this.apiUrl).pipe(
      tap(res => console.log('[VuelosService] respuesta API:', res)),
      catchError(err => {
        console.error('[VuelosService] ERROR:', err);
        return of([]);
      })
    );
  }
}
