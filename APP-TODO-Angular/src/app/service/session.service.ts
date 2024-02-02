import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private usuario: any = null;
  constructor() {
    if(sessionStorage.getItem('usuario')){
      this.usuario = JSON.parse(sessionStorage.getItem('usuario') || 'null');
    }
  }

  iniciarSesion(usuario: any) {
    this.usuario = usuario;
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
  }

  finalizarSesion() {
    this.usuario = null;
    sessionStorage.removeItem('usuario');
  }

  obtenerUsuario() {
    return this.usuario;
  }

estaLogueado(){
  return this.usuario != null;
}  
}
