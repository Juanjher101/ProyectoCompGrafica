import { Component, OnInit } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Image } from 'primeng/image';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [Toolbar, AvatarModule, ButtonModule, Image, MenuModule],
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) {}

  userMenuOptions: any[] = [];

  notLoggedMenu = [
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

  loggedMenu = [
    {
      label: 'Editar perfil',
      icon: 'pi pi-user-edit',
      command: () => this.gotoProfile()
    },
    // {
    //   label: 'Mis reservas',
    //   icon: 'pi pi-ticket',
    //   command: () => this.gotoBookings()
    // },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ];

  ngOnInit() {
     this.updateMenu();

    // escuchar cambios en localStorage (login/logout desde otras páginas)
    window.addEventListener('storage', () => this.updateMenu());
  }

  updateMenu() {
    this.userMenuOptions = this.auth.isLoggedIn()
      ? this.loggedMenu
      : this.notLoggedMenu;
  }

  logout() {
  this.auth.logout();
  this.updateMenu();

  this.router.navigate(['/home'], {
    replaceUrl: true   // ← limpia historial
  });
  }

  gotoLoginPage() {
    const current = this.router.url;
    this.router.navigate(['/login'], { 
      queryParams: { action: 'login', returnUrl: current }
    });
  }

  gotoRegisterPage() {
    const current = this.router.url;
    this.router.navigate(['/login'], { 
      queryParams: { action: 'register', returnUrl: current }
    });

  }

  gotoProfile() {
    this.router.navigate(['/editar']);
  }

  gotoBookings() {
    this.router.navigate(['/mis-reservas']);
  }

  gotoHomePage() {
    this.router.navigate(['/home']);
  }

};
  

