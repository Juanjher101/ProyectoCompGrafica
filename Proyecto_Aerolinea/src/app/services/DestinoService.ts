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
}
