import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



export function ComparePasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
        confirmPassword?.setErrors({ notSame: true });
    }
    return null;
  };
}