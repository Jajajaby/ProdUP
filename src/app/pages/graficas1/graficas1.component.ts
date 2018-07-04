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
  hoy:string; // fecha actual
  fecha:string; // fecha seleccionada
  fechasArray:string[]; // donde se guardan las key de las fechas
  historial:any[];
  loading:boolean = true;

  constructor( private _db: DatabaseService ){

    this.hoy = this.fecha_actual();
    this.obtenerFechas();
    
  }

  ngOnInit() {
    this.traerGraficos();
  }


  // hacemos referencia al casco 1 para sacar todas las fechas que estan en el historial
  obtenerFechas(){
    this._db.getData( `${this.rutaCascos}/casco-1/historial` )
          .subscribe( fechas => {
            this.fechasArray = [];
            for( let fecha of fechas ){
              this.fechasArray.push(fecha.key);
            }
            this.fecha = this.hoy;
          });
  }


  traerGraficos(){
    this._db.getData( this.rutaCascos )
            .subscribe( cascos => {
              let array = [];
              this.loading = true;
              for( let casco of cascos ){
                  
                this._db.getDataValues( `${ this.rutaCascos }/${ casco.key }/historial/${ this.fecha }` )
                      .subscribe(  data => {
                        let obj = { cerca: data[0], normal: data[1], lejos: data[2], nombre: casco.key };
                        array.push(obj);
                        this.historial = array;
                        console.log(this.historial);
                      }); 
                }
                this.loading = false;
            });
  }


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
