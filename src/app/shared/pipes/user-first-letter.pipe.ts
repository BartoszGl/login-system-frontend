import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFirstLetter'
})
export class UserFirstLetterPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.substr(0, 1).toUpperCase();
  }

}
