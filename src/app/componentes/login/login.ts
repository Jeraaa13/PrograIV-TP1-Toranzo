import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(Auth);
  mail = signal<string>('');
  clave = signal<string>('');

  login() {
    console.log('login');
    this.auth.login(this.mail(), this.clave());
  }

  accesoRapido(usuario: number) {
    switch (usuario) {
      case 1:
        this.mail.set('messi@mail.com');
        this.clave.set('Messi1+');
        break;
      case 2:
        this.mail.set('manu@dona.com');
        this.clave.set('Gino1+');
        break;
      default:
        this.mail.set('admin@admin.com');
        this.clave.set('Admin1+');
        break;
    }
  }
}
