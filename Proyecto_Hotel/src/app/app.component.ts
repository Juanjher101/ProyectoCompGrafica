import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BotonPruebaComponent } from './boton-prueba/boton-prueba.component';
import { ToolbarBasicDemo } from "./toolbar/toolbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarBasicDemo],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Proyecto_Hotel';
}
