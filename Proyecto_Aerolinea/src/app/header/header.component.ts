import { Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Image } from 'primeng/image';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [Toolbar, AvatarModule, ButtonModule, Image, MenuModule],
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  // Opciones del menú de usuario
  userMenuOptions = [
    {
      label: 'Iniciar sesión',
      icon: 'pi pi-sign-in',
      command: () => this.gotoLoginPage()
    },
    {
      label: 'Registrarse',
      icon: 'pi pi-user-plus',
      command: () => this.gotoRegisterPage()
    }
  ];

    gotoLoginPage() {
    this.router.navigate(['/login'], { queryParams: { action: 'login' } });
  }

  gotoRegisterPage() {
    this.router.navigate(['/login'], { queryParams: { action: 'register' } });
  }
  gotoHomePage() {
    this.router.navigate(['/home']);
  }
}
