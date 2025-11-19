import { Component } from '@angular/core';
import { ToolbarBasicDemo } from '../toolbar/toolbar.component';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';

@Component({
  selector: 'app-card-vuelos',
  templateUrl: './card-vuelos.component.html',
  standalone: true,
  imports: [CardModule, ToolbarBasicDemo, FormsModule, SelectButton],
  styleUrl: './card-vuelos.component.css'
})
export class CardVuelosComponent {
  stateOptions: any[] = [{ label: 'Ida y vuelta', value: 'doble' },{ label: 'Solo Ida', value: 'simple' }];

    flightType: string = 'doble';
}