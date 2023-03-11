import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { Validation } from '../_helpers/validation';

@Directive({
  selector: '[appEitherOrArrayCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EitherOrArrayCheckDirective, multi: true }]
})
export class EitherOrArrayCheckDirective implements Validator {
  @Input('appEitherOrArrayCheck') eitherOr: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.eitherOrArray(this.eitherOr[0], this.eitherOr[1])(formGroup);
  }
}