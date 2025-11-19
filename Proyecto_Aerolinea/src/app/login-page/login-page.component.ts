import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CardLoginComponent } from '../card-login/card-login.component';

@Component({
  selector: 'app-login-page',
  imports: [RouterOutlet, HeaderComponent, CardLoginComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

}
