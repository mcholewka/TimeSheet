import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import {ChartService} from "../../../_services/charts/chart.service";
import {GetBarChartDataModel} from "../../../_models/charts/getBarChartData.model";
import {GetBarChartDataListModel} from "../../../_models/charts/getBarChartDataList.model";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Total hours' }
  ];

  barChart: GetBarChartDataModel[];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(public chartService: ChartService) { }

  ngOnInit(): void {
    this.getBarChartData();
  }

  getBarChartData() {
    this.chartService.getBarChartData<GetBarChartDataModel[]>().subscribe(responseData => {
      console.log(responseData);
      this.barChartLabels = [];
      this.barChartData[0].data = [];
      this.barChart = responseData;
      this.barChart.forEach(element => {
        this.barChartLabels.push(this.months[element._id.month-1] + " " + element._id.year);
        this.barChartData[0].data.push(element.total);
      });
    });
  }
}
