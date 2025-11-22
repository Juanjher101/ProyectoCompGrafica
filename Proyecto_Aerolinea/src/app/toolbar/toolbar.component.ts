import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


// PrimeNG
import { Toolbar } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

// Servicios
import { VuelosService } from '../services/vuelos.service';
import { DestinoService } from '../services/DestinoService';// 👈 importamos el servicio

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    standalone: true,
    imports: [
        Toolbar,
        CalendarModule,
        ButtonModule,
        DropdownModule,
        AutoCompleteModule,
        FormsModule,
        CommonModule
    ]
})
export class ToolbarBasicDemo implements OnInit {

    constructor(
        private vuelosService: VuelosService,
        private destinoService: DestinoService, // 👈 inyectamos el servicio
        private router: Router
    ) {}

    // Datos principales
    origen: any = null;
    destino: any = null;

    fechaIda: Date | null = null;
    fechaVuelta: Date | null = null;

    pasajeros: number | undefined;

    @Input() flightType: string = 'doble';

    //Validar:
    minDate: Date = new Date();

    // Listas
    ciudades: any[] = [];
    filteredOrigenes: any[] = [];
    filteredDestinos: any[] = [];

    numeros: any[] = [];

    ngOnInit() {
        this.vuelosService.getVuelos().subscribe({
            next: (data) => {
                console.log("Vuelos recibidos:", data);

                // Transformar a formato que p-autoComplete entiende
                this.ciudades = data.map(v => ({
                    name: v.nombreDestino,
                    id: v.id
                }));

                // Inicializar listas independientes
                this.filteredOrigenes = [...this.ciudades];
                this.filteredDestinos = [...this.ciudades];

                console.log("Ciudades cargadas:", this.ciudades);
            },
            error: (err) => {
                console.error('Error cargando ciudades desde la API:', err);
            }
        });

        // Suscribirse al destino seleccionado desde Marketplace
        this.destinoService.destino$.subscribe(destino => {
            if (destino) {
                this.destino = destino; // 👈 actualizamos el autocomplete de destino
            }
        });

        // Pasajeros
        this.numeros = Array.from({ length: 8 }, (_, i) => ({
            label: (i + 1).toString(),
            value: i + 1
        }));
    }

    // ------- FILTROS AUTOCOMPLETE -------
    filtrarOrigen(event: any) {
        const query = event.query || '';
        this.filteredOrigenes = this.ciudades
            .filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    }

    filtrarDestino(event: any) {
        const query = event.query || '';
        this.filteredDestinos = this.ciudades
            .filter(c => 
                c.name.toLowerCase().includes(query.toLowerCase()) &&
                c !== this.origen
            );
    }

    // Reiniciar lista al enfocar input
    onFocusOrigen() {
        this.filteredOrigenes = [...this.ciudades];
    }

    onFocusDestino() {
        this.filteredDestinos = [...this.ciudades].filter(c => c !== this.origen);
    }

    buscar() {
    if (this.origen && this.destino && this.fechaIda) {
        
        const datos = {
            origen: this.origen,
            destino: this.destino,
            fechaIda: this.fechaIda,
            fechaVuelta: this.fechaVuelta,
            pasajeros: this.pasajeros
        };

        localStorage.setItem('busqueda', JSON.stringify(datos));
        this.destinoService.guardarBusqueda(datos);

        this.router.navigate(['/horas']);
    } else {
        alert('Por favor, completa origen, destino y fecha de ida.');
    }
}
}

