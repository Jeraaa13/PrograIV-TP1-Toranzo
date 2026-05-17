import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario';
import { Mensaje } from '../interfaces/mensaje';
import { AhorcadoData } from '../interfaces/ahorcado-data';
import { MayoromenorData } from '../interfaces/mayoromenor-data';
import { PreguntadosData } from '../interfaces/preguntados-data';
import { GuitarheroData } from '../interfaces/guitarhero-data';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  public supabase: SupabaseClient;

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
        }
      });
  }

  saveMensajeData(mensaje: Mensaje) {
    return this.supabase
      .from('chat')
      .insert([
        {
          idUsuario: mensaje.idUsuario,
          mensaje: mensaje.mensaje,
        },
      ])
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al guardar el mensaje', error);
        }
      });
  }

  traerMensajeData() {
    return this.supabase
      .from('chat')
      .select('*')
      .order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al traer mensajes del chat', error);
        }
        return data;
      });
  }

  saveAhorcadoData(ahorcadoData: AhorcadoData) {
    return this.supabase
      .from('partidas_ahorcado')
      .insert([
        {
          idUsuario: ahorcadoData.idUsuario,
          palabra: ahorcadoData.palabra,
          letrasUsadas: ahorcadoData.letrasUsadas,
          gano: ahorcadoData.gano,
          tiempoSegundos: ahorcadoData.tiempoSegundos,
          errores: ahorcadoData.errores,
          puntaje: ahorcadoData.puntaje,
        },
      ])
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al guardar datos ahorcado', error);
        }
      });
  }

  saveMayorOMenorData(mayoromenorData: MayoromenorData) {
    return this.supabase
      .from('partidas_mayoromenor')
      .insert([
        {
          idUsuario: mayoromenorData.idUsuario,
          puntaje: mayoromenorData.puntaje,
          gano: mayoromenorData.gano,
          tiempoSegundos: mayoromenorData.tiempoSegundos,
        },
      ])
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al guardar datos ahorcado', error);
        }
      });
  }

  savePreguntadosData(preguntadosData: PreguntadosData) {
    return this.supabase
      .from('partidas_preguntados')
      .insert([
        {
          idUsuario: preguntadosData.idUsuario,
          puntaje: preguntadosData.puntaje,
          tiempoSegundos: preguntadosData.tiempoSegundos,
          gano: preguntadosData.gano,
        },
      ])
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al guardar datos ahorcado', error);
        }
      });
  }

  saveGuitarHeroData(guitarheroData: GuitarheroData) {
    return this.supabase
      .from('partidas_guitarhero')
      .insert([
        {
          idUsuario: guitarheroData.idUsuario,
          puntaje: guitarheroData.puntaje,
          gano: guitarheroData.gano,
          tiempo: guitarheroData.tiempo,
          notasAcertadas: guitarheroData.notasAcertadas,
          notasErradas: guitarheroData.notasErradas,
        },
      ])
      .then(({ data, error }) => {
        if (error) {
          console.error('Error al guardar datos Guitar Hero', error);
        }
      });
  }

  async traerAhorcadoData(): Promise<AhorcadoData[]> {
    const { data, error } = await this.supabase
      .from('partidas_ahorcado')
      .select('*')
      .limit(10)
      .order('puntaje', { ascending: false });

    if (error) {
      console.error('Error al traer datos', error);
      return [];
    }
    return data ?? [];
  }
  async traerMayorOMenorData(): Promise<MayoromenorData[]> {
    const { data, error } = await this.supabase
      .from('partidas_mayoromenor')
      .select('*')
      .limit(10)
      .order('puntaje', { ascending: false });

    if (error) {
      console.error('Error al traer datos', error);
      return [];
    }
    return data ?? [];
  }

  async traerPreguntadosData(): Promise<PreguntadosData[]> {
    const { data, error } = await this.supabase
      .from('partidas_preguntados')
      .select('*')
      .limit(10)
      .order('puntaje', { ascending: false });

    if (error) {
      console.error('Error al traer datos', error);
      return [];
    }
    return data ?? [];
  }
  async traerGuitarHeroData(): Promise<GuitarheroData[]> {
    const { data, error } = await this.supabase
      .from('partidas_guitarhero')
      .select('*')
      .limit(10)
      .order('puntaje', { ascending: false });

    if (error) {
      console.error('Error al traer datos', error);
      return [];
    }
    return data ?? [];
  }
}
