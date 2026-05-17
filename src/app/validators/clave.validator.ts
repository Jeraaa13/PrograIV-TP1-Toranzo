import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function confirmarClaveValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        
      const claveControl = formGroup.get('clave');
      const repiteClaveControl = formGroup.get('repiteClave');
      const respuestaError = { noCoincide: 'Las claves no coinciden' };

      if (claveControl?.value !== repiteClaveControl?.value) {
        formGroup.get('repiteClave')?.setErrors(respuestaError);
        return respuestaError;

      } else {
        formGroup.get('repiteClave')?.setErrors(null);
        return null;
      } 
    };
  }