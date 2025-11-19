import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CardVuelosComponent } from '../card-vuelos/card-vuelos.component';
import { Toolbar } from 'primeng/toolbar';
import { CardPublicitarioComponent } from '../card-publicitario/card-publicitario.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet, HeaderComponent, CardVuelosComponent, Toolbar, CardPublicitarioComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
