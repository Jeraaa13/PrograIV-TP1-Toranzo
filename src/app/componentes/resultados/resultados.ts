import { Component, inject, OnInit, signal } from '@angular/core';
import { TablaResultados } from '../tabla-resultados/tabla-resultados';
import { SupabaseService } from '../../servicios/supabase';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-resultados',
  imports: [TablaResultados],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css',
})
export class Resultados implements OnInit {
  supabaseService = inject(SupabaseService);
  authService = inject(Auth);
  datosAhorcado = signal<any[]>([]);
  datosMayorOMenor = signal<any[]>([]);
  datosPreguntados = signal<any[]>([]);
  datosGuitarHero = signal<any[]>([]);

  async ngOnInit() {
    const ahorcado = await this.supabaseService.traerAhorcadoData();
    const mayoromenor = await this.supabaseService.traerMayorOMenorData();
    const preguntados = await this.supabaseService.traerPreguntadosData();
    const guitarhero = await this.supabaseService.traerGuitarHeroData();
    this.datosAhorcado.set(await this.enriquecer(ahorcado));
    this.datosMayorOMenor.set(await this.enriquecer(mayoromenor));
    this.datosPreguntados.set(await this.enriquecer(preguntados));
    this.datosGuitarHero.set(await this.enriquecer(guitarhero));
  }

  async enriquecer(partidas: any[]) {
    return Promise.all(
      partidas.map(async (p) => ({
        ...p,
        usuario: await this.traerUsuario(p.idUsuario),
      })),
    );
  }

  async traerUsuario(idUsuario: string | undefined) {
    if (!idUsuario) return 'Anónimo';
    const usuario = await this.authService.getUserDataById(idUsuario);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Anónimo';
  }
}
