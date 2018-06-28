import { Component, OnInit } from '@angular/core';

// Servicios
import { SettingsService, AuthService } from './services/service.index';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   
   redirect:boolean;

   constructor( public _settings: SettingsService, private _auth: AuthService  ){}

   ngOnInit(){
      this._auth.afAuth.authState.subscribe( user => {
         if( user !== null ){ // muestra las paginas (usuario loggeado)
            setTimeout( () => {
               this.redirect = true;
            }, 500);
         }else{ // muestra el login
            setTimeout( () => {
               this.redirect = false;
            }, 500);
         }
      });
   }

}
