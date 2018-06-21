import { Component, OnInit } from "@angular/core";

@Component({
   selector: "app-graficas1",
   templateUrl: "./graficas1.component.html",
   styles: []
})
export class Graficas1Component implements OnInit {

   graficos: any = {
      'grafico1': {
        'labels': ['Cerca', 'Normal', 'Lejos'],
        'data':  [24, 30, 46],
        'type': 'doughnut',
        'leyenda': 'Casco 1 --> Proximidad'
      },
      'grafico2': {
        'labels': ['Cerca', 'Normal', 'Lejos'],
        'data':  [12, 6, 7],
        'type': 'doughnut',
        'leyenda': 'Casco 2 --> Proximidad'
      },
      'grafico3': {
        'labels': ['Cerca', 'Normal', 'Lejos'],
        'data':  [32, 5, 21],
        'type': 'doughnut',
        'leyenda': 'Casco 3 --> Proximidad'
      }
   };
   
   constructor() {}

   ngOnInit() {}
}
