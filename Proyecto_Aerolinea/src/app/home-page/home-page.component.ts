import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CardVuelosComponent } from '../card-vuelos/card-vuelos.component';
import { CardPublicitarioComponent } from '../card-publicitario/card-publicitario.component';
import { MarketplaceComponent } from "../marketplace/marketplace.component";
import { FooterComponent } from "../footer-home/footer-home.component";

@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet, HeaderComponent, CardVuelosComponent, CardPublicitarioComponent, MarketplaceComponent, FooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
