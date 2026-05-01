import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  imports: [],
  templateUrl: './bienvenido.html',
  styleUrl: './bienvenido.css',
})
export class Bienvenido {
  private router = inject(Router);

  ingresarJuego(juego: number) {
    switch (juego) {
      case 1:
        this.router.navigate(['/ahorcado']);
        break;
      case 2:
        this.router.navigate(['/mayoromenor']);
        break;
      case 3:
        this.router.navigate(['/preguntados']);
        break;
      default:
        this.router.navigate(['/guitarhero']);
        break;
    }
  }
}
