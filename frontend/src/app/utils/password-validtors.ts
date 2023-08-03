import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value: string = control.value || '';

    const errors: Record<string, boolean> = {};

    if (value.length < 5) {
      errors['minimumFiveCharacters'] = true;
    }

    if (value.length > 10) {
      errors['maximumTenCharacters'] = true;
    }

    if (/[A-Z]+/g.test(value) === false) {
      errors['minimumOneUppercase'] = true;
    }

    if (/[a-z]+/g.test(value) === false) {
      errors['minimumOneLowercase'] = true;
    }

    if (/[0-9]+/g.test(value) === false) {
      errors['minimumOneNumber'] = true;
    }

    return errors;
  };
}
