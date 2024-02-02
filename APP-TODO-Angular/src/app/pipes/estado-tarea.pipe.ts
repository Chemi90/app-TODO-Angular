import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoTarea',
  standalone: true
})
export class EstadoTareaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? 'Completada' : 'Pendiente';
  }

}
