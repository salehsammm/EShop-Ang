import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {

  transform(value: number , sign: string): string {
    if (typeof value != 'number') {
      return value;
    }
    return (String(value)+sign)
  }

}
