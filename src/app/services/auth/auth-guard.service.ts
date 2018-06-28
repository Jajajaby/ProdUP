import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

// Servicios
import { AuthStorageService } from '../service.index';

// Interfaces
import { Auth } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  auth: Auth;

  constructor( private authStorage: AuthStorageService ) {
    this.auth = this.authStorage.cargarUsuario();
  }

  canActivate( next:ActivatedRouteSnapshot, state:RouterStateSnapshot ){
    if( this.auth.login ){
      console.log("Paso el guard");
      return true;
    }else{
      console.error("Bloqueado por el guard");
      return false;
    }
  }
}
