import { Component, Host } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../servicios/auth';
import { inject } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  dropdownAbierto = signal(false);
  authService = inject(Auth);

  cerrarSesion() {
    this.authService.cerrarSesion();
  }

  getUser() {
    console.log(this.authService.getUser());
  }

  toggleDropdown() {
    console.log('me active');
    this.dropdownAbierto.update((v) => !v);
  }
}
