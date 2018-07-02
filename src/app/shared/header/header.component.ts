import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { AuthService, AuthStorageService } from '../../services/service.index';

// Plugins
import swal from 'sweetalert';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor( private _auth: AuthService, private _authStorage: AuthStorageService, public router: Router ) { }

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
          swal('Cierre de sesión exitoso!', 'Hasta pronto', 'success', { timer: 2000 });
          setTimeout( () => { this.router.navigate(['/login']); }, 2000);
          
        })
        .catch( err => {
          console.log("Error al cerrar sesion", err);
          swal('Error al cerrar sesión', 'Por favor vuelta a interntarlo', 'error', { timer: 2000 });
        });
  }

}
