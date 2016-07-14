import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import { Observable }     from 'rxjs/Rx';
import {CHART_DIRECTIVES} from 'ng2-charts';
import {ChartService} from './chart.service';

// webpack html imports
let template = require('./doughnutChart.component.html');

@Component({
  selector: 'doughnut-chart-demo',
  template: template,
  styleUrls: ['./charts.css'], //sem isto, gráficos não aparecem
  providers: [ChartService],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class DoughnutChartDemoComponent {
  // lineChart
  private doughnutChart: any;

  private doughnutChartLabels: Array<any>;
  private doughnutChartData: Array<any> = [];
  private doughnutChartOptions: any;
  private doughnutChartLegend: boolean;
  private doughnutChartType: string;
  private doughnutChartColours: Array<any> = [];

  private doughnutChartDataSet: Array<any>;//auxiliar
  private dataLoaded: boolean = false;
  //----------------------------------------------------------------

  constructor(private doughnutChartService: ChartService) { }

  ngOnInit() {
    console.log('hello `DoughnutChart` component');
    this.getDoughnutChart();
  }
/*
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
*/
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  private getDoughnutChart() {
    this.doughnutChartService.getChart("app/charts/doughnut-chart-data.json").subscribe(
      data => this.doughnutChart = data,
      err => console.log("Http Request error: " + err),
      () => this.splitChartData()
    );
  }

  private splitChartData() {
    console.log("splitChartData");
    this.doughnutChartLabels = this.doughnutChart[0]["labels"];
    this.doughnutChartOptions = this.doughnutChart[0]["options"];
    this.doughnutChartLegend = this.doughnutChart[0]["legend"];
    this.doughnutChartType = this.doughnutChart[0]["type"];
    this.doughnutChartDataSet = this.doughnutChart[0]["datasets"];

    for(let i = 0; i < this.doughnutChartDataSet.length; i++) {
      this.doughnutChartData.push({
        data: this.doughnutChartDataSet[i]["data"],
        label: this.doughnutChartDataSet[i]["label"]
      });

      this.doughnutChartColours.push({
        backgroundColor: this.doughnutChartDataSet[i]["backgroundColor"],
        //backgroundColor: new Array<any>,
        hoverBackgroundColor:this.doughnutChartDataSet[i]["hoverBackgroundColor"],
        borderColor: this.doughnutChartDataSet[i]["borderColor"],
        pointBackgroundColor: this.doughnutChartDataSet[i]["pointBackgroundColor"],
        pointBorderColor: this.doughnutChartDataSet[i]["pointBorderColor"],
        pointHoverBackgroundColor: this.doughnutChartDataSet[i]["pointHoverBackgroundColor"],
        pointHoverBorderColor: this.doughnutChartDataSet[i]["pointHoverBorderColor"]
      });
    }
    console.log("--->" + this.doughnutChartColours[0].backgroundColor);
    console.log("--->" + this.doughnutChartColours[0].hoverBackgroundColor);
    this.dataLoaded = true;
  }
}
