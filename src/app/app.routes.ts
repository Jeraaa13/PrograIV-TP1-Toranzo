import { Routes } from '@angular/router';
import { Bienvenido } from './componentes/bienvenido/bienvenido';
import { Login } from './componentes/login/login';
import { Error } from './componentes/error/error';
import { Calculadora } from './componentes/calculadora/calculadora';
import { Registro } from './componentes/registro/registro';

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
        path: 'error',
        component: Error
    },
    {
        path: 'calculadora',
        component: Calculadora
    },
    {
        path: '**',
        component: Error
    },
];