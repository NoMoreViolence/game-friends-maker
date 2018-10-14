import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', pathMatch: 'full' },
  // { path: '', component: ComponentName, pathMatch: 'full' },
  { path: '**', redirectTo: '/error/404', pathMatch: 'full' } // Wrong url redirect
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
