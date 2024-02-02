import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../service/session.service';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  mensajeError: any = '';
  usuario: any = '';
  clave: any = '';

  constructor(
    private crud: CrudService,
    private router: Router, 
    private sessionService: SessionService){
      if(this.sessionService.estaLogueado()){
        this.router.navigate(['/main']);
      }
    }

  login() {
    this.crud.create('login', {
      usuario: this.usuario,
      clave: this.clave
    }).subscribe((respuesta: any)=>{
      if(respuesta.success){
        this.mensajeError='',
        this.sessionService.iniciarSesion(respuesta.data);
        this.router.navigate(['/main']);
      } else {
        this.mensajeError = respuesta.message;
      }
    })
  }
  cargarLogup() {
    this.router.navigate(['/logup']);
  }
}
