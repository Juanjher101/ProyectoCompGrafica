import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG
import { Toolbar } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

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

        // ------- DATOS DUMMY (cámbialos cuando uses SQL) -------
        this.ciudades = [
            { name: 'Bogotá' },
            { name: 'Medellín' },
            { name: 'Cali' },
            { name: 'Barranquilla' },
            { name: 'Cartagena' },
            { name: 'Santa Marta' },
            { name: 'Pereira' },
            { name: 'Bucaramanga' },
            { name: 'Cúcuta' },
            { name: 'Manizales' }
        ];

        // // Fechas por defecto
        // this.fechaIda = new Date();
        // this.fechaVuelta = new Date(this.fechaIda);
        // this.fechaVuelta.setDate(this.fechaVuelta.getDate() + 3);

        // Pasajeros
        this.numeros = Array.from({ length: 8 }, (_, i) => i + 1);
    }

    // ------- FILTROS AUTOCOMPLETE -------
    filtrarOrigen(event: any) {
        const query = event.query.toLowerCase();
        this.filteredOrigenes = this.ciudades.filter(c =>
            c.name.toLowerCase().includes(query)
        );
    }

    filtrarDestino(event: any) {
        const query = event.query.toLowerCase();
        this.filteredDestinos = this.ciudades.filter(c =>
            c.name.toLowerCase().includes(query)
        );
    }

    buscar() {
        console.log("Origen:", this.origen);
        console.log("Destino:", this.destino);
        console.log("Fecha Ida:", this.fechaIda);
        console.log("Fecha Vuelta:", this.fechaVuelta);
        console.log("Pasajeros:", this.pasajeros);
    }
}
