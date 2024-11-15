import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authInverseGuard } from './core/guards/auth-inverse.guard';
import {HomeComponent} from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((a) => a.authroutes),
    canActivate: [authInverseGuard],
  },

  {
    path: 'reader',
    loadChildren: () =>
      import('./pages/reader/reader.routes').then((r) => r.readerroutes),
    canActivate: [authGuard],
  },

  {
    path: 'creator',
    loadChildren: () =>
      import('./pages/creator/creator.routes').then((r) => r.creatorroutes),
    canActivate: [authGuard],
  },
];
