import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating'
})
export class RatingPipe implements PipeTransform {
  transform(value: number): string {
    return '★'.repeat(Math.round(value)) + '☆'.repeat(5 - Math.round(value));
  }
}