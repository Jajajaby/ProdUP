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

  getData( ref:string ):Observable<any> {
    return this.db.list( ref ).snapshotChanges().pipe(
      map( resp => resp.map(c => ({key: c.payload.key, ...c.payload.val()}) ) )
    );
  }
}
