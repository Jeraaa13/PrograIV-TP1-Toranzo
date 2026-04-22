import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmarClaveValidator } from '../../validators/clave.validator';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro implements OnInit {
  miFormulario!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.miFormulario = new FormGroup({
      nombre: new FormControl("", [Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$'), Validators.required]),
      apellido: new FormControl("", [Validators.pattern('^[a-zA-ZÁÉÍÓÚáéíóúÑñ ]+$'), Validators.required]),
      edad: new FormControl("", [Validators.min(18), Validators.max(99), Validators.required]),
      mail: new FormControl("", [Validators.email, Validators.required]),
      clave: new FormControl("", [Validators.minLength(6), Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*+\\-_.?])[A-Za-z0-9!@#$%^&*+\\-_.?]{6,}$')]),
      repiteClave: new FormControl(null, [Validators.required])
    }, confirmarClaveValidator());
  }

  get nombre() { return this.miFormulario.get('nombre'); }
  get apellido() { return this.miFormulario.get('apellido'); }
  get edad() { return this.miFormulario.get('edad'); }
  get mail() { return this.miFormulario.get('mail'); }
  get clave() { return this.miFormulario.get('clave'); }
  get repiteClave() { return this.miFormulario.get('repiteClave'); }

  enviarForm() {
    this.miFormulario.markAllAsTouched();
    if (this.miFormulario.invalid) return;

    const { repiteClave, ...usuario } = this.miFormulario.value;
    const guardado = localStorage.getItem('usuarios');
    const usuarios = guardado ? JSON.parse(guardado) : [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.router.navigate(['/login']);
  }

  resetearForm() {
    this.miFormulario.reset();
  }
}
