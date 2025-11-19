import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-boton-prueba',
  templateUrl: './boton-prueba.component.html',
  standalone: true,
  imports: [Toast, ButtonModule],
  providers: [MessageService],
  styleUrl: './boton-prueba.component.css'
})
export class BotonPruebaComponent {
  constructor(private messageService: MessageService) {}

    show() {
        this.messageService.add({ severity: 'Danger', summary: 'Primer Aviso Dayanaa!!', detail: 'Me voa moriiiir!!! \nIras alistando outfit negro', life: 3000 });
    }
}
