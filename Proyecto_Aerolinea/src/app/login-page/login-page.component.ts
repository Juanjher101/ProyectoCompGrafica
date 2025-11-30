import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Usuario, UsuariosService } from '../services/UsuariosService';
import * as CryptoJS from 'crypto-js';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true,
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
export class LoginPageComponent {

  // ==================== VARIABLES ====================
  action: string = 'login';
  actionFromHeader: boolean = false;

  loading = false;
  pulse = false;

  loginError: string = ''; // Mensaje de error en login

  stateOption = [
    { label: 'Iniciar Sesión', value: 'login' },
    { label: 'Registrarse', value: 'register' }
  ];

  // ==================== FORMULARIOS ====================
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  // ==================== VALIDADORES ====================
  passwordsMatch: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('passwordReg')?.value;
    const confirm = group.get('confirmPasswordReg')?.value;
    return pass === confirm ? null : { notMatching: true };
  }

  // ==================== CONSTRUCTOR ====================
  constructor(private usuariosService: UsuariosService, private route: ActivatedRoute, private router: Router ) {
    
    // Login form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    // Register form
    this.registerForm = new FormGroup({
      nameReg: new FormControl('', Validators.required),
      apellidoReg: new FormControl('', Validators.required),
      telefonoReg: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      emailReg: new FormControl('', [Validators.required, Validators.email]),
      passwordReg: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPasswordReg: new FormControl('', Validators.required)
    }, { validators: this.passwordsMatch });

    // Revisamos si viene acción desde header
    this.route.queryParams.subscribe(params => {
      if (params['action']) {
        this.actionFromHeader = true;
        this.action = params['action'];
      }
    });
  }

  // ==================== FUNCIONES DE ERROR ====================
  getEmailError() {
    const control = this.loginForm.get('email');
    if (control?.hasError('required')) return 'El email es obligatorio';
    if (control?.hasError('email')) return 'Email inválido';
    return '';
  }

  getPasswordError() {
    const control = this.loginForm.get('password');
    if (control?.hasError('required')) return 'La contraseña es obligatoria';
    if (control?.hasError('minlength')) return 'Debe tener mínimo 8 caracteres';
    return '';
  }

  getNameRegError() { return this.registerForm.get('nameReg')?.hasError('required') ? 'Nombre obligatorio' : ''; }
  getApellidoRegError() { return this.registerForm.get('apellidoReg')?.hasError('required') ? 'Apellido obligatorio' : ''; }
  getTelefonoRegError() {
    const control = this.registerForm.get('telefonoReg');
    if (control?.hasError('required')) return 'Teléfono obligatorio';
    if (control?.hasError('pattern')) return 'Teléfono inválido (10 dígitos)';
    return '';
  }
  getEmailRegError() {
    const control = this.registerForm.get('emailReg');
    if (control?.hasError('required')) return 'Email obligatorio';
    if (control?.hasError('email')) return 'Email inválido';
    return '';
  }
  getPasswordRegError() {
    const control = this.registerForm.get('passwordReg');
    if (control?.hasError('required')) return 'Contraseña obligatoria';
    if (control?.hasError('minlength')) return 'Mínimo 8 caracteres';
    return '';
  }
  getConfirmPasswordRegError() {
    const control = this.registerForm.get('confirmPasswordReg');
    if (control?.hasError('required')) return 'Confirmar contraseña obligatoria';
    if (this.registerForm.hasError('notMatching')) return 'Las contraseñas no coinciden';
    return '';
  }

  // ==================== LOGIN ====================
  // ==================== LOGIN ====================
onLogin() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.loading = true;
  this.loginError = '';

  const email = this.loginForm.value.email!;
  const password = this.loginForm.value.password!;
  const hashedPassword = CryptoJS.SHA256(password).toString();

  this.usuariosService.getUsuarios().subscribe({
    next: (usuarios) => {
      const usuario = usuarios.find(u => u.email === email);

      if (!usuario) {
        this.loginError = 'Usuario no encontrado';
      } else if (usuario.passwordHash !== hashedPassword) {
        this.loginError = 'Email o contraseña incorrectos';
      } else {

        // 🔥 GUARDAR USUARIO LOGUEADO
        localStorage.setItem('usuarioLogeado', JSON.stringify(usuario));

        // ⭐⭐⭐ SI ES ADMIN → LLEVAR A ADMIN DE UNA ⭐⭐⭐
        if (usuario.tipoUsuario === 'admin') {
          this.router.navigate(['/admin']);
          this.loading = false;
          return;
        }

        // 🔥 OBTENER returnUrl
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

        // Si no viene returnUrl, ir al home
        if (!returnUrl || returnUrl === '/login') {
          returnUrl = '/home';
        }

        // 🔥 REDIRIGIR A LA PÁGINA DONDE ESTABA
        this.router.navigateByUrl(returnUrl);
      }

      this.loading = false;
    },


    error: (err) => {
      console.error('Error al obtener usuarios', err);
      this.loginError = 'Ocurrió un error, intenta de nuevo';
      this.loading = false;
    }
  });
}

  // ==================== REGISTER ====================
  onRegister() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  this.pulse = true;

  const form = this.registerForm.value;

  const nuevoUsuario: Usuario = {
    nombre: form.nameReg!,
    apellido: form.apellidoReg!,   // Asegúrate que ESTE CONTROL EXISTE
    telefono: form.telefonoReg!,
    email: form.emailReg!,
    passwordHash: CryptoJS.SHA256(form.passwordReg!).toString(),
    tipoUsuario: 'cliente'
  };

  console.log("DATOS ENVIADOS AL BACKEND:", nuevoUsuario);

  this.usuariosService.addUsuario(nuevoUsuario).subscribe({
    next: (res) => {
      console.log('Usuario registrado', res);

      localStorage.setItem('usuarioLogeado', JSON.stringify(res));

      this.router.navigate(['/home']);
      this.pulse = false;
    },
    error: (err) => {
      console.error('Error registrando usuario', err);
      this.pulse = false;
    }
  });
}
}