import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import { Observable }     from 'rxjs/Rx';
import {CHART_DIRECTIVES} from 'ng2-charts';
import {ChartService} from './chart.service';

// webpack html imports
let template = require('./pieChart.component.html');

@Component({
  selector: 'pie-chart-demo',
  template: template,
  styleUrls: ['./charts.css'], //sem isto, gráficos não aparecem
  providers: [ChartService],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class PieChartDemoComponent {
  // lineChart
  private pieChart: any;

  private pieChartLabels: Array<any>;
  private pieChartData: Array<any> = [];
  private pieChartOptions: any;
  private pieChartLegend: boolean;
  private pieChartType: string;
  private pieChartColours: Array<any> = [];

  private pieChartDataSet: Array<any>;//auxiliar
  private dataLoaded: boolean = false;
  //----------------------------------------------------------------

  constructor(private pieChartService: ChartService) { }

  ngOnInit() {
    console.log('hello `PieChart` component');
    this.getPieChart();
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

  private getPieChart() {
    this.pieChartService.getChart("app/charts/pie-chart-data.json").subscribe(
      data => this.pieChart = data,
      err => console.log("Http Request error: " + err),
      () => this.splitChartData()
    );
  }

  private splitChartData() {
    this.pieChartLabels = this.pieChart[0]["labels"];
    this.pieChartOptions = this.pieChart[0]["options"];
    this.pieChartLegend = this.pieChart[0]["legend"];
    this.pieChartType = this.pieChart[0]["type"];
    this.pieChartDataSet = this.pieChart[0]["datasets"];

    for(let i = 0; i < this.pieChartDataSet.length; i++) {
      this.pieChartData.push({
        data: this.pieChartDataSet[i]["data"],
        label: this.pieChartDataSet[i]["label"]
      });

      this.pieChartColours.push({
        backgroundColor: this.pieChartDataSet[i]["backgroundColor"],
        //backgroundColor: new Array<any>,
        hoverBackgroundColor:this.pieChartDataSet[i]["hoverBackgroundColor"],
        borderColor: this.pieChartDataSet[i]["borderColor"],
        pointBackgroundColor: this.pieChartDataSet[i]["pointBackgroundColor"],
        pointBorderColor: this.pieChartDataSet[i]["pointBorderColor"],
        pointHoverBackgroundColor: this.pieChartDataSet[i]["pointHoverBackgroundColor"],
        pointHoverBorderColor: this.pieChartDataSet[i]["pointHoverBorderColor"]
      });
    }
    this.dataLoaded = true;
  }
}
