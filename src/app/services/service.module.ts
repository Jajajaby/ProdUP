import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Servicios
import { 
  SettingsService, 
  SharedService, 
  SidebarService,
  DatabaseService
} from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    DatabaseService
  ],
  declarations: []
})
export class ServiceModule { }
