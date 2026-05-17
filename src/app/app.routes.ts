import { Routes } from '@angular/router';
import { authGuard } from './guardias/logeado-guard.ts-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  {
    path: 'bienvenida',
    loadComponent: () => import('./componentes/bienvenido/bienvenido').then((m) => m.Bienvenido),
  },
  {
    path: 'ahorcado',
    loadComponent: () => import('./componentes/ahorcado/ahorcado').then((m) => m.Ahorcado),
    canActivate: [authGuard],
  },
  {
    path: 'mayoromenor',
    loadComponent: () => import('./componentes/mayoromenor/mayoromenor').then((m) => m.Mayoromenor),
    canActivate: [authGuard],
  },
  {
    path: 'preguntados',
    loadComponent: () => import('./componentes/preguntados/preguntados').then((m) => m.Preguntados),
    canActivate: [authGuard],
  },
  {
    path: 'guitarhero',
    loadComponent: () => import('./componentes/guitarhero/guitarhero').then((m) => m.Guitarhero),
    canActivate: [authGuard],
  },
  { path: 'login', loadComponent: () => import('./componentes/login/login').then((m) => m.Login) },
  {
    path: 'registro',
    loadComponent: () => import('./componentes/registro/registro').then((m) => m.Registro),
  },
  {
    path: 'quiensoy',
    loadComponent: () => import('./componentes/quien-soy/quien-soy').then((m) => m.Quiensoy),
  },
  {
    path: 'resultados',
    loadComponent: () => import('./componentes/resultados/resultados').then((m) => m.Resultados),
  },
  { path: 'error', loadComponent: () => import('./componentes/error/error').then((m) => m.Error) },
  { path: '**', loadComponent: () => import('./componentes/error/error').then((m) => m.Error) },
];
