import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoTareaPipe } from '../../pipes/estado-tarea.pipe';
import { Router } from '@angular/router';
import { SessionService } from '../../service/session.service';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  imports: [FormsModule, EstadoTareaPipe],
})
export class MainComponent implements OnInit {
  ngOnInit(): void {
    this.nombreUsuario = this.sessionService.obtenerUsuario().nombre;
    this.actualizarTotales();
  }

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private crud: CrudService
  ) {
    this.crud
      .read('tareas', this.sessionService.obtenerUsuario().id_usuario)
      .subscribe((respuesta: any) => {
        if (respuesta.success) {
          this.listaTareas = respuesta.data;
        } else {
          this.listaTareas = [];
        }
        this.actualizarTotales();
      });
  }

  listaTareas: any[] = [];

  nombreUsuario = 'Nombre usuario';
  totalCompletadas = signal(0);
  totalPendientes = signal(0);
  nuevaTarea = '';
  checkCompletadas = false;

  cargarLogin() {
    this.sessionService.finalizarSesion();
    this.router.navigate(['/login']);
  }

  borrarTarea(item: any) {
    this.crud.delete('tareas', item.id_tarea).subscribe((respuesta: any) => {
      if (respuesta.success) {
        this.listaTareas = this.listaTareas.filter(
          (tarea) => tarea.id_tarea != item.id_tarea
        );
        this.actualizarTotales();
      }
    });
  }

  completarTarea(item: any) {
    this.crud.update('tareas', item.id_tarea,{
      completada: true
    }).subscribe((respuesta: any)=> {
      if(respuesta.success) {
        item.completada = true;
        this.actualizarTotales();
      }
    })
  }
  
  actualizarTotales() {
    this.totalCompletadas.set(
      this.listaTareas.filter((tarea) => tarea.completada).length
    );
    this.totalPendientes.set(this.listaTareas.length - this.totalCompletadas());
  }

  agregarTarea() {
    this.crud.create('tareas', {
      nombre: this.nuevaTarea,
      id_usuario: this.sessionService.obtenerUsuario().id_usuario,
      completada: false
    }).subscribe((respuesta: any) => {
      if (respuesta.success) {
        this.listaTareas.push(respuesta.data);
        this.nuevaTarea = '';
        this.actualizarTotales();
      }
    });
  }
}
