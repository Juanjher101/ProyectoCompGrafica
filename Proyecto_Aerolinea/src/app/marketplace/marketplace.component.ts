import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';

// Servicios
import { VuelosService, Vuelo } from '../services/vuelos.service';
import { DestinoService } from '../services/DestinoService';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor],
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  destinosDestacados: any[] = [];

  constructor(
    private vuelosService: VuelosService,
    private destinoService: DestinoService  // 👈 inyectamos el servicio
  ) {}

  ngOnInit() {
    this.vuelosService.getVuelos().subscribe({
      next: (vuelos: Vuelo[]) => {
        this.destinosDestacados = vuelos
          .filter(v => v.destacado)
          .slice(0,6)
          .map(v => ({
            id_destino: v.id,
            nombre: v.nombreDestino,
            descripcion: v.descripcion,
            imagen_url: v.imagenUrl
          }));
      },
      error: (err) => console.error('Error cargando destinos destacados:', err)
    });
  }

  verDestino(destino: any) {
    // Enviar destino al toolbar
    const seleccionado = { name: destino.nombre, id: destino.id_destino };
    this.destinoService.seleccionarDestino(seleccionado);
    const toolbar = document.getElementById('toolbar');
    if (toolbar) {
      toolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
