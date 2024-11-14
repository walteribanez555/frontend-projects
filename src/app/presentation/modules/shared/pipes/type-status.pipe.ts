import { Pipe, type PipeTransform } from '@angular/core';

export enum TypeStatus{
  INIT = 1 ,
  PROCESS = 2,
  FINISH = 3,
}


@Pipe({
  name: 'appTypeStatus',
  standalone: true,
})
export class TypeStatusPipe implements PipeTransform {

  transform(value: number | string, ...args: unknown[]): unknown {

    if(typeof value === 'string'){
      value = parseInt(value);
    }


    switch (value) {
      case TypeStatus.INIT:
        return 'Creado';
        break;
      case TypeStatus.PROCESS :
        return 'Proceso';
        break;
      case TypeStatus.FINISH:
        return 'Finalizado';
        break;
      default:
        return 'No definido';
    }
  }

}
