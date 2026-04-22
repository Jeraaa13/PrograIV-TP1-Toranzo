import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  mail = signal<string>('');
  clave = signal<string>('');

  constructor(private router: Router) { }

  login() {
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') ?? '[]');
    const encontrado = usuarios.find((u: Usuario) => u.mail === this.mail() && u.clave === this.clave());

    if (encontrado) {
      this.router.navigate(['/bienvenida']);
    } else {
      this.router.navigate(['/error']);
    }
  }
}
