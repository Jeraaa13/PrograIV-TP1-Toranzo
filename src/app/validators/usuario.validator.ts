import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import { UsuariosService } from "../servicios/usuarios";


export function usuarioExisteAsyncValidator(usuariosService: UsuariosService): AsyncValidatorFn  {
    return (control: AbstractControl) => {
      const usuario = control.value;
      return usuariosService.TraerUsuarios(usuario)
      .pipe(
        map(usuarios => {
          if (usuarios.length > 0) {
            return { usuarioExiste: 'El usuario ya existe' };
          } 
          return null;
        })
      );
    };
  }