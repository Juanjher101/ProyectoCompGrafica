import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component"
import { CardVuelosComponent } from './card-vuelos/card-vuelos.component';
import { ToolbarBasicDemo } from './toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CardVuelosComponent, ToolbarBasicDemo],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Proyecto_Hotel';
}
