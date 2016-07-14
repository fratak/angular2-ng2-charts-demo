import { Charts } from './charts.component';
import { LineChartDemoComponent } from './lineChart.component';
import { BarChartDemoComponent } from './barChart.component';
import { RadarChartDemoComponent } from './radarChart.component';
import { DoughnutChartDemoComponent } from './doughnutChart.component';
import { PieChartDemoComponent } from './pieChart.component';
import { PolarAreaChartDemoComponent } from './polarAreaChart.component';
//import { Index } from './index.component';

// async components must be named routes for WebpackAsyncRoute
export const routes = {
  path: 'charts', component: Charts,
  children: [
    { path: '', component: LineChartDemoComponent },
    { path: 'barChart', component: BarChartDemoComponent },
    { path: 'radarChart', component: RadarChartDemoComponent },
    { path: 'doughnutChart', component: DoughnutChartDemoComponent },
    { path: 'pieChart', component: PieChartDemoComponent },
    { path: 'polarAreaChart', component: PolarAreaChartDemoComponent }
  ]
};
