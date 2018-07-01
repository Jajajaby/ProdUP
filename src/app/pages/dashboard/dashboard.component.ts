import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Servicios
import { DatabaseService } from '../../services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnDestroy {
  
  loading:boolean; // mostrar o no mostrar el loading

  cascosArray:any[] = []; // arreglo en donde guardo los registros de firebase para mostrar en pantalla
  rutaCascos = 'construcciones/construccion-1/cascos'; // ruta generica de los cascos en firebase

  // Declaro estas variables para asignarlas a los observables
  // y asi cuando se destruya la pagina estos se cancelen
  subscribeCascos: Subscription;
  

  constructor( private _db: DatabaseService ){

    this.loading = true;
    
    // Trae los cascos que mostramos en pantalla
    this.subscribeCascos = this._db.getData( this.rutaCascos ).subscribe( data => {
      this.cascosArray = [];
      
      for( let casco of data ){
        this.cascosArray.push( casco.parametros );
      }
      this.loading = false;
    });

    
  }

  // Funcion que se activa al momento de destruir la pagina (cerrarla, cambiarse, etc).
  // la utilizo para dejar de hacerle seguimiento a los cascos que se mostraran en pantalla
  // pero seguire revisando el historial
  ngOnDestroy(){
    this.subscribeCascos.unsubscribe(); // le digo chao al observable de los cascos!!
  }
}
