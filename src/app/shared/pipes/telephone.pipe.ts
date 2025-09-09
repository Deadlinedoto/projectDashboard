import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telephone',
  standalone: true,
})
export class TelephonePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';

    const cleaned = value.replace(/[^\d+]/g, '');

    if (cleaned.startsWith('+7') && cleaned.length === 12)  {
      return cleaned.replace(/^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 ($2) $3-$4-$5');
    }
    if (cleaned.startsWith('8') && cleaned.length === 10) {
      return cleaned.replace(/^8(\d{3})(\d{2})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
    }
    if (cleaned.startsWith('7') && cleaned.length === 11) {
      return cleaned.replace(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
    }
    if (cleaned.length === 10 && !cleaned.startsWith('7') && !cleaned.startsWith('8') && !cleaned.startsWith('+')) {
      return cleaned.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
    }
    return value;
  }

}
