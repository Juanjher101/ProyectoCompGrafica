import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CardModule, ButtonModule, NgFor],
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent {

  destinosDestacados = [
    { id_destino: 1, nombre: 'Cartagena', descripcion: 'Playas hermosas y murallas.', imagen_url: 'https://i.imgur.com/mf3R1u8.jpeg' },
    { id_destino: 2, nombre: 'San Andrés', descripcion: 'Mar de los siete colores.', imagen_url: 'https://i.imgur.com/vQZkHtQ.jpeg' },
    { id_destino: 3, nombre: 'Medellín', descripcion: 'La ciudad de la eterna primavera.', imagen_url: 'https://i.imgur.com/VXf6k7J.jpeg' },
    { id_destino: 4, nombre: 'Bogotá', descripcion: 'Cultura, museos y vida nocturna.', imagen_url: 'https://i.imgur.com/cg4b3th.jpeg' },
    { id_destino: 5, nombre: 'Santa Marta', descripcion: 'Historia, mar y Sierra Nevada.', imagen_url: 'https://i.imgur.com/oFNLdqL.jpeg' },
    { id_destino: 6, nombre: 'Cali', descripcion: 'La capital de la salsa, alegría y calorcito.', imagen_url: 'https://i.imgur.com/omQZ8Gd.jpeg' }
  ];

  constructor() {}

  verDestino(id: number) {
    console.log('Ver destino', id);
    // Aquí luego irá navegación a la página del destino
    // this.router.navigate(['/destino', id]);
  }

}
