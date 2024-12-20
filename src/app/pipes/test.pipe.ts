import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {

  transform(price: number): string {
    if (price==undefined) {
      return '';
    }

    const price2 = price.toString();
    let result = '';
    let count = 0;

    for (let i = price2.length; i >= 0; i--) {
      count++;
      result += price2[i];

      if (count == 3 && i>0) {
        count = 0;
        result += ',';
      }    
    }

    return (result)
  }

}
