import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinoService {
  // Observable para el destino seleccionado
  private destinoSource = new BehaviorSubject<any>(null);
  destino$ = this.destinoSource.asObservable();

  seleccionarDestino(destino: any) {
    this.destinoSource.next(destino);
  }

  // 🔹 Nueva sección: guardar búsqueda temporal
  private busquedaTemporal: any = null;

  guardarBusqueda(data: any) {
    this.busquedaTemporal = data;
  }

  obtenerBusqueda() {
    return this.busquedaTemporal;
  }
}
