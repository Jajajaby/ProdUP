import { Component, OnInit } from "@angular/core";

// Servicios
import { SettingsService } from '../../services/service.index';

@Component({
   selector: "app-account-settings",
   templateUrl: "./account-settings.component.html",
   styles: []
})
export class AccountSettingsComponent implements OnInit {
   
   constructor( public _settings: SettingsService ) {}
   
   ngOnInit(){
      this.colocarCheck();
   }
   
   // Cambia el color del tema
   cambiarColor(tema: string, link: any) {
      this._settings.aplicarTema(tema);
      this.aplicarCheck(link);
   }
   
   // Coloca el check y borra el anterior al seleccionar uno nuevo
   aplicarCheck(link: any) {
      let selectores: any = document.getElementsByClassName("selector");
      for (let ref of selectores) { ref.classList.remove('working'); }
      link.classList.add('working');
   }

   // Coloca el check al momento de cargar la página
   colocarCheck(){
      let selectores: any = document.getElementsByClassName("selector");
      let tema = this._settings.ajustes.tema;
      
      for (let ref of selectores){ 
         if( ref.getAttribute('data-theme') === tema ){
            ref.classList.add('working');
            break;
         }
      }
   }
   
}
