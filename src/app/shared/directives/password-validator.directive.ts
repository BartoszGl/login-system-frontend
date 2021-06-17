import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasSpecialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasNumeric && hasSpecialChars;

    return !passwordValid ? {
      isPasswordStrong: {
        hasUpperCase: !hasUpperCase,
        hasNumeric: !hasNumeric,
        hasSpecialChars: !hasSpecialChars
      }
    } : null;
  };
}
