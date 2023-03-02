import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { Validation } from '../_helpers/validation';

@Directive({
  selector: '[appEitherOrGenericCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EitherOrGenericCheckDirective, multi: true }]
})
export class EitherOrGenericCheckDirective implements Validator {
  @Input('appEitherOrGenericCheck') eitherOr: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.eitherOrGeneric(this.eitherOr[0], this.eitherOr[1])(formGroup);
  }
}