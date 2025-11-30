import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { DestinoService } from '../services/DestinoService';
import { HorariosService, TipoVuelo, Horario } from '../services/HorariosService';

interface VueloCard {
  tipo: string;
  descripcion: string[];
  precio: number;
  asientos: number;
  equipaje: number;
}

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [AccordionModule, CardModule, ButtonModule, TooltipModule, CommonModule, HeaderComponent],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  horarios: Array<{
    idHorario: string;
    horaSalida: string;
    horaLlegada: string;
    vuelos: VueloCard[];
  }> = [];

  busqueda: any = null;
  vueloSeleccionado: any = null;



  constructor(
    private destinoService: DestinoService,
    private horariosService: HorariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener info de búsqueda (origen/destino/ruta)
    this.busqueda = this.destinoService.obtenerBusqueda() || JSON.parse(localStorage.getItem('busqueda') || 'null');
    console.log("Datos recibidos en horarios:", this.busqueda);

    if (!this.busqueda?.rutaId) return; // Si no hay ruta, no hacemos nada

    // Traer horarios, tipos de vuelo y rutas en paralelo
    this.horariosService.getHorarios().subscribe(horariosApi => {
      this.horariosService.getTiposVuelo().subscribe(tiposVuelo => {
        this.horariosService.getRutas().subscribe(rutas => {

          // Encontrar la ruta seleccionada para obtener precioBase
          const rutaSeleccionada = rutas.find(r => r.idRuta.toString() === this.busqueda.rutaId.toString());
          const precioBase = rutaSeleccionada?.precioBase || 0;

          // Filtrar solo los horarios de la ruta seleccionada
          const horariosFiltrados = horariosApi.filter(h => h.idRuta.trim() === (this.busqueda.rutaId || '').trim());


          this.horarios = horariosFiltrados.map(h => {
          return {
            idHorario: h.idHorario,
            horaSalida: h.horaSalida,
            horaLlegada: h.horaLlegada,
            vuelos: tiposVuelo.map(t => {
              // Parsear descripción de JSON a array de strings
              let descripcionArray: string[] = [];
              try {
                descripcionArray = JSON.parse(t.descripcion);
              } catch (e) {
                console.error('Error parseando descripcion:', t.descripcion, e);
                descripcionArray = [t.descripcion]; // fallback si no es JSON válido
              }

              return {
                tipo: t.nombre,
                descripcion: descripcionArray,
                precio: this.horariosService.calcularPrecio(precioBase, t.multiplicador),
                asientos: h.asientosDisponibles,
                equipaje: t.nombre === 'Económico' ? 1 : t.nombre === 'Clásico' ? 2 : 3
              };
            })
          };
        });

        console.log("Horarios procesados para mostrar:", this.horarios);
        });
      });
    });
  }

  seleccionarVuelo(vuelo: VueloCard, horarioId: string, horaSalida: string, horaLlegada: string) {
    console.log('Vuelo seleccionado:', vuelo);

    const seleccion = {
      vueloTipo: vuelo.tipo,
      descripcion: vuelo.descripcion,
      precio: vuelo.precio,
      horarioId,
      horaSalida,
      horaLlegada,
      asientos: vuelo.asientos,
      equipaje: vuelo.equipaje
    };

    localStorage.setItem('vueloSeleccionado', JSON.stringify(seleccion));
    this.destinoService.seleccionarDestino(seleccion);
    console.log("Vuelo guardado correctamente.");

    this.vueloSeleccionado = (seleccion.vueloTipo || '').toString().trim();
    console.log('vueloSeleccionado (string):', this.vueloSeleccionado);
  }

  irAHome() {
  // Limpiar datos de asientos seleccionados
  localStorage.removeItem('vueloSeleccionado');

  // Opcional: si quieres también borrar cualquier otro dato relacionado
  // localStorage.removeItem('busqueda');

  // Volver a la página anterior (por ejemplo, selección de vuelo)
  this.router.navigate(['/home']);
  }

  irAAsientos() {
    if (!this.vueloSeleccionado) {
    alert("Debes seleccionar un vuelo antes de continuar.");
    return;
    }


    if (this.busqueda) {
      localStorage.setItem('busqueda', JSON.stringify(this.busqueda));
      this.destinoService.guardarBusqueda(this.busqueda);
    }
    this.router.navigate(['/asientos']);
  }
}
