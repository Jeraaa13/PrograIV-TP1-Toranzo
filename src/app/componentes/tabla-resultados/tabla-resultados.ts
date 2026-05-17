import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tabla-resultados',
  imports: [],
  templateUrl: './tabla-resultados.html',
  styleUrl: './tabla-resultados.css',
})
export class TablaResultados {
  titulo = input.required<string>();
  datos = input.required<any[]>();
  columnas = input.required<string[]>();
}
