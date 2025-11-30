import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Asiento {
  idAsiento: number;
  idHorario: string;
  fila: string;
  columna: number;
  tipoAsiento: string;
  precioAdicional: number;
  estado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AsientosService {

  private apiUrl = 'https://localhost:7202/api/Asientos';

  constructor(private http: HttpClient) {}

  getAsientos(): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(this.apiUrl);
  }

  getAsientosPorHorario(idHorario: string): Observable<Asiento[]> {
    return this.http.get<Asiento[]>(`${this.apiUrl}/horario/${idHorario}`);
  }

  getAsiento(id: number): Observable<Asiento> {
    return this.http.get<Asiento>(`${this.apiUrl}/${id}`);
  }

  createAsiento(a: Asiento): Observable<Asiento> {
    return this.http.post<Asiento>(this.apiUrl, a);
  }

  updateAsiento(a: Asiento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${a.idAsiento}`, a);
  }

  deleteAsiento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
