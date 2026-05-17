import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { OnInit } from '@angular/core';
import { PreguntadosRespuesta } from '../../interfaces/preguntados-respuesta';
import { Pregunta } from '../../interfaces/pregunta';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UnsplashRespuesta } from '../../interfaces/unsplash-respuesta';
import { SupabaseService } from '../../servicios/supabase';
import { Auth } from '../../servicios/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  imports: [],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css',
})
export class Preguntados implements OnInit {
  http = inject(HttpClient);
  supabaseService = inject(SupabaseService);
  authService = inject(Auth);
  tiempo = signal(180);
  puntos = signal(0);
  tiempoInicio = 180;
  intervaloId: any;
  preguntas = signal<Pregunta[]>([]);
  preguntaActual = signal<Pregunta | null>(null);
  preguntasRespondidas = 0;
  respuestasMezcladas = signal<string[]>([]);
  eleccionUsuario = signal<string | null>(null);
  imagenURL = signal<string | null>(null);
  totalVidas = 3;
  vidas = signal(this.totalVidas);
  vidasArray = Array(this.totalVidas).fill(0);
  ultimoResultado = signal<'acierto' | 'error' | null>(null);
  CATEGORIAS: Record<string, string> = {
    'General Knowledge': 'Conocimiento General',
    'Entertainment: Books': 'Entretenimiento: Libros',
    'Entertainment: Film': 'Entretenimiento: Cine',
    'Entertainment: Music': 'Entretenimiento: Mùsica',
    'Entertainment: Musicals & Theatres': 'Entretenimiento: Musicales & Teatros',
    'Entertainment: Television': 'Entretenimiento: Telivisiòn',
    'Entertainment: Video Games': 'Entretenimiento: Video Juegos',
    'Entertainment: Board Games': 'Entretenimiento: Juegos de Mesa',
    'Science & Nature': 'Ciencia & Naturaleza',
    'Science: Computers': 'Ciencia: Computadoras',
    'Science: Mathematics': 'Ciencia: Matematìcas',
    Mythology: 'Mitologìa',
    Sports: 'Deportes',
    Geography: 'Geografìa',
    History: 'Historia',
    Politics: 'Polìtica',
    Art: 'Arte',
    Celebrities: 'Celebridades',
    Animals: 'Animales',
    Vehicles: 'Vehìculos',
    'Entertainment: Comics': 'Entretenimiento: Comics',
    'Science: Gadgets': 'Ciencia: Artilugios',
    'Entertainment: Japanese Anime & Manga': 'Entretenimiento: Anime & Manga',
    'Entertainment: Cartoon & Animations': 'Entretenimiento: Caricaturas & Animaciones',
  };
  DIFICULTADES: Record<string, string> = {
    easy: 'Facìl',
    medium: 'Intermedio',
    hard: 'Dificìl',
  };
  tiempoPregunta = signal(15);
  intervaloPreguntaId: any;

  ngOnInit(): void {
    this.iniciarJuego();
  }

  async iniciarJuego() {
    await this.generarPreguntas();
    this.generarPregunta();
    clearInterval(this.intervaloId);
    this.intervaloId = setInterval(() => {
      this.tiempo.update((t) => t - 1);
      if (this.tiempo() <= 0) {
        this.terminarJuego();
      }
    }, 1000);
  }

  jugarDeNuevo() {
    this.iniciarJuego();
    this.puntos.set(0);
    this.vidas.set(this.totalVidas);
    this.tiempo.set(180);
    this.ultimoResultado.set(null);
    this.eleccionUsuario.set(null);
    this.preguntasRespondidas = 0;
    this.respuestasMezcladas.set([]);
    this.preguntaActual.set(null);
    this.preguntas.set([]);
  }

  async generarPreguntas() {
    const respuesta = await firstValueFrom(
      this.http.get<PreguntadosRespuesta>('https://opentdb.com/api.php?amount=5'),
    );
    const decodificadas = respuesta.results.map((p) => ({
      ...p,
      question: this.decodificar(p.question),
      category: this.decodificar(p.category),
      correct_answer: this.decodificar(p.correct_answer),
      incorrect_answers: p.incorrect_answers.map((r) => this.decodificar(r)),
    }));
    this.preguntas.set(decodificadas);
  }

  async generarPregunta() {
    if (this.preguntas().length === 0) return;
    const pregunta = this.preguntas()[this.preguntasRespondidas];
    if (!pregunta) return;
    this.preguntaActual.set(pregunta);
    console.log(pregunta.correct_answer);
    let preguntaArray = [pregunta.correct_answer, ...pregunta.incorrect_answers];
    preguntaArray = [...preguntaArray].sort(() => Math.random() - 0.5);
    this.respuestasMezcladas.set(preguntaArray);
    await this.conseguirImagen(pregunta.category);
    this.iniciarTimerPregunta();
  }

  async recibirRespuesta(respuesta: string) {
    clearInterval(this.intervaloPreguntaId);
    this.eleccionUsuario.set(respuesta);
    if (respuesta === this.preguntaActual()?.correct_answer) {
      this.puntos.update((p) => p + 1);
      this.ultimoResultado.set('acierto');
    } else {
      this.vidas.update((v) => v - 1);
      this.ultimoResultado.set('error');
    }
    this.preguntasRespondidas += 1;
    if (this.preguntasRespondidas >= this.preguntas().length) {
      this.preguntasRespondidas = 0;
      await this.generarPreguntas();
    }

    if (this.perdio() || this.gano()) {
      const tiempoFinal = this.terminarJuego();
      this.supabaseService.savePreguntadosData({
        idUsuario: this.authService.usuario()?.id,
        puntaje: this.puntos(),
        tiempoSegundos: tiempoFinal,
        gano: this.gano(),
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

  terminarJuego() {
    clearInterval(this.intervaloId);
    return 180 - this.tiempo();
  }

  siguientePregunta() {
    this.eleccionUsuario.set(null);
    this.ultimoResultado.set(null);
    this.generarPregunta();
  }

  decodificar(texto: string): string {
    const div = document.createElement('textarea');
    div.innerHTML = texto;
    return div.value;
  }

  async conseguirImagen(categoria: string) {
    const respuesta = await firstValueFrom(
      this.http.get<UnsplashRespuesta>(
        `https://api.unsplash.com/search/photos/?query=${categoria}&per_page=1&client_id=${environment.unsplashKey}`,
      ),
    );
    this.imagenURL.set(respuesta.results[0].urls?.regular ?? null);
  }

  perdio() {
    return this.vidas() == 0;
  }

  gano() {
    return this.tiempo() === 0 && this.vidas() > 0;
  }

  mapearCategorias(pregunta: Pregunta) {
    return this.CATEGORIAS[pregunta.category];
  }

  mapearDificultades(pregunta: Pregunta) {
    return this.DIFICULTADES[pregunta.difficulty];
  }

  iniciarTimerPregunta() {
    clearInterval(this.intervaloPreguntaId);
    this.tiempoPregunta.set(15);
    this.intervaloPreguntaId = setInterval(() => {
      this.tiempoPregunta.update((t) => t - 1);
      if (this.tiempoPregunta() <= 0) {
        this.recibirRespuesta('null');
      }
    }, 1000);
  }
}
