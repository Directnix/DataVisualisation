import { Component, OnInit } from '@angular/core';
import { DataService, DataListener } from './data.service';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DataListener {
  title = 'charts';

  colors = [
    "#fdd835",
    "#e91e63",
    "#fff59d",
    "#f9a825",
    "#f57f17",
    "#ffff00",
    "#ffd600"
  ];

  data = [];

  /**
   * The linechart
   *
   * @memberof AppComponent
   */
  LineChart = [];


  /**
   * the live data chart
   *
   * @memberof AppComponent
   */
  LiveDataChart = []; 

  constructor(private dataService: DataService) {
    this.dataService.listener = this;
  }

  ngOnInit() {
    this.LineChart = new Chart('LineChart', {
      type: 'bar'
    });

    this.LiveDataChart = new Chart('LiveDataChart', {
      type: 'line',
      options: {
        animation: {
          duration: 0
        },
        scales: {
          yAxes: [{
            ticks: {
              max: 20,
              min: 0
            }
          }]
        }
      }
    });

    this.dataService.getData().subscribe((data) => {
      this.updateChart(this.LineChart, data,
        {
          fill: false
        }
      );
    });
  }

  updateChart(chart: Chart, data, options?) {
    chart.data.labels = data.labels;

    let datasets: [] = data.datasets;
    chart.data.datasets = datasets
      .map((e: any, i) => {
        let dataset: any = {
          label: e.label,
          data: e.data,
          borderColor: this.colors[i],
          backgroundColor: this.colors[i]
        }

        if (options)
          dataset = Object.assign(dataset, options);

        return dataset;
      });

    chart.update();
  }

  onData(data){
    this.data = this.data.slice(this.data.length - 25, this.data.length);
    this.data.push(data);

    const chartData = {
      labels: this.data,
      datasets: [{
        label: 'Live data',
        data: this.data
      }]
    };

    this.updateChart(this.LiveDataChart, chartData, {
      fill: false,
      radius: 0
    });
  }
}
