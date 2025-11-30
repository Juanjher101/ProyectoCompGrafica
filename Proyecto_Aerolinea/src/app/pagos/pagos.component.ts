import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { Reserva, ReservasService } from '../services/ReservasService';
import { HorariosService, TipoVuelo } from '../services/HorariosService';
import { finalize } from 'rxjs/operators';
import jsPDF from 'jspdf';
import { AsientosService } from '../services/AsientosService';

interface Banco {
  name: string;
  code: string;
}

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    InputTextModule,
    ButtonModule,
    RadioButtonModule,
    TooltipModule,
    FormsModule,
    HeaderComponent
  ],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  constructor(
    private reservasService: ReservasService,
    private horariosService: HorariosService,
    private asientosService: AsientosService
    
  ) {}

  vuelo: any = null;      // lo que guardaste en 'vueloSeleccionado'
  asiento: any = null;    // de 'asientoSeleccionado'
  busqueda: any = null;   // de 'busqueda'
  tiposVuelo: TipoVuelo [] = [];
  botonBloqueado = false;

  bancos: Banco[] = [
    { name: 'Bancolombia', code: 'bancolombia' },
    { name: 'Davivienda', code: 'davivienda' },
    { name: 'BBVA', code: 'bbva' },
    { name: 'Nequi', code: 'nequi' },
    { name: 'Daviplata', code: 'daviplata' },
    { name: 'PSE', code: 'pse' }
  ];

  bancoSeleccionado: string = '';

  // Campos del formulario
  nombreTitular: string = '';
  numeroTarjeta: string = '';
  fechaExpiracion: string = '';
  cvv: string = '';
  numeroCuenta: string = ''; // para Nequi/Daviplata
  correo: string = ''; // para PSE
  entidad: string = ''; // para PSE

  cargandoReserva = false;

  ngOnInit() {
    // recuperar busqueda, vuelo y asiento desde localStorage
    const busquedaGuardada = localStorage.getItem('busqueda');
    if (busquedaGuardada) {
      this.busqueda = JSON.parse(busquedaGuardada);
    }

    const vueloGuardado = localStorage.getItem('vueloSeleccionado');
    if (vueloGuardado) {
      this.vuelo = JSON.parse(vueloGuardado);
    }

    const asientoGuardado = localStorage.getItem('asientoSeleccionado');
    if (asientoGuardado) {
      this.asiento = JSON.parse(asientoGuardado);
    }

    console.log('Pagos init -> busqueda:', this.busqueda);
    console.log('Pagos init -> vuelo:', this.vuelo);
    console.log('Pagos init -> asiento:', this.asiento);

    // Cargar tipos de vuelo (para mapear nombre -> id)
    this.horariosService.getTiposVuelo().subscribe({
      next: (t) => {
        this.tiposVuelo = t || [];
        console.log('Tipos de vuelo cargados:', this.tiposVuelo);
      },
      error: (err) => {
        console.error('No se pudieron cargar tipos de vuelo:', err);
      }
    });
  }

  get requiereTarjeta(): boolean {
    return !['nequi', 'daviplata', 'pse'].includes(this.bancoSeleccionado);
  }

  get requiereCuenta(): boolean {
    return ['nequi', 'daviplata'].includes(this.bancoSeleccionado);
  }

  get requierePSE(): boolean {
    return this.bancoSeleccionado === 'pse';
  }

  get total(): number {
    return (this.vuelo?.precio || 0) + (this.asiento?.precioAdicional || 0);
  }

  pagar() {

      // ============================
    //  VALIDACIONES MEJORADAS
    // ============================

    // --- banco ---
    if (!this.bancoSeleccionado) {
      alert('Selecciona un banco o método de pago');
      return;
    }

    // --- nombre ---
    if (!this.nombreTitular || this.nombreTitular.trim().length < 5) {
      alert('Ingresa un nombre de titular válido');
      return;
    }

    // ================= TARJETA =================
    if (this.requiereTarjeta) {

      // número de tarjeta: 16 dígitos
      const cardRegex = /^[0-9]{16}$/;
      if (!cardRegex.test(this.numeroTarjeta.replace(/\s|-/g, ''))) {
        alert('El número de tarjeta debe tener 16 dígitos');
        return;
      }

      // fecha: MM/AA
      const fechaRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!fechaRegex.test(this.fechaExpiracion)) {
        alert('La fecha de expiración debe ser en formato MM/AA');
        return;
      }

      // CVV: 3 dígitos
      const cvvRegex = /^[0-9]{3}$/;
      if (!cvvRegex.test(this.cvv)) {
        alert('El CVV debe tener 3 dígitos');
        return;
      }
    }

    // ================= NEQUI / DAVIPLATA =================
    if (this.requiereCuenta) {
      const telefonoRegex = /^[0-9]{10}$/;
      if (!telefonoRegex.test(this.numeroCuenta)) {
        alert('El número de cuenta (teléfono) debe tener 10 dígitos');
        return;
      }
    }

    // ================= PSE =================
    if (this.requierePSE) {
      const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!correoRegex.test(this.correo)) {
        alert('Ingresa un correo válido');
        return;
      }

      if (!this.entidad || this.entidad.trim().length < 2) {
        alert('Ingresa la entidad bancaria');
        return;
      }
    }



  // ============================
  //  USUARIO LOGEADO
  // ============================
  const usuario = JSON.parse(localStorage.getItem('usuarioLogeado') || 'null');

  if (!usuario || !usuario.idUsuario) {
    alert('Debes iniciar sesión para continuar con el pago.');
    return;
  }


  // ============================
  //  CAMPOS DEL VUELO
  // ============================
  const idRuta =
  this.busqueda?.rutaId ||
  this.busqueda?.idRuta ||
  this.asiento?.idRuta ||
  this.asiento?.id_ruta ||
  this.vuelo?.idRuta ||
  this.vuelo?.id_ruta ||
  null;



  const idHorario =
    this.asiento?.idHorario ||
    this.asiento?.id_horario ||
    null;

  const idAsiento =
    this.asiento?.idAsiento ||
    this.asiento?.id_asiento ||
    null;


  // ============================
  //  TIPO DE VUELO
  // ============================
  const nombreTipo = (this.vuelo?.vueloTipo || this.vuelo?.tipo || '').toString().trim();

  const tipoEncontrado = this.tiposVuelo.find(
    t => (t.nombre || '').toLowerCase() === nombreTipo.toLowerCase()
  );

  const idTipoVuelo = tipoEncontrado?.id || null;


  console.log('>>> Datos vuelo ->', {
    idRuta,
    idHorario,
    idAsiento,
    nombreTipo,
    idTipoVuelo
  });


  // ============================
  //  VALIDACIONES FINALES
  // ============================
  if (!idRuta) {
    alert('No se encontró la ruta del vuelo.');
    return;
  }
  if (!idHorario) {
    alert('No se encontró el horario seleccionado.');
    return;
  }
  if (!idAsiento) {
    alert('No se encontró el asiento seleccionado.');
    return;
  }
  if (!idTipoVuelo) {
    alert(`No se pudo determinar el tipo de vuelo: "${nombreTipo}".`);
    return;
  }


  // ============================
  //  PAYLOAD CORRECTO
  // ============================
  const reservaPayload: Reserva = {
  IdUsuario: usuario.idUsuario,
  IdRuta: idRuta,
  IdHorario: idHorario,
  IdAsiento: idAsiento,
  IdTipoVuelo: idTipoVuelo,
  EstadoPago: true
  };

  console.log('>>> Reserva enviada:', reservaPayload);


  // ============================
  //  ENVÍO A BD
  // ============================
  this.cargandoReserva = true;

  this.reservasService.addReserva(reservaPayload)
    .pipe(finalize(() => this.cargandoReserva = false))
    .subscribe({
      next: (resp) => {
      console.log('Reserva guardada correctamente:', resp);

      this.botonBloqueado = true;  // 🔒 Bloquea el botón

      // 🔹 Actualizar estado del asiento a ocupado
      if (this.asiento) {
        const asientoActualizado = { ...this.asiento, estado: true };
        this.asientosService.updateAsiento(asientoActualizado).subscribe({
          next: () => console.log('Asiento marcado como ocupado'),
          error: (err) => console.error('Error al actualizar asiento:', err)
        });
      }

      this.generarPDF();           // 📄 Genera el PDF automáticamente
      },
      error: (err) => {
        console.error('Error al guardar reserva:', err);
        const msg = err?.error?.message || err?.message || JSON.stringify(err);
        alert('Ocurrió un error al guardar la reserva: ' + msg);
      }
    });

  }

  generarPDF() {
  const pdf = new jsPDF('p', 'mm', 'a4');

  pdf.setFillColor(230, 199, 255); // Cambia el color aquí (RGB)
  pdf.rect(0, 0, 210, 297, 'F');

  // === TÍTULO BONITO ===

  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(28);
  pdf.text('GRACIAS POR VOLAR CON AIR DJ', 105, 20, { align: 'center' });


  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(20);
  pdf.text('Confirmación de Reserva', 15, 30);


  pdf.setLineWidth(0.5);
  pdf.line(15, 35, 195, 35);

  // === DATOS DEL RESUMEN ===
  const inicioY = 45;
  let y = inicioY;

  pdf.setFontSize(14);
  pdf.setFont('Helvetica', 'bold');
  pdf.text('Detalles de tu reserva:', 15, y);
  y += 10;

  pdf.setFontSize(12);
  pdf.setFont('Helvetica', 'normal');

  const agregarLinea = (label: string, valor: any) => {
    pdf.setFont('Helvetica', 'bold');
    pdf.text(`${label}:`, 15, y);
    pdf.setFont('Helvetica', 'normal');
    pdf.text(` ${valor}`, 45, y);
    y += 8;
  };

  agregarLinea('Ruta', `${this.busqueda?.origen?.name} -- ${this.busqueda?.destino?.name}`);
  agregarLinea('Salida', this.vuelo?.horaSalida);
  agregarLinea('Llegada', this.vuelo?.horaLlegada);
  agregarLinea('Asiento', `${this.asiento.fila}${this.asiento.columna}`);
  agregarLinea('Tipo de vuelo', this.vuelo.vueloTipo);
  agregarLinea('Precio base', `$${this.vuelo.precio}`);
  agregarLinea('Precio asiento', `$${this.asiento.precioAdicional}`);
  
  pdf.setLineWidth(0.3);
  pdf.line(15, y + 2, 195, y + 2);
  y += 10;

  pdf.setFont('Helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.text(`TOTAL: $${this.total}`, 15, y);

  // === GUARDAR PDF ===
  pdf.save('Reserva.pdf');
}

}