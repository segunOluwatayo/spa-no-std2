import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upvote'
})
export class UpvotePipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Upvoted' : 'Upvote';
  }
}