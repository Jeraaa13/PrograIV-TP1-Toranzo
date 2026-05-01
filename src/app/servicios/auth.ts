import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { signal } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Session } from '@supabase/supabase-js';
@Injectable({
  providedIn: 'root',
})
export class Auth {
  autenticado = signal<boolean>(false);
  usuario = signal<Usuario | null>(null);
  private supabaseService = inject(SupabaseService);
  private router = inject(Router);

  constructor() {
    this.supabaseService.supabase.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        this.autenticado.set(false);
      } else {
        this.autenticado.set(true);
        setTimeout(async () => {
          this.usuario.set(await this.getUserData(session));
        }, 0);
      }
    });
  }

  register(mail: string, clave: string, nombre: string, apellido: string, edad: number) {
    return this.supabaseService.supabase.auth
      .signUp({ email: mail, password: clave })
      .then(({ data, error }) => {
        if (error) {
          Swal.fire({
            title: 'Algo salio mal!',
            text: error.message,
            icon: 'error',
          });
        } else {
          this.supabaseService.saveUserData({
            id: data.user?.id!,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            mail: mail,
          });
          this.router.navigate(['/bienvenida']);
        }
      });
  }

  login(mail: string, clave: string) {
    return this.supabaseService.supabase.auth
      .signInWithPassword({
        email: mail,
        password: clave,
      })
      .then(({ data, error }) => {
        if (error) {
          console.log('error');
          Swal.fire({
            title: 'Algo salio mal!',
            text: error.message,
            icon: 'error',
          });
        } else {
          console.log('bienvenida');
          this.router.navigate(['/bienvenida']);
        }
      });
  }

  isAuthenticated() {
    return this.supabaseService.supabase.auth.getUser().then(({ data, error }) => {
      if (data.user == null) {
        return false;
      } else {
        return true;
      }
    });
  }

  async estaLogueado() {
    const { data } = await this.supabaseService.supabase.auth.getSession();
    return data.session !== null;
  }

  async getUserData(session: Session): Promise<Usuario | null> {
    const { data, error } = await this.supabaseService.supabase
      .from('usuarios')
      .select('*')
      .eq('id', session.user.id)
      .single();
    return data;
  }

  cerrarSesion() {
    return this.supabaseService.supabase.auth.signOut();
  }

  getUser() {
    return this.supabaseService.supabase.auth.getUser();
  }
}
