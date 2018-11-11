import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ContentComponent } from './components/main/content/content.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SignComponent } from './components/sign/sign.component';
import { SigninComponent } from './components/sign/signin/signin.component';
import { SignupComponent } from './components/sign/signup/signup.component';
import { MyinfoComponent } from './components/myinfo/myinfo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: ContentComponent },
  {
    path: 'sign',
    component: SignComponent,
    children: [{ path: 'in', component: SigninComponent }, { path: 'up', component: SignupComponent }]
  },
  { path: 'myinfo', component: MyinfoComponent },
  { path: 'info', component: ContentComponent },
  { path: '**', component: NotfoundComponent } // Wrong url redirect
];

// Enable tracing is development mode only
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { enableTracing: false });
