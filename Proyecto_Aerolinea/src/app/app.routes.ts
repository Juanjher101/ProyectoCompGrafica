import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HorariosComponent } from './horarios/horarios.component';
import { AsientosComponent } from './asientos/asientos.component';
import { PagosComponent } from './pagos/pagos.component';
import { EditarPerfilComponent } from './editar/editar.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomePageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'horas', component: HorariosComponent},
    {path: 'asientos', component: AsientosComponent},
    {path: 'pagos', component: PagosComponent},
    {path: 'editar', component: EditarPerfilComponent},
    
];
