import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  nav: string = 'nav-link';
  show: boolean = false;
  search: string = 'search';

  toggleCollapse() {
    // change show
    this.show = !this.show;
    // Change style of active link
    if (this.show !== true) {
      this.nav = 'nav-link';
    } else {
      this.nav = 'nav-link-active';
    }
  }

  mouseEnter($event) {
    this.search = $event.type == 'mouseenter' ? 'search-box' : 'search';
  }

  mouseLeave($event) {
    this.search = $event.type == 'mouseleave' ? 'search' : 'search-box';
  }

  clear() {
    let text = document.getElementsByTagName('input');
    for (let i = 0; i < text.length; i ++) {
      if(text[i].type === 'text' && text[i].value !== '') {
        text[i].value = '';
      }
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
