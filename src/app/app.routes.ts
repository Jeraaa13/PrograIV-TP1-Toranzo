import { Routes } from '@angular/router';
import { Bienvenido } from './componentes/bienvenido/bienvenido';
import { Login } from './componentes/login/login';
import { Error } from './componentes/error/error';
import { Registro } from './componentes/registro/registro';
import { Quiensoy } from './componentes/quien-soy/quien-soy';
import { authGuard } from './guardias/logeado-guard.ts-guard';
import { Guitarhero } from './componentes/guitarhero/guitarhero';
import { Preguntados } from './componentes/preguntados/preguntados';
import { Mayoromenor } from './componentes/mayoromenor/mayoromenor';
import { Ahorcado } from './componentes/ahorcado/ahorcado';

export const routes: Routes = [
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' },
  { path: 'bienvenida', component: Bienvenido },
  { path: 'ahorcado', component: Ahorcado, canActivate: [authGuard] },
  { path: 'mayoromenor', component: Mayoromenor, canActivate: [authGuard] },
  { path: 'preguntados', component: Preguntados, canActivate: [authGuard] },
  { path: 'guitarhero', component: Guitarhero, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'quiensoy', component: Quiensoy },
  { path: 'error', component: Error },
  { path: '**', component: Error },
];
