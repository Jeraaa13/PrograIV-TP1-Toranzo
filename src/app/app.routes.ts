import { Routes } from '@angular/router';
import { Bienvenido } from './componentes/bienvenido/bienvenido';
import { Login } from './componentes/login/login';
import { Error } from './componentes/error/error';
import { Registro } from './componentes/registro/registro';
import { Quiensoy } from './componentes/quien-soy/quien-soy';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'bienvenida',
        pathMatch: 'full'
    },
    {
        path: 'bienvenida',
        component: Bienvenido
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'registro',
        component: Registro
    },
    {
        path: 'quiensoy',
        component: Quiensoy
    },
    {
        path: 'error',
        component: Error
    },

    {
        path: '**',
        component: Error
    },
]; 