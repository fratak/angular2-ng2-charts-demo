import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import { Observable }     from 'rxjs/Rx';
import {CHART_DIRECTIVES} from 'ng2-charts';
import {ChartService} from './chart.service';

// webpack html imports
let template = require('./barChart.component.html');

@Component({
  selector: 'bar-chart-demo',
  template: template,
  styleUrls: ['./charts.css'],
  providers: [ChartService],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class BarChartDemoComponent {
  /*
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
  ];
  */
  private barChart: any;

  private barChartLabels: Array<any>;
  private barChartData: Array<any> = [];
  private barChartOptions: any;
  private barChartLegend: boolean;
  private barChartType: string;
  private barChartColours: Array<any> = [];

  private barChartDataSet: Array<any>;//auxiliar
  private dataLoaded: boolean = false;

  constructor(private barChartService: ChartService) { }

  ngOnInit() {
    console.log('hello `BarChart` component');
    this.getBarChart();
  }

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  private getBarChart() {
    this.barChartService.getChart("app/charts/bar-chart-data.json").subscribe(
      data => this.barChart = data,
      err => console.log("Http Request error: " + err),
      () => this.splitChartData()
    );
  }

  private splitChartData() {
    this.barChartLabels = this.barChart[0]["labels"];
    this.barChartOptions = this.barChart[0]["options"];
    this.barChartLegend = this.barChart[0]["legend"];
    this.barChartType = this.barChart[0]["type"];
    this.barChartDataSet = this.barChart[0]["datasets"];

    for(let i = 0; i < this.barChartDataSet.length; i++) {
      this.barChartData.push({
        data: this.barChartDataSet[i]["data"],
        label: this.barChartDataSet[i]["label"]
      });
      this.barChartColours.push({
        backgroundColor: this.barChartDataSet[i]["backgroundColor"],
        borderColor: this.barChartDataSet[i]["borderColor"],
        pointBackgroundColor: this.barChartDataSet[i]["pointBackgroundColor"],
        pointBorderColor: this.barChartDataSet[i]["pointBorderColor"],
        pointHoverBackgroundColor: this.barChartDataSet[i]["pointHoverBackgroundColor"],
        pointHoverBorderColor: this.barChartDataSet[i]["pointHoverBorderColor"]
      });
    }
    this.dataLoaded = true;
  }
}
