import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// Servicios
import { SettingsService, AuthService, DatabaseService, SharedService } from './services/service.index';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   
   //redirect:boolean; // Variable logica para ver si nos redirige al login o al dashboard
	hoy:string; // Guarda la fecha de hoy
	rutaCascos = 'construcciones/construccion-1/cascos'; // ruta generica de los cascos en firebase

	constructor( public _settings: SettingsService, private _auth: AuthService,
					 private _db: DatabaseService, private _shared: SharedService ){
		// // Ver si mostramos el login o el dashboard
		// this._auth.afAuth.authState
		// 		.subscribe( user => {
    	// 		if( user !== null ){ // muestra las paginas (usuario loggeado)
      //     	setTimeout( () => {
      //       	this.redirect = true;
      //       }, 500);
      //    	}else{ // muestra el login
      //       setTimeout( () => {
      //         this.redirect = false;
      //     	}, 500);
      //     }
		// 		});
   }


	// Al cargar la pagina comenzamos a generar el historial
	ngOnInit(){
  	// Historial
    this._db.getData( this.rutaCascos )
    		.subscribe( data => {
      		let intervalo = setInterval( () => { // intervalo de 3 minutos para ir actualizando la base de datos
	        	this.hoy = this._shared.fecha_actual(); // asigno la fecha de hoy
	
	        	for( let casco of data ){
	          	this.verificaFecha( casco, intervalo ); // metodo que cambia la fecha y genera los nuevos nodos de cada fecha
	          	this.generarHistorial( casco ); // metodo que genera el historial
	          	clearInterval( intervalo ); // cancelo el intervalo de este momento
	        	}
      		}, 60000) // 3 min = 180000
    		});
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
}
