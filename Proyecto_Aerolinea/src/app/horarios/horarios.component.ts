import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [AccordionModule, CardModule, ButtonModule, TooltipModule, CommonModule, HeaderComponent],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  horarios: any[] = []; // Datos temporales

  constructor() {}

  ngOnInit(): void {
    this.horarios = [
      {
        horaSalida: '08:00',
        horaLlegada: '10:30',
        vuelos: [
          { 
            tipo: 'Económico', 
            descripcion: 'Vuelo básico: sin comida incluida, equipaje de mano 1, asientos estándar. Ideal para viajes cortos y presupuesto limitado.', 
            precio: 150, 
            asientos: 120, 
            equipaje: 1 
          },
          { 
            tipo: 'Moderado', 
            descripcion: 'Vuelo estándar: incluye comida ligera, selección de asiento, equipaje 2 piezas. Perfecto para quienes buscan comodidad media.', 
            precio: 200, 
            asientos: 100, 
            equipaje: 2 
          },
          { 
            tipo: 'Costoso', 
            descripcion: 'Vuelo premium: acceso a lounge, prioridad de embarque, comida completa, equipaje 3 piezas. Mayor comodidad y servicios adicionales.', 
            precio: 300, 
            asientos: 50, 
            equipaje: 3 
          }
        ]
      },
      {
        horaSalida: '12:30',
        horaLlegada: '15:00',
        vuelos: [
          { 
            tipo: 'Económico', 
            descripcion: 'Vuelo básico: sin comida incluida, equipaje de mano 1, asientos estándar. Ideal para viajes cortos y presupuesto limitado.', 
            precio: 180, 
            asientos: 120, 
            equipaje: 1 
          },
          { 
            tipo: 'Moderado', 
            descripcion: 'Vuelo estándar: incluye comida ligera, selección de asiento, equipaje 2 piezas. Perfecto para quienes buscan comodidad media.', 
            precio: 230, 
            asientos: 100, 
            equipaje: 2 
          },
          { 
            tipo: 'Costoso', 
            descripcion: 'Vuelo premium: acceso a lounge, prioridad de embarque, comida completa, equipaje 3 piezas. Mayor comodidad y servicios adicionales.', 
            precio: 350, 
            asientos: 50, 
            equipaje: 3 
          }
        ]
      },
      {
        horaSalida: '17:45',
        horaLlegada: '20:15',
        vuelos: [
          { 
            tipo: 'Económico', 
            descripcion: 'Vuelo básico: sin comida incluida, equipaje de mano 1, asientos estándar. Ideal para viajes cortos y presupuesto limitado.', 
            precio: 200, 
            asientos: 120, 
            equipaje: 1 
          },
          { 
            tipo: 'Moderado', 
            descripcion: 'Vuelo estándar: incluye comida ligera, selección de asiento, equipaje 2 piezas. Perfecto para quienes buscan comodidad media.', 
            precio: 250, 
            asientos: 100, 
            equipaje: 2 
          },
          { 
            tipo: 'Costoso', 
            descripcion: 'Vuelo premium: acceso a lounge, prioridad de embarque, comida completa, equipaje 3 piezas. Mayor comodidad y servicios adicionales.', 
            precio: 400, 
            asientos: 50, 
            equipaje: 3 
          }
        ]
      }
    ];
  }

  seleccionarVuelo(vuelo: any) {
    console.log('Vuelo seleccionado:', vuelo);
    // Guardar en servicio temporal o redirigir
  }

}
