import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(price: number): string {
    if (price==undefined) {
      return '';
    }

    const persianNum = new Intl.NumberFormat('fa-IR').format(price);
    return (persianNum);

    // const price2 = price.toString();

    // let result = '';
    // let count = 0;

    // for (let i=price2.length-1 ; i>=0 ; i--) {
    //   count++;
    //   result = price2[i] + result;

    //   if (count == 3 && i>0) {
    //     count = 0;
    //     result = ',' + result;
    //   }    
    // }

    // return (result);
  }
}
