import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'OrderBy'
})

export class OrderByPipe implements PipeTransform {

  transform(locked: Array<any>, args?: any): any {
    return locked.sort((a, b) => {
      if(a[args.property] < b[args.property]){
          return -1 * args.direction;
      }
      else if( a[args.property] > b[args.property]){
          return 1 * args.direction;
      }
      else{
          return 0;
      }
    });
  };
}
