import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface Vuelo {
  id?: number;
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

  // ============================================================
  // GET: Obtener todos los vuelos
  // ============================================================
  getVuelos(): Observable<Vuelo[]> {
    return this.http.get<Vuelo[]>(this.apiUrl).pipe(
      tap(res => console.log('[GET] Vuelos:', res)),
      catchError(err => {
        console.error('[GET] ERROR:', err);
        return of([]); // evitar ruptura del front
      })
    );
  }

  // ============================================================
  // GET: Obtener un vuelo por ID
  // ============================================================
  getVueloPorId(id: number): Observable<Vuelo> {
    return this.http.get<Vuelo>(`${this.apiUrl}/${id}`).pipe(
      tap(res => console.log('[GET] Vuelo por ID:', res)),
      catchError(err => {
        console.error('[GET BY ID] ERROR:', err);
        return throwError(() => err);
      })
    );
  }

  // ============================================================
  // POST: Crear un nuevo vuelo
  // ============================================================
  crearVuelo(vuelo: Vuelo): Observable<Vuelo> {
    return this.http.post<Vuelo>(this.apiUrl, vuelo).pipe(
      tap(res => console.log('[POST] Vuelo creado:', res)),
      catchError(err => {
        console.error('[POST] ERROR:', err);
        return throwError(() => err);
      })
    );
  }

  // ============================================================
  // PUT: Actualizar vuelo
  // ============================================================
  actualizarVuelo(id: number, vuelo: Vuelo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, vuelo).pipe(
      tap(() => console.log('[PUT] Vuelo actualizado:', vuelo)),
      catchError(err => {
        console.error('[PUT] ERROR:', err);
        return throwError(() => err);
      })
    );
  }

  // ============================================================
  // DELETE: Eliminar vuelo
  // ============================================================
  eliminarVuelo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('[DELETE] Vuelo eliminado con ID:', id)),
      catchError(err => {
        console.error('[DELETE] ERROR:', err);
        return throwError(() => err);
      })
    );
  }

}
