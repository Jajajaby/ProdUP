import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";

// Interfaces
import { Ajustes } from '../../interfaces/ajustes.interface';

@Injectable({
   providedIn: "root"
})
export class SettingsService {
   
   ajustes:Ajustes = {
      temaUrl: 'assets/css/colors/default.css',
      tema: 'default'
   };

   constructor( @Inject(DOCUMENT) private _document ){
      this.cargarAjustes();
   }
   
   // Guardo en el localstorage para hacer persistente las configuraciones de forma local
   guardarAjustes(){
      // de objeto a JSON valido.
      localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
      console.log('Ajustes guardados en el Local Storage');
   }

   // Carga los ajustes desde el localstorage
   cargarAjustes(){
      if( localStorage.getItem('ajustes') ){
         // de JSON valido a un objeto Javascript.
         this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
         this.aplicarTema(this.ajustes.tema); // Aplico el tema personalizado
      }else {
         this.aplicarTema(this.ajustes.tema); // Aplico el tema por defecto
      }
   }
   
   // Aplica el tema seleccionado por el usuario
   aplicarTema( tema:string ){
      let url = `assets/css/colors/${tema}.css`;
      this._document.getElementById("tema").setAttribute("href", url);
      this.ajustes.tema = tema;
      this.ajustes.temaUrl = url;
      this.guardarAjustes();
   }
}
