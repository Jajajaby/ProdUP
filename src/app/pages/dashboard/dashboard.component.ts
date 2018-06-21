import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  
  
  cascosRef: AngularFireList<any>;
  cascos: Observable<any[]>;

  cascosArray:any[] = [];

  constructor( private db: AngularFireDatabase ){
    
    this.cascosRef = this.db.list('construcciones/construccion-1/cascos/');
    this.cascos = this.cascosRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    
    this.cascos.subscribe( (data:any) => {
      
      this.cascosArray = [];
      
      for( let casco of data ){
        this.cascosArray.push( casco.parametros );
      }
      //console.log(this.cascosArray);

      // let intervalo = setInterval( () => {

      //   for( let c of data ){  
        
      //     let hoy = this.fecha_actual();
          
      //     // Actualizo a la fecha de hoy
      //     if( c.parametros.fecha_actual !== hoy ){
      //       const refParametros = this.db.list(`construcciones/construccion-1/cascos/${c.key}`);
      //       refParametros.update('parametros', {
      //         fecha_actual: hoy,
      //         bateria: c.parametros.bateria,
      //         conexion: c.parametros.conexion,
      //         estado: c.parametros.estado,
      //         nombre: c.parametros.nombre,
      //         proximidad: c.parametros.proximidad,
      //         trabajador: c.parametros.trabajador 
      //       });
  
      //       // Creo el nodo historial de la fecha de hoy
      //       const refHistorial = this.db.list(`construcciones/construccion-1/cascos/${c.key}/historial/${hoy}`);
      //       refHistorial.push({
      //         cerca: 0,
      //         normal: 0,
      //         lejos: 0
      //       });
      //       clearInterval(intervalo); // cancelo el intervalo de este momento
      //     }
          
      //     this.db.list(`construcciones/construccion-1/cascos/${c.key}/historial/${hoy}`).snapshotChanges()
      //             .subscribe( data => {
      //               // if( c.parametros.proximidad <= 20 ) {
      //               //   console.log(c.parametros.nombre);
                      
      //               //   console.log(`${c.parametros.nombre} esta Cerca`);
      //               // }else if( c.parametros.proximidad >= 21 && c.parametros.proximidad < 100 ) {
      //               //   console.log(`${c.parametros.nombre} esta Normal`);
      //               // }else {
      //               //   console.log(`${c.parametros.nombre} esta Lejos`);
      //               //   let obj;
      //               //   for(let i in c.historial){
      //               //     if( i === hoy){
      //               //       for(let j in c.historial[i]){
      //               //         let url = `construcciones/construccion-1/cascos/${c.key}/historial/${hoy}`;
                            
      //               //         const refHistorial = this.db.list(url);
      //               //         refHistorial.update(data[0].key, {
      //               //           cerca: c.historial[i][j].cerca,
      //               //           normal: c.historial[i][j].normal,
      //               //           lejos: c.historial[i][j].lejos +1
      //               //         });
                           
      //               //       }
                          
      //               //       break;
      //               //     }
      //               //   }
                      
      //               // }
      //             });
  
            
      //     }
        
      // }, 10000 ); // 3 minutos = 180000

      
    });
    
    
  }

  

  ngOnInit() {
  }

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
