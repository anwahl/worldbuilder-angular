import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { Validation } from '../_helpers/validation';

@Directive({
  selector: '[appRequiredIfGenericCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RequiredIfGenericDirective, multi: true }]
})
export class RequiredIfGenericDirective implements Validator {
  @Input('appRequiredIfGenericCheck') requiredIf: (string|boolean)[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.requiredIfGeneric(this.requiredIf[0], this.requiredIf[1])(formGroup);
  }
}