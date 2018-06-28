import { Injectable } from '@angular/core';

// Plugins
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
    
  constructor( public db:AngularFireDatabase ) { }
  
  // Extrae y retorna un observable de una ruta en especifico desde firebase
  // obtiene toda la data incluyendo las key
  getData( ref:string ):Observable<any> {
    return this.db.list( ref ).snapshotChanges().pipe(
      map( resp => resp.map(c => ({key: c.payload.key, ...c.payload.val()}) ) )
    );
  }

  getDataValues( ref:string ):Observable<any>{
    return this.db.list(ref).valueChanges();
  }
  

  // actualiza un nodo completo hacia firebase
  update( $key:string, ruta:string, data:any ){
    let ref = this.db.list( ruta );
    ref.update($key, data);
  }


  // Sube un registro a firebase ( con una clave generada )
  post( ruta:string, data:any ){
    let ref = this.db.list( ruta );
    ref.push( data );
  }

  

  // Sube un registro a firebase ( con una clave personalizada )
  postKey( ruta:string, data:any, $key:string ){
    let ref = this.db.list( ruta );
    ref.set( $key, data );
  }
}
