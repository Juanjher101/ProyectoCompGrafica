import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HorariosService } from '../services/HorariosService';

// PrimeNG
import { Toolbar } from 'primeng/toolbar';
import { DatePickerModule } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

// Servicios
import { VuelosService } from '../services/vuelos.service';
import { DestinoService } from '../services/DestinoService';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  standalone: true,
  imports: [
    Toolbar,
    DatePickerModule,
    ButtonModule,
    DropdownModule,
    AutoCompleteModule,
    FormsModule,
    CommonModule
  ]
})
export class ToolbarBasicDemo implements OnInit {

  // Datos principales
  origen: any = null;
  destino: any = null;
  fechaIda: Date | null = null;
  fechaVuelta: Date | null = null;
  pasajeros: number | undefined;
  rutaSeleccionada: { idRuta: string } | null = null;

  @Input() flightType: string = 'doble';

  // Fecha mínima (hoy)
  minDate: Date = new Date();

  // Configuración regional
  locale = { firstDayOfWeek: 1 };

  // Listas
  ciudades: any[] = [];
  filteredOrigenes: any[] = [];
  filteredDestinos: any[] = [];
  numeros: any[] = [];

  constructor(
    private vuelosService: VuelosService,
    private destinoService: DestinoService,
    private router: Router,
    private horariosService: HorariosService 
    
  ) {}

  ngOnInit() {
    // Traer ciudades
    this.vuelosService.getVuelos().subscribe({
      next: (data) => {
        this.ciudades = data.map(v => ({ name: v.nombreDestino, id: v.id }));
        this.filteredOrigenes = [...this.ciudades];
        this.filteredDestinos = [...this.ciudades];
      },
      error: (err) => console.error('Error cargando ciudades:', err)
    });

    // Suscribirse al destino desde el servicio
    this.destinoService.destino$.subscribe(destino => {
      if (destino) this.destino = destino;
    });

    // Pasajeros
    this.numeros = Array.from({ length: 8 }, (_, i) => ({ label: (i + 1).toString(), value: i + 1 }));
  }

  // Filtros autocomplete
  filtrarOrigen(event: any) {
    const query = event.query || '';
    this.filteredOrigenes = this.ciudades.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  filtrarDestino(event: any) {
    const query = event.query || '';
    this.filteredDestinos = this.ciudades.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase()) &&
      c.id !== this.origen?.id // comparar por id
    );
  }
  onFocusOrigen() { this.filteredOrigenes = [...this.ciudades]; }
  onFocusDestino() {
  this.filteredDestinos = this.ciudades.filter(c => c.id !== this.origen?.id);
  }

  buscar() {
  if (this.origen && this.destino && this.fechaIda) {
    this.horariosService.getRutaPorOrigenDestino(this.origen.id, this.destino.id)
      .subscribe({
        next: (ruta) => {
          const datos = {
            origen: this.origen,
            destino: this.destino,
            fechaIda: this.fechaIda,
            fechaVuelta: this.fechaVuelta,
            pasajeros: this.pasajeros,
            rutaId: ruta.idRuta // seguro, porque el backend garantiza que existe
          };

          this.destinoService.guardarBusqueda(datos);
          localStorage.setItem('busqueda', JSON.stringify(datos));

          this.router.navigate(['/horas']);
        },
          
        
        error: () => {
          alert('No se encontró ruta para este origen y destino.');
        }
      });
  } else {
    alert('Por favor, completa origen, destino y fecha de ida.');
  }
}
}
