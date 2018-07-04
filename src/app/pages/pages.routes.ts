import { RouterModule, Routes } from '@angular/router';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Servicios
import { AuthGuardService } from '../services/service.index';

const PagesRoute: Routes = [
   { 
      path: '',
      component: PagesComponent,
      canActivate: [AuthGuardService],
      children: [
         { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
         { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'} },
         { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de usuario'} },
         { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
      ] 
   }
];

export const PAGES_ROUTES = RouterModule.forChild(PagesRoute);