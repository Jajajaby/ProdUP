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
  hoy:string; // fecha actual
  rutaCascos = 'construcciones/construccion-1/cascos'; // ruta generica de los cascos en firebase

  // Declaro estas variables para asignarlas a los observables
  // y asi cuando se destruya la pagina estos se cancelen
  subscribeCascos: Subscription;
  subscribeHistorial: Subscription;

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

    // Historial
    this.subscribeHistorial = this._db.getData( this.rutaCascos )
        .subscribe( data => {
          let intervalo = setInterval( () => { // intervalo de 3 minutos para ir actualizando la base de datos
            this.hoy = this.fecha_actual(); // asigno la fecha de hoy
    
            for( let casco of data ){
              this.verificaFecha( casco, intervalo ); // metodo que cambia la fecha y genera los nuevos nodos de cada fecha
              this.generarHistorial( casco ); // metodo que genera el historial
              clearInterval( intervalo ); // cancelo el intervalo de este momento
            }
          }, 180000) // 3 min = 180000
        });
  }

  // Funcion que se activa al momento de destruir la pagina (cerrarla, cambiarse, etc).
  // la utilizo para dejar de hacerle seguimiento a los cascos que se mostraran en pantalla
  // pero seguire revisando el historial
  ngOnDestroy(){
    this.subscribeCascos.unsubscribe(); // le digo chao al observable de los cascos!!
  }

  // Verifica la fecha actual y la compara con la de la base de datos
  // Para actualizarla e ir creando nuevos nodos de historiales diarios
  // Si entra en la unica condicion cancela el intervalo para evitar problemas
  verificaFecha( casco:any, intervalo:any ):void{
    // Verifico si la fecha actual es igual a la del dia de hoy
    if( casco.parametros.fecha_actual !== this.hoy ){
            
      let parametros = casco.parametros; // igualo el objeto traido desde firebase al creado local.
      parametros.fecha_actual = this.hoy; // cambio el valor de fecha_actual a la fecha actual

      // Cambio la fecha actual del nodo parametros
      this._db.update('parametros', `construcciones/construccion-1/cascos/${ casco.key }`, parametros );

      // Creo el nodo historial de la fecha de hoy
      let historialDefault = { cerca: 0, normal: 0, lejos: 0 };
      let ruta = `construcciones/construccion-1/cascos/${ casco.key }/historial`
      this._db.postKey(ruta, historialDefault, this.hoy);
      clearInterval( intervalo ); // cancelo el intervalo de este momento
    }
  }

  // Guardo el historial de la fecha actual este se guarda el estado actual del casco
  generarHistorial( casco:any ){
    let rutaHistorial = `${ this.rutaCascos }/${ casco.key }/historial/`; // ruta del historial
    
    // Si esta cerca y no esta apagado entrara a esta condicion y actualizara el historial
    if( casco.parametros.proximidad <= 20 && casco.parametros.estado !== "OFF" ){
      let historial = casco.historial[this.hoy]; // obtengo la data del historial
      setTimeout( () => { // le doy 0.5s de desface para asegurarme de obtener el registro de la base de datos
        historial.cerca += 1 // le sumo 1 al registro cerca del historial en la base de datos
        this._db.update( this.hoy, rutaHistorial, historial); // actualizo hacia la base de datos
      }, 500);
    
    // Si esta normal y no esta apagado entrara a esta condicion y actualizara el historial
    }else if( (casco.parametros.proximidad >= 21 && casco.parametros.proximidad < 100) && casco.parametros.estado !== "OFF" ){
      let historial = casco.historial[this.hoy]; // obtengo la data del historial
      setTimeout( () => { // le doy 0.5s de desface para asegurarme de obtener el registro de la base de datos
        historial.normal += 1 // le sumo 1 al registro normal del historial en la base de datos
        this._db.update( this.hoy, rutaHistorial, historial); // actualizo hacia la base de datos
      }, 500);
    
    // Si esta lejos y no esta apagado entrara a esta condicion y actualizara el historial
    }else if( casco.parametros.proximidad >= 100 && casco.parametros.estado !== "OFF"){
      let historial = casco.historial[this.hoy]; // obtengo la data del historial
      setTimeout( () => { // le doy 0.5s de desface para asegurarme de obtener el registro de la base de datos
        historial.lejos += 1 // le sumo 1 al registro lejos del historial en la base de datos
        this._db.update( this.hoy, rutaHistorial, historial); // actualizo hacia la base de datos
      }, 500);
    }
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
