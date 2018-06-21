import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styles: []
})
export class IncrementadorComponent{
   
   @ViewChild('txtProgress') txtProgress: ElementRef;

   @Input('titulo') leyenda: string = 'Leyenda';
   @Input() progreso: number = 50;

   @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

   constructor(){}

   onChanges( newValue: number ){
      
      if( newValue >= 100 ){
         this.progreso = 100;
      }else if( newValue <= 0 ){
         this.progreso = 0;
      }else{
         this.progreso = newValue;
      }
   
      this.txtProgress.nativeElement.value = this.progreso;
      this.cambioValor.emit( this.progreso );
   }

   cambiarValor(valor: number) {
      if (this.progreso >= 100 && valor > 0) {
         this.progreso = 100;
         return;
      } else if (this.progreso <= 0 && valor < 0) {
         this.progreso = 0;
         return;
      } else {
         this.progreso += valor;
         this.cambioValor.emit( this.progreso );
         this.txtProgress.nativeElement.focus();
      }
   }
}
