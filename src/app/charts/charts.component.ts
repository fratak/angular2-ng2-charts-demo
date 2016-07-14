import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'charts',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template: `
    <nav>
      <span>
        <a [routerLink]=" ['./'] ">
          Line Chart
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./barChart'] ">
          Bar Chart
        </a>
      </span>
      |
    </nav>
    <router-outlet></router-outlet>
  `
})
export class Charts {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Charts` component');
  }

}
