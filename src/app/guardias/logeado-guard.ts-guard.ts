import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../servicios/auth';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(Auth);

  if (await authService.estaLogueado()) {
    return true;
  }

  Swal.fire({
    title: 'No estás logueado',
    text: 'Tenés que iniciar sesión para entrar a los juegos',
    icon: 'warning',
  });
  return false;
};
