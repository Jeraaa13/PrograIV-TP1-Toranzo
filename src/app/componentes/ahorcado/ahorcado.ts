import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { Auth } from '../../servicios/auth';
import { SupabaseService } from '../../servicios/supabase';
@Component({
  selector: 'app-ahorcado',
  imports: [],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css',
})
export class Ahorcado implements OnInit, OnDestroy {
  authService = inject(Auth);
  supabaseService = inject(SupabaseService);
  juegoTerminado = signal(false);
  tiempoInicio = 0;
  intervaloId: any;
  tiempo = signal(0);
  palabraSeleccionada = '';
  letrasUsadas = signal<string[]>([]);
  letras: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'Ñ',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  palabras: string[] = [
    'HOLA',
    'MESSI',
    'DIOS',
    'MARADONA',
    'CODIGO',
    'PROGRAMACION',
    'ANGULAR',
    'VARIABLE',
    'MUNDIAL',
    'SPRINT',
    'AHORCADO',
  ];

  ngOnInit() {
    this.iniciarJuego();
  }

  ngOnDestroy() {
    clearInterval(this.intervaloId);
  }

  apretarLetra(letra: string) {
    if (this.letrasUsadas().includes(letra)) return;
    if (this.juegoTerminado()) return;
    this.letrasUsadas.update((actuales) => [...actuales, letra]);

    if (this.gano() || this.perdio()) {
      const tiempoFinal = this.terminarJuego();
      this.supabaseService.saveAhorcadoData({
        idUsuario: this.authService.usuario()?.id,
        palabra: this.palabraSeleccionada,
        letrasUsadas: this.letrasUsadas().length,
        gano: this.gano(),
        tiempoSegundos: tiempoFinal,
        errores: this.errores(),
      });
      Swal.fire(
        this.gano() ? 'Ganaste!' : 'Perdiste!',
        this.gano()
          ? 'Felicitaciones sus estadisiticas seran guardadas!'
          : 'Sus estadisticas seran guardadas! PALABRA: ' + this.palabraSeleccionada,
        this.gano() ? 'success' : 'error',
      );
    }
  }

  errores(): number {
    return this.letrasUsadas().filter((l) => !this.palabraSeleccionada.includes(l)).length;
  }

  intentosRestantes(): number {
    return 6 - this.errores();
  }

  gano(): boolean {
    return [...this.palabraSeleccionada].every((c) => this.letrasUsadas().includes(c));
  }

  perdio(): boolean {
    return this.errores() >= 6;
  }

  terminarJuego() {
    this.juegoTerminado.set(true);
    clearInterval(this.intervaloId);
    return Math.floor((Date.now() - this.tiempoInicio) / 1000);
  }

  jugarDeNuevo() {
    this.iniciarJuego();
    this.letrasUsadas.set([]);
    this.juegoTerminado.set(false);
    this.tiempo.set(0);
  }

  iniciarJuego() {
    clearInterval(this.intervaloId);
    const numRandom = Math.floor(Math.random() * this.palabras.length);
    this.palabraSeleccionada = this.palabras[numRandom];
    this.tiempoInicio = Date.now();
    this.intervaloId = setInterval(() => {
      const segundos = Math.floor((Date.now() - this.tiempoInicio) / 1000);
      this.tiempo.set(segundos);
    }, 1000);
  }
}
