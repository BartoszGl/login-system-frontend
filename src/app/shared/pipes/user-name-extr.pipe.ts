import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userNameExtr'
})
export class UserNameExtrPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.split('@')[0] ? value.split('@')[0] : value;
  }

}
