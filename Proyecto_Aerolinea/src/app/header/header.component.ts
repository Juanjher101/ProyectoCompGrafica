import { Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Image } from 'primeng/image'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [Toolbar, AvatarModule, ButtonModule, Image],
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  gotoLoginPage() {
    this.router.navigate(['/login']); 
  }

  gotoHomePage() {
    this.router.navigate(['/home']);
  }
}

