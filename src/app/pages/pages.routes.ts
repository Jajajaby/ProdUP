import { RouterModule, Routes } from '@angular/router';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const PagesRoute: Routes = [
   { 
      path: '',
      component: PagesComponent,
      children: [
         { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
         { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas 1'} },
         { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de usuario'} },
         { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
      ] 
   }
];

export const PAGES_ROUTES = RouterModule.forChild(PagesRoute);