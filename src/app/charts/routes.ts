import { Charts } from './charts.component';
import { LineChartDemoComponent } from './lineChart.component';
import { BarChartDemoComponent } from './barChart.component';
//import { Index } from './index.component';

// async components must be named routes for WebpackAsyncRoute
export const routes = {
  path: 'charts', component: Charts,
  children: [
    { path: '', component: LineChartDemoComponent },
    { path: 'barChart', component: BarChartDemoComponent }
  ]
};
