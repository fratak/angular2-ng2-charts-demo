import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import { Observable }     from 'rxjs/Rx';
import {CHART_DIRECTIVES} from 'ng2-charts';
import {ChartService} from './chart.service';

// webpack html imports
let template = require('./radarChart.component.html');

@Component({
  selector: 'radar-chart-demo',
  template: template,
  styleUrls: ['./charts.css'],
  providers: [ChartService],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class RadarChartDemoComponent {
  // Radar
  private radarChart: any;

  private radarChartLabels: Array<any>;
  private radarChartData: Array<any> = [];
  private radarChartOptions: any;
  private radarChartLegend: boolean;
  private radarChartType: string;
  private radarChartColours: Array<any> = [];

  private radarChartDataSet: Array<any>;//auxiliar
  private dataLoaded: boolean = false;

  constructor(private radarChartService: ChartService) { }

  ngOnInit() {
    console.log('hello `RadarChart` component');
    this.getRadarChart();
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  private getRadarChart() {
    this.radarChartService.getChart("app/charts/radar-chart-data.json").subscribe(
      data => this.radarChart = data,
      err => console.log("Http Request error: " + err),
      () => this.splitChartData()
    );
  }

  private splitChartData() {
    this.radarChartLabels = this.radarChart[0]["labels"];
    this.radarChartOptions = this.radarChart[0]["options"];
    this.radarChartLegend = this.radarChart[0]["legend"];
    this.radarChartType = this.radarChart[0]["type"];
    this.radarChartDataSet = this.radarChart[0]["datasets"];

    for(let i = 0; i < this.radarChartDataSet.length; i++) {
      this.radarChartData.push({
        data: this.radarChartDataSet[i]["data"],
        label: this.radarChartDataSet[i]["label"]
      });
      this.radarChartColours.push({
        backgroundColor: this.radarChartDataSet[i]["backgroundColor"],
        borderColor: this.radarChartDataSet[i]["borderColor"],
        pointBackgroundColor: this.radarChartDataSet[i]["pointBackgroundColor"],
        pointBorderColor: this.radarChartDataSet[i]["pointBorderColor"],
        pointHoverBorderColor: this.radarChartDataSet[i]["pointHoverBorderColor"],
        pointHoverBackgroundColor: this.radarChartDataSet[i]["pointHoverBackgroundColor"]
      });
    }
    this.dataLoaded = true;
  }
}
