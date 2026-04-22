import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-calculadora',
  imports: [FormsModule],
  templateUrl: './calculadora.html',
  styleUrl: './calculadora.css'
})
export class Calculadora {
  edadUno = 0;
  edadDos = 0;
  sumaEdades = 0;
  edadPromedio = 0;

  calcular() {
    this.sumaEdades = this.edadUno + this.edadDos;
    this.edadPromedio = (this.edadUno + this.edadDos) / 2;
  }

  limpiar() {
    this.edadUno = 0;
    this.edadDos = 0;
    this.sumaEdades = 0;
    this.edadPromedio = 0;
  }
}

