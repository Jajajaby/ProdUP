import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

// Servicios
import { AuthStorageService } from '../service.index';

// Interfaces
import { Auth } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  auth: Auth;

  constructor( private _authStorage: AuthStorageService, public router: Router ) {
    this.auth = this._authStorage.cargarUsuario(); // cargamos el localstorage
    
    if( this.auth === undefined ) { // revisamos si existe la propiedad en el localstorage
      this._authStorage.guardarUsuario({ // si no existe la creamos con un login false
        uid: undefined,
        email: undefined,
        emailVerified: undefined,
        creationTime: undefined,
        lastSignInTime: undefined,
        login: false
      });
      this.auth = this._authStorage.cargarUsuario(); // volvemos a cargarla y la guardamos en auth
    }

  }

  canActivate():boolean{
    this.auth = this._authStorage.cargarUsuario(); // cargamos el localstorage
    if( this.auth.login ){ // si esta loggeado puede ingresar
      console.log("Paso el guard");
      return true;
    }else{ // no esta loggeado y es redireccionado al login
      console.error("Bloqueado por el guard");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
