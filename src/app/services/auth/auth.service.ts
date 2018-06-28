import { Injectable } from '@angular/core';

// Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

// Interfaces
import { Login } from '../../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User; // el usuario que nos trae firebase

  constructor( public afAuth: AngularFireAuth ) {
    this.afAuth.authState.subscribe( (user: User)=>{
      this.user = user;
   });
  }

  // Verifica si esta auntenticado
  get authenticated():boolean {
    return this.user != null;
  }
  
  // Inicio de sesion
  login( user:Login ): Promise<any>{
    return this.afAuth.auth.signInWithEmailAndPassword( user.email, user.password );
  }

  // Cierre de sesion
  logout(): Promise<any>{
    return this.afAuth.auth.signOut();
 }
}
