import { Injectable } from '@angular/core';

// Interfaces
import { Auth } from '../../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {

  constructor() { }
  

  // Guardamos los datos del usuario en el localstorage
  guardarUsuario( auth: Auth ){
    localStorage.setItem('auth', JSON.stringify( auth ));
  }

  // Cargamos los datos del usuario desde el localstorage
  cargarUsuario():Auth {
    if( localStorage.getItem('auth') ){
       return JSON.parse( localStorage.getItem('auth') );
    }
  }

}
