import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValidator(matchWith: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const matchWithControl = control.parent?.get(matchWith);

    if (matchWithControl && control) {
      if (matchWithControl.value !== control.value) {
        return { passwordMismatch: true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
}
