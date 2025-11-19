import { Component, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    standalone: true,
    imports: [
        Toolbar,
        DropdownModule,
        CalendarModule,
        ButtonModule,
        FormsModule
    ]
})
export class ToolbarBasicDemo implements OnInit {

    ciudades: any[] = [];
    numeros: any[] = [];

    origen: any;
    destino: any;
    fecha: Date | undefined;
    pasajeros: number | undefined;

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

        this.numeros = Array.from({ length: 10 }, (_, i) => i + 1);
    }

    buscar() {
        console.log("Origen:", this.origen);
        console.log("Destino:", this.destino);
        console.log("Fecha:", this.fecha);
        console.log("Pasajeros:", this.pasajeros);
    }
}
