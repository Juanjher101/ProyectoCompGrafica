import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { Image } from 'primeng/image';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-login',
  imports: [
    FormsModule,
    CommonModule,
    SelectButtonModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    Message
  ],
  standalone: true,
  templateUrl: './card-login.component.html',
  styleUrl: './card-login.component.css'
})
export class CardLoginComponent {

  // controla si viene desde el header
  actionFromHeader = false;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['action']) {
        this.actionFromHeader = true;
        this.action = params['action']; // "login" o "register"
      }
    });
  }

  // opciones del selector
  stateOption: any[] = [
    { label: 'Iniciar Sesión', value: 'login' },
    { label: 'Registrarse', value: 'register' }
  ];

  action: string = 'off';


  // ---------------- LOGIN FORM ----------------
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });

  loading = false;

  getEmailError() {
    if (this.email.hasError('required')) return 'El email es obligatorio';
    if (this.email.hasError('email')) return 'Email inválido';
    return '';
  }

  getPasswordError() {
    if (this.password.hasError('required')) return 'La contraseña es obligatoria';
    if (this.password.hasError('minlength')) return 'Debe tener mínimo 8 caracteres';
    return '';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    setTimeout(() => {
      console.log('Datos enviados:', this.loginForm.value);
      this.loading = false;
    }, 1000);
  }


  // ---------------- REGISTER FORM ----------------
  nameReg = new FormControl('', [Validators.required]);
  paisReg = new FormControl('', [Validators.required]);
  telefonoReg = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
    Validators.minLength(6)
  ]);
  emailReg = new FormControl('', [Validators.required, Validators.email]);
  passwordReg = new FormControl('', [Validators.required, Validators.minLength(8)]);

  registerForm = new FormGroup({
    nameReg: this.nameReg,
    paisReg: this.paisReg,
    telefonoReg: this.telefonoReg,
    emailReg: this.emailReg,
    passwordReg: this.passwordReg
  });

  pulse = false;

  getNameRegError() {
    if (this.nameReg.hasError('required')) return 'Nombre Obligatorio';
    return '';
  }

  getPaisRegError() {
    if (this.paisReg.hasError('required')) return 'Pais Obligatorio';
    return '';
  }

  getTelefonoRegError() {
    if (this.telefonoReg.hasError('required')) return 'Telefono Obligatorio';
    if (this.telefonoReg.hasError('pattern')) return 'Telefono no valido';
    if (this.telefonoReg.hasError('minlength')) return 'Debe tener al menos 6 caracteres';
    return '';
  }

  getEmailRegError() {
    if (this.emailReg.hasError('required')) return 'Email Obligatorio';
    if (this.emailReg.hasError('email')) return 'Email no valido';
    return '';
  }

  getPasswordRegError() {
    if (this.passwordReg.hasError('required')) return 'Contraseña obligatoria';
    if (this.passwordReg.hasError('minlength')) return 'Debe tener al menos 8 caracteres';
    return '';
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.pulse = true;

    setTimeout(() => {
      console.log('Datos enviados:', this.registerForm.value);
      this.pulse = false;
    }, 1000);
  }
}
