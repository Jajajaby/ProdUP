import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-graficos-dona',
   templateUrl: './graficos-dona.component.html',
   styles: []
})
export class GraficosDonaComponent implements OnInit {
   
   @Input('chartLabels') doughnutChartLabels:string[] = [];
   @Input('chartData') doughnutChartData:number[] = [];
   @Input('chartType') doughnutChartType:string = '';

   constructor(){}

   ngOnInit() {
   }

}
