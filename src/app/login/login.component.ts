import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, FormControlName} from "@angular/forms";

// Interfaces
import { Login } from '../interfaces/login.interface';

// Servicios
import { AuthService, AuthStorageService } from '../services/service.index';
import { Auth } from "../interfaces/auth.interface";

// Plugins
import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  forma: FormGroup; // formulario del login
  user: Login; // el usuario que mandaremos a firebase para el inicio de sesion

  errorEmail: string; // mensaje de error que se mostrara en email
  errorPassword: string; // mensaje de error que se mostrara en la password

  userFalse = {} as Auth;

  constructor( public router: Router , private _auth: AuthService, private _authStorage: AuthStorageService ) {
    
    this.forma = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  
    // En caso de ya estar loggeado sera redireccionado al dashboard
    if( this._authStorage.cargarUsuario().login ){
      this.router.navigate(['/dashboard']);
      console.warn('Usuario ya autenticado');
    }

  }

  ngOnInit() {
    init_plugins();
  }

  // Metodo que hace el login
  ingresar() {
    // Validamos que el formulario sea valido
    if( this.validarLogin(this.forma) ){
      this.user = this.forma.value; // asignamos el usuario a user
      
      this._auth.login( this.user )
          .then( () => { // si el inicio de sesión salio correctamente
            this._auth.afAuth.authState.subscribe( user => {
              if( user !== null ){
                this._authStorage.guardarUsuario({ // guardamos la informacion en el localstorage
                  uid: user.uid,
                  email: user.email,
                  emailVerified: user.emailVerified,
                  creationTime: user.metadata.creationTime,
                  lastSignInTime: user.metadata.lastSignInTime,
                  login: true
                });
              }else{ // si no encuentra el usuario lo vuelve a poner null
                this.userFalse.login = false;
                this._authStorage.guardarUsuario(this.userFalse);
              }

              swal("Bienvenido", this.user.email, "success", { timer: 2000 }); // Alerta de inicio de sesion
              setTimeout( () => { this.router.navigate(['/dashboard']); }, 2000); // nos vamos a la pagina del dashboard
               
            });
          })
          .catch( err => { // si el inicio de sesion fallo
            swal("Usuario o contraseña incorrectos", "Por favor vuelta a intentarlo", "error", { timer: 2000 }); // Alerta de inicio de sesion
            this.userFalse.login = false;
            this._authStorage.guardarUsuario(this.userFalse);
          });
    }
  }
  
  // Valida el email y la password si uno de estos contiene algun error
  // retornara un falso, de no ser así retorna verdadero y el form es valido
  validarLogin(forma: FormGroup):boolean {
    let validador = true;

    // Validando los errores del email
    if (this.forma.controls["email"].errors !== null) {
      // si el email no se ingreso
      if (this.forma.controls["email"].errors.required) {
        this.errorEmail = "El correo es requerido";
        validador = false;
      }
      // si el email no conincide con el pattern
      if (this.forma.controls["email"].errors.pattern) {
        this.errorEmail = "Correo no válido";
        validador = false;
      }
    }

    // Validando los errores de la password
    if (this.forma.controls["password"].errors !== null) {
      // si la password no se ingreso
      if (this.forma.controls["password"].errors.required) {
        this.errorPassword = "La contraseña es requerida";
        validador = false;
      }
      // si la password no contiene el minimo de caracteres
      if (this.forma.controls["password"].errors.minlength) {
        this.errorPassword = "La contraseña debe tener minimo 8 caracteres";
        validador = false;
      }
    }
    return validador;
  }



}
