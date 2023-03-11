import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { Validation } from '../_helpers/validation';

@Directive({
  selector: '[appRequiredIfPoliticalSystemCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RequiredIfPoliticalSystemDirective, multi: true }]
})
export class RequiredIfPoliticalSystemDirective implements Validator {
  @Input('appRequiredIfPoliticalSystemCheck') requiredIf: (string|boolean)[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.requiredIfPoliticalSystem(this.requiredIf[0], this.requiredIf[1])(formGroup);
  }
}