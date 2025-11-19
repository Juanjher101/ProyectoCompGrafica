import { Component, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    standalone: true,
    imports: [
        Toolbar,
        DropdownModule,
        CalendarModule,
        ButtonModule,
        FormsModule,
        CommonModule
    ]
})


export class ToolbarBasicDemo implements OnInit {

    ciudades: any[] = [];
    numeros: any[] = [];

    origen: any;
    destino: any;
    fechaIda: Date = new Date();
    fechaVuelta: Date = new Date();
    pasajeros: number | undefined;;

    @Input() flightType: string = 'doble';

    ngOnInit() {
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

        this.fechaIda = new Date();

        this.fechaVuelta = new Date(this.fechaIda); // copiar fecha
        this.fechaVuelta.setDate(this.fechaVuelta.getDate() + 3);

        this.numeros = Array.from({ length: 10 }, (_, i) => i + 1);
    }

    buscar() {
        console.log("Origen:", this.origen);
        console.log("Destino:", this.destino);
        console.log("Fecha Ida:", this.fechaIda);
        console.log("Fecha Vuelta:", this.fechaVuelta)
        console.log("Pasajeros:", this.pasajeros);
    }
}
