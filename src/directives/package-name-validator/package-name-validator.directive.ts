import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[ngModel][packageNameValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PackageNameValidatorDirective, multi: true}]
})
export class PackageNameValidatorDirective implements Validator {
  public validate(control: AbstractControl): ValidationErrors | null {
    const scopedPackage = new RegExp('^@[^\/@]+\/[^\/@]+$');
    const notScopedPackage = new RegExp('^([^._@])[^\/@]+$');
    if (control.value && !scopedPackage.test(control.value) && !notScopedPackage.test(control.value)) {
      return {invalidPackageName: true};
    }
    return null;
  }
}
