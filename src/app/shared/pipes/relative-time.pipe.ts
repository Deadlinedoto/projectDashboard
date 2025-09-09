import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
  standalone: true,
})
export class RelativeTimePipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    const now = new Date()
    const date = new Date(value)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const time = this.formatTime(date)

    if(date.toDateString() === now.toDateString()){
      return `Сегодня ${time}`
    }
    if(date.toDateString() === yesterday.toDateString()){
      return `Вчера ${time}`
    }
    return `${this.formatDate(date)} ${time}`;

  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  private formatDate(date: Date): string {
    const months  = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ];
    const day = date.getDate()
    const month  = months[date.getMonth()]

    return `${day} ${month}`
  }


}
