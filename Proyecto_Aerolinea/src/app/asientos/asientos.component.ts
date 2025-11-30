import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass} from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AsientosService, Asiento } from '../services/AsientosService';
import { HeaderComponent } from "../header/header.component";
import {TooltipModule} from 'primeng/tooltip';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-asientos',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, ButtonModule, HeaderComponent, TooltipModule, CurrencyPipe],
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent implements OnInit {

  asientos: Asiento[] = [];
  asientosMap: Record<string, Asiento> = {};  
  busqueda: any = null;

  loading: boolean = true;     // 🔥 evitar que Angular pinte NADA mientras carga
  selectedSeat: number | null = null;

  filas: string[] = [];
  columnasIzquierda: number[] = [];
  columnasDerecha: number[] = [];

  constructor(private asientosService: AsientosService,  private router: Router, private authService: AuthService ) {}

  ngOnInit(): void {

    // Recuperar info de búsqueda desde localStorage
    const busquedaGuardada = localStorage.getItem('busqueda');
    if (busquedaGuardada) {
      this.busqueda = JSON.parse(busquedaGuardada);
    }

    const vueloSeleccionado = JSON.parse(localStorage.getItem("vueloSeleccionado") || "null");
    console.log("Busqueda recibida en asientos:", this.busqueda);


    if (!vueloSeleccionado?.horarioId) {
      alert("No se encontró el horario seleccionado.");
      return;
    }

    const idHorario = vueloSeleccionado.horarioId;

    this.asientosService.getAsientosPorHorario(idHorario)
      .subscribe(apiAsientos => {

        if (!apiAsientos || apiAsientos.length === 0) {
          console.error("⚠ No llegaron asientos de la API");
          this.loading = false;
          return;
        }

        this.asientos = apiAsientos;

        // 🔥 MAPA ultra rápido
        this.asientosMap = {};
        for (const a of apiAsientos) {
          this.asientosMap[`${a.fila}${a.columna}`] = a;
        }

        // 🔥 FILAS dinámicas y ordenadas
        this.filas = [...new Set(apiAsientos.map(a => a.fila))].sort();

        // 🔥 COLUMNAS dinámicas
        const columnas = [...new Set(apiAsientos.map(a => a.columna))]
          .sort((a, b) => a - b);

        // Cambiamos a 3 - PASILLO - 3
        this.columnasIzquierda = columnas.slice(0, 3);
        this.columnasDerecha = columnas.slice(3, 6);

        console.log("Filas:", this.filas);
        console.log("Columnas:", columnas);

        this.loading = false; // 🔥 ahora sí: mostrar vista
      });
  }


  // Devuelve los tipos de asiento distintos en esa fila, en orden
  tiposDeAsientoPorFila(fila: string): string[] {
    const asientosFila = this.asientos.filter(a => a.fila === fila);
    const tipos: string[] = [];
    for (const a of asientosFila) {
      if (!tipos.includes(a.tipoAsiento)) {
        tipos.push(a.tipoAsiento);
      }
    }
    return tipos;
  }

  getAsientoSeleccionado() {
  return this.asientos.find(a => a.idAsiento === this.selectedSeat);
  } 
  getAsiento(fila: string, columna: number) {
    return this.asientosMap[`${fila}${columna}`];
  }

  seleccionar(asiento: Asiento) {
    if (asiento.estado === true) return;

    this.selectedSeat = asiento.idAsiento;
    localStorage.setItem("asientoSeleccionado", JSON.stringify(asiento));
    console.log("Asiento seleccionado", asiento);
  }


  calcularTotal(): number {
  const vueloSeleccionado = JSON.parse(localStorage.getItem('vueloSeleccionado') || 'null');
  const asientoSeleccionado = this.getAsientoSeleccionado();

  const precioVuelo = vueloSeleccionado?.precio || 0;
  const precioAsiento = asientoSeleccionado?.precioAdicional || 0;

  return precioVuelo + precioAsiento;
  }

  volver() {
  // Limpiar datos de asientos seleccionados
  localStorage.removeItem('asientoSeleccionado');


  // Volver a la página anterior (por ejemplo, selección de vuelo)
  this.router.navigate(['/horas']);
  }

  irAPago() {
  if (!this.selectedSeat) return;

  const asientoSeleccionado = this.getAsientoSeleccionado();
  localStorage.setItem('asientoSeleccionado', JSON.stringify(asientoSeleccionado));
  localStorage.setItem('busqueda', JSON.stringify(this.busqueda));

  // Verificar si el usuario está logeado
  if (this.authService.isLoggedIn()) {
    // Caso: ya está logeado → ir directo a pagos
    this.router.navigate(['/pagos']);
  } else {
    // Caso: NO está logeado → guardar redirección y enviar a login
    localStorage.setItem('redirectAfterLogin', '/pagos');
    this.router.navigate(['/login']);
  }
}
}
