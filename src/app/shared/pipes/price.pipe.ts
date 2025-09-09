import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {

  transform(value: any, currency = 'RUB'): string {
    if (value === null || value === undefined) {
        return '';
    }
    else{
      const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
      });
    return formatter.format(value);

    }
  }

}
