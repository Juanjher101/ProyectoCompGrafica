import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService, Usuario } from '../services/UsuariosService';
import { AuthService } from '../services/auth.service';
import { ReservasService, Reserva } from '../services/ReservasService';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Message} from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderComponent } from '../header/header.component';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  standalone:true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SelectButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    Message,
    DropdownModule,
    HeaderComponent
  ]
})
export class EditarPerfilComponent implements OnInit {

  perfilForm: FormGroup;
  loading = false;
  loadingDelete = false;
  usuarioActual: Usuario | null = null;

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private reservasService: ReservasService,
    private router: Router
  ) {
    this.perfilForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  const usuarioLog = this.authService.getUsuario();
  console.log("Usuario obtenido desde AuthService:", usuarioLog);
  
  if (!usuarioLog) {
    // Si no hay usuario logueado, redirigir al login
    this.router.navigate(['/login']);
    return;
  }

  this.usuarioActual = usuarioLog;

  this.perfilForm.patchValue({
    nombre: this.usuarioActual?.nombre || '',
    apellido: this.usuarioActual?.apellido || '',
    telefono: this.usuarioActual?.telefono || '',
    email: this.usuarioActual?.email || ''
  });
}

  onUpdate() {
  const form = this.perfilForm.value;

  const usuario = this.authService.getUsuario();
  const userId = usuario.id ?? usuario.idUsuario;

  if (!userId) {
    alert('Error: usuario no cargado o sin ID');
    return;
  }

  const updatedUser = {
    idUsuario: userId,
    nombre: form.nombre,
    apellido: form.apellido,
    telefono: form.telefono,
    email: form.email,
    passwordHash: form.password
      ? CryptoJS.SHA256(form.password).toString()
      : usuario.passwordHash,
    tipoUsuario: usuario.tipoUsuario
  };

  console.log("Objeto enviado al backend:", updatedUser);

  this.usuariosService.updateUsuario(userId, updatedUser as any)
    .subscribe({
      next: () => {
        alert('Perfil actualizado correctamente');

        localStorage.setItem('usuarioLogeado', JSON.stringify({
          ...usuario,
          ...updatedUser
        }));

        this.usuarioActual = updatedUser as any;
      },
      error: err => console.error('Error actualizando perfil', err)
    });
}



  confirmDelete() {

  if (!this.usuarioActual) return;

  // Obtener ID correctamente
  const userId =
    (this.usuarioActual as any).idUsuario ||
    (this.usuarioActual as any).IdUsuario ||
    (this.usuarioActual as any).id;

  if (!userId) {
    alert('Error obteniendo el ID del usuario.');
    return;
  }

  this.reservasService.getReservasPorUsuario(userId).subscribe({
    next: (reservas: Reserva[]) => {

      // Filtrar reservas pagadas según backend (EstadoPago)
      const reservasPagadas = reservas.filter(r => r.EstadoPago === true);

      if (reservasPagadas.length > 0) {
        alert('No puedes eliminar la cuenta porque tienes reservas compradas.');
        return;
      }

      const confirmar = window.confirm(
        '¿Estás seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.'
      );

      if (confirmar) this.deleteAccount();
    },

    error: (err) => {
      // Si NO tiene reservas, backend devuelve 404 → se permite eliminar
      if (err.status === 404) {
        const confirmar = window.confirm(
          'No tienes reservas pendientes. ¿Deseas eliminar tu cuenta?'
        );
        if (confirmar) this.deleteAccount();
        return;
      }

      console.error(err);
      alert('No se pudo verificar tus reservas.');
    }
  });
}



deleteAccount() {
  if (!this.usuarioActual) return;

  const userId =
    (this.usuarioActual as any).idUsuario ||
    (this.usuarioActual as any).IdUsuario ||
    (this.usuarioActual as any).id;

  if (!userId) {
    alert('Error obteniendo el ID del usuario.');
    return;
  }

  this.loadingDelete = true;

  this.usuariosService.deleteUsuario(userId).subscribe({
    next: () => {
      this.authService.logout();
      this.loadingDelete = false;
      this.router.navigate(['/home']).then(() => window.location.reload());
    },

    error: (err) => {
      console.error(err);
      this.loadingDelete = false;
      alert('No se pudo eliminar la cuenta');
    }
  });
}
}