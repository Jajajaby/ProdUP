import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Servicios
import { 
  SettingsService, 
  SharedService, 
  SidebarService,
  DatabaseService,
  AuthGuardService,
  AuthService,
  AuthStorageService
} from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    DatabaseService,
    AuthService,
    AuthGuardService,
    AuthStorageService
  ],
  declarations: []
})
export class ServiceModule { }
