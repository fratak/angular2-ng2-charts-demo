import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import { Observable }     from 'rxjs/Rx';
import {CHART_DIRECTIVES} from 'ng2-charts';
import {ChartService} from './chart.service';

// webpack html imports
let template = require('./polarAreaChart.component.html');

@Component({
  selector: 'polar-area-chart-demo',
  template: template,
  styleUrls: ['./charts.css'], //sem isto, gráficos não aparecem
  providers: [ChartService],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class PolarAreaChartDemoComponent {
  // lineChart
  private polarAreaChart: any;

  private polarAreaChartLabels: Array<any>;
  private polarAreaChartData: Array<any> = [];
  private polarAreaChartOptions: any;
  private polarAreaChartLegend: boolean;
  private polarAreaChartType: string;
  private polarAreaChartColours: Array<any> = [];

  private polarAreaChartDataSet: Array<any>;//auxiliar
  private dataLoaded: boolean = false;
  //----------------------------------------------------------------

  constructor(private polarAreaChartService: ChartService) { }

  ngOnInit() {
    console.log('hello `PolarAreaChart` component');
    this.getPolarAreaChart();
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

  private getPolarAreaChart() {
    this.polarAreaChartService.getChart("app/charts/polar-area-chart-data.json").subscribe(
      data => this.polarAreaChart = data,
      err => console.log("Http Request error: " + err),
      () => this.splitChartData()
    );
  }

  private splitChartData() {
    this.polarAreaChartLabels = this.polarAreaChart[0]["labels"];
    this.polarAreaChartOptions = this.polarAreaChart[0]["options"];
    this.polarAreaChartLegend = this.polarAreaChart[0]["legend"];
    this.polarAreaChartType = this.polarAreaChart[0]["type"];
    this.polarAreaChartDataSet = this.polarAreaChart[0]["datasets"];

    for(let i = 0; i < this.polarAreaChartDataSet.length; i++) {
      this.polarAreaChartData.push({
        data: this.polarAreaChartDataSet[i]["data"],
        label: this.polarAreaChartDataSet[i]["label"]
      });

      this.polarAreaChartColours.push({
        backgroundColor: this.polarAreaChartDataSet[i]["backgroundColor"],
        //backgroundColor: new Array<any>,
        hoverBackgroundColor:this.polarAreaChartDataSet[i]["hoverBackgroundColor"],
        borderColor: this.polarAreaChartDataSet[i]["borderColor"],
        pointBackgroundColor: this.polarAreaChartDataSet[i]["pointBackgroundColor"],
        pointBorderColor: this.polarAreaChartDataSet[i]["pointBorderColor"],
        pointHoverBackgroundColor: this.polarAreaChartDataSet[i]["pointHoverBackgroundColor"],
        pointHoverBorderColor: this.polarAreaChartDataSet[i]["pointHoverBorderColor"]
      });
    }
    this.dataLoaded = true;
  }
}
