import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Modulos
import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Plugins
import { ChartsModule } from 'ng2-charts';

// Temporales
import { GraficosDonaComponent } from '../components/graficos-dona/graficos-dona.component';

@NgModule({
   declarations: [
      PagesComponent,
      DashboardComponent,
      Graficas1Component,
      GraficosDonaComponent,
      AccountSettingsComponent
   ],
   exports: [
      PagesComponent,
      DashboardComponent,
      Graficas1Component
   ],
   imports: [
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ChartsModule,
      CommonModule
   ]
})
export class PagesModule { }