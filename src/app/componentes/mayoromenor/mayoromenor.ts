import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mazo } from '../../interfaces/mazo';
import { firstValueFrom } from 'rxjs';
import { Carta } from '../../interfaces/carta';
import { Draw } from '../../interfaces/draw';
import Swal from 'sweetalert2';
import { SupabaseService } from '../../servicios/supabase';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-mayoromenor',
  imports: [],
  templateUrl: './mayoromenor.html',
  styleUrl: './mayoromenor.css',
})
export class Mayoromenor implements OnInit {
  http = inject(HttpClient);
  supabaseService = inject(SupabaseService);
  authService = inject(Auth);
  cartaActual = signal<Carta | null>(null);
  cartaSiguiente = signal<Carta | null>(null);
  deck_id = signal<string | null>(null);
  VALORES: Record<string, number> = {
    ACE: 1,
    KING: 13,
    QUEEN: 12,
    JACK: 11,
    '10': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
  };
  puntos = signal(0);
  totalVidas = 3;
  vidas = signal(this.totalVidas);
  vidasArray = Array(this.totalVidas).fill(0);
  ultimoResultado = signal<'acierto' | 'error' | 'empate' | null>(null);
  tiempoInicio = 0;
  intervaloId: any;
  tiempo = signal(0);
  cartasRestantes = 51;

  async ngOnInit() {
    this.iniciarJuego();
  }

  ngOnDestroy() {
    clearInterval(this.intervaloId);
  }

  async iniciarJuego() {
    clearInterval(this.intervaloId);
    await this.generarMazo();
    await this.traerCartaActual();
    await this.traerCartaSiguiente();
    this.tiempoInicio = Date.now();
    this.intervaloId = setInterval(() => {
      const segundos = Math.floor((Date.now() - this.tiempoInicio) / 1000);
      this.tiempo.set(segundos);
    }, 1000);
  }

  jugarDeNuevo() {
    this.iniciarJuego();
    this.puntos.set(0);
    this.vidas.set(this.totalVidas);
    this.tiempo.set(0);
    this.ultimoResultado.set(null);
  }

  async generarMazo() {
    const mazo = await firstValueFrom(
      this.http.get<Mazo>('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'),
    );
    this.deck_id.set(mazo.deck_id);
    this.cartasRestantes = mazo.remaining;
  }

  async traerCartaActual() {
    if (!this.deck_id()) return;

    const draw = await firstValueFrom(
      this.http.get<Draw>(
        'https://www.deckofcardsapi.com/api/deck/' + this.deck_id() + '/draw?count=1',
      ),
    );
    this.cartaActual.set(draw.cards[0]);
  }

  async traerCartaSiguiente() {
    if (!this.deck_id() || this.cartasRestantes === 0) {
      this.cartaSiguiente.set(null);
      return;
    }
    const draw = await firstValueFrom(
      this.http.get<Draw>(
        'https://www.deckofcardsapi.com/api/deck/' + this.deck_id() + '/draw?count=1',
      ),
    );
    this.cartaSiguiente.set(draw.cards[0]);
    this.cartasRestantes = draw.remaining;
  }

  comparar(eleccion: 'mayor' | 'menor') {
    const actual = this.cartaActual();
    const siguiente = this.cartaSiguiente();
    if (!actual || !siguiente) return;
    const valorActual = this.mapearValores(actual);
    const valorSiguiente = this.mapearValores(siguiente);
    const empate = valorSiguiente === valorActual;
    const acerto =
      (eleccion === 'mayor' && valorSiguiente > valorActual) ||
      (eleccion === 'menor' && valorSiguiente < valorActual);

    if (empate) {
      this.ultimoResultado.set('empate');
    } else if (acerto) {
      this.puntos.update((p) => p + 1);
      this.ultimoResultado.set('acierto');
    } else {
      this.vidas.update((v) => v - 1);
      this.ultimoResultado.set('error');
    }
    setTimeout(() => this.ultimoResultado.set(null), 600);

    this.cartaActual.set(this.cartaSiguiente());
    this.traerCartaSiguiente();
    if (this.perdio() || this.gano()) {
      const tiempoFinal = this.terminarJuego();
      this.supabaseService.saveMayorOMenorData({
        idUsuario: this.authService.usuario()?.id,
        puntaje: this.puntos(),
        gano: this.gano(),
        tiempoSegundos: tiempoFinal,
      });
      Swal.fire(
        this.gano() ? 'Ganaste!' : 'Perdiste!',
        this.gano()
          ? 'Felicitaciones sus estadìsticas seran guardadas!'
          : 'Sus estadìsticas seran guardadas!',
        this.gano() ? 'success' : 'error',
      );
    }
  }

  perdio() {
    return this.vidas() == 0;
  }

  gano() {
    return this.cartasRestantes == 0;
  }

  terminarJuego() {
    clearInterval(this.intervaloId);
    return Math.floor((Date.now() - this.tiempoInicio) / 1000);
  }

  mapearValores(carta: Carta) {
    return this.VALORES[carta.value];
  }
}
