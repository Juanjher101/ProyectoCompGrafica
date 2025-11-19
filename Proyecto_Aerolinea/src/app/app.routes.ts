import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

export const routes: Routes = [
    {path: 'home', component: HomePageComponent},
    {path: 'login', component: LoginPageComponent},
];
