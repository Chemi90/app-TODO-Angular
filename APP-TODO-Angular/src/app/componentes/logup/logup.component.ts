import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';

@Component({
  selector: 'app-logup',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './logup.component.html',
  styleUrl: './logup.component.css',
})
export class LogupComponent {
  constructor(private router: Router,
   private crud: CrudService
    ) {}
  cargarLogin() {
    this.router.navigate(['/login']);
  }

  registrarse(logupForm: any) {
    let datos = { ...logupForm.value };
    console.log(logupForm.value);
    delete logupForm.confirmPassword;
    this.crud.create('usuario', datos).subscribe((respuesta:any)=>{console.log(respuesta)
      if(respuesta.success){
        this.router.navigate(['/login']);
      }else {
        alert("No se ha podido crear el usuario");
        logupForm.reset();
      }
    });
  }
}
