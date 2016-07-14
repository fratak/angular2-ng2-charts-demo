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
      <span>
        <a [routerLink]=" ['./radarChart'] ">
          Radar Chart
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./doughnutChart'] ">
          Doughnut Chart
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./pieChart'] ">
          Pie Chart
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./polarAreaChart'] ">
          Polar Area Chart
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
