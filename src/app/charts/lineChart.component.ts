import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import { Observable }     from 'rxjs/Rx';
import {CHART_DIRECTIVES} from 'ng2-charts';
import {LineChartService} from './lineChart.service';

// webpack html imports
let template = require('./lineChart.component.html');

@Component({
  selector: 'line-chart-demo',
  template: template,
  styleUrls: ['./charts.css'], //sem isto, gráficos não aparecem
  providers: [LineChartService],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class LineChartDemoComponent {
  // lineChart
  private lineChart: any;

  private lineChartLabels: Array<any>;
  private lineChartData: Array<any> = [];
  private lineChartOptions: any;
  private lineChartLegend: boolean;
  private lineChartType: string;
  private lineChartColours: Array<any> = [];

  private lineChartDataSet: Array<any>;//auxiliar
  private dataLoaded: boolean = false;

  //----------------------------------------------------------------

  constructor(private lineChartService: LineChartService) {
      console.log('--->',this.lineChartService.paramTest(2016000));
  }

  ngOnInit() {
    console.log('hello `LineChart` component');
    this.getLineChart();
    //this.lineChartService.paramTest("app/charts/line-chart-data.json");
    console.debug(this.lineChartService.paramTest('teste aqui'));
  }

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

  private getLineChart() {
    this.lineChartService.getLineChart("app/charts/line-chart-data.json").subscribe(
      data => this.lineChart = data,
      err => console.log("Http Request error: " + err),
      () => this.splitChartData()
    );
  }

  private splitChartData() {
    this.lineChartLabels = this.lineChart[0]["labels"];
    this.lineChartOptions = this.lineChart[0]["options"];
    this.lineChartLegend = this.lineChart[0]["legend"];
    this.lineChartType = this.lineChart[0]["type"];
    this.lineChartDataSet = this.lineChart[0]["datasets"];

    for(let i = 0; i < this.lineChartDataSet.length; i++) {
      this.lineChartData.push({
        data: this.lineChartDataSet[i]["data"],
        label: this.lineChartDataSet[i]["label"]
      });
      this.lineChartColours.push({
        backgroundColor: this.lineChartDataSet[i]["backgroundColor"],
        borderColor: this.lineChartDataSet[i]["borderColor"],
        pointBackgroundColor: this.lineChartDataSet[i]["pointBackgroundColor"],
        pointBorderColor: this.lineChartDataSet[i]["pointBorderColor"],
        pointHoverBackgroundColor: this.lineChartDataSet[i]["pointHoverBackgroundColor"],
        pointHoverBorderColor: this.lineChartDataSet[i]["pointHoverBorderColor"]
      });
    }
    this.dataLoaded = true;
  }
}
