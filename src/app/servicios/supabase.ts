import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Usuario } from '../clases/usuario';
import { Router, RouterLink } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  public supabase: SupabaseClient;
  private router = inject(Router);
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  saveUserData(user: Usuario) {
    return this.supabase
      .from('usuarios')
      .insert([
        {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          edad: user.edad,
          mail: user.mail,
        },
      ])
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al guardar el usuario', error);
        } else {
          this.router.navigate(['/login']);
        }
      });
  }
}
