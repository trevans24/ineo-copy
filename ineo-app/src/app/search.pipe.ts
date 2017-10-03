import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})

export class SearchPipe implements PipeTransform {
  transform(locked: any, term: any):any {
    // check search term
    if(term === undefined || null) return locked;

    // return updated array of locked data
    return locked.filter((lock) => {
      return lock.User.toLowerCase().includes(term.toLowerCase());
    })
  }

}
