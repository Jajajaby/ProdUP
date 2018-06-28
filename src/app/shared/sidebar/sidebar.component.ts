import { Component, OnInit } from '@angular/core';

// Servicios
import { SidebarService, AuthService, AuthStorageService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor( public _sidebar: SidebarService, private _auth: AuthService, private _authStorage: AuthStorageService ) { }

  ngOnInit() {
  }
  
  // Cierra la sesion del usuario
  logout(){
    this._auth.logout()
        .then( () => {
          console.log("Cierre de sesion exitoso");
          this._authStorage.guardarUsuario({ // guardamos la informacion en el localstorage
            uid: undefined,
            email: undefined,
            emailVerified: undefined,
            creationTime: undefined,
            lastSignInTime: undefined,
            login: false
          });
        })
        .catch( err => {
          console.log("Error al cerrar sesion", err);
        });
  }

}
