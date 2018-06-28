import { Component, OnInit } from "@angular/core";

// Servicios
import { DatabaseService } from '../../services/service.index';

@Component({
   selector: "app-graficas1",
   templateUrl: "./graficas1.component.html",
   styles: []
})
export class Graficas1Component implements OnInit {
  
  rutaCascos = 'construcciones/construccion-1/cascos'; // ruta generica de los cascos en firebase
  hoy:string;
  grafico = [];
   
  constructor( private _db: DatabaseService ){
    this.hoy = this.fecha_actual();

    this._db.getDataValues(`${ this.rutaCascos }/casco-1/historial/${ this.hoy }`)
          .subscribe( data => {
            this.grafico = data;
          });
  }

  ngOnInit() {}


   // Extrae y retorna la fecha actual con un formato correcto
  fecha_actual():string{
    let date = new Date();
    let dd, mm, hh, m;
    let dia = date.getDate(); let mes = (date.getMonth().valueOf() + 1); let anio = date.getFullYear();
    let hora = date.getHours(); let min = date.getMinutes();

    if( dia < 10 ) { dd = '0'+dia;  } else{ dd = dia;  }
    if( mes < 10 ) { mm = '0'+mes;  } else{ mm = mes;  }
    if( hora < 10 ){ hh = '0'+hora; } else{ hh = hora; }
    if( min < 10 ) { m  = '0'+min;  } else{ m  = min;  }

    return `${ dd }-${ mm }-${ anio }`;
  }
}
