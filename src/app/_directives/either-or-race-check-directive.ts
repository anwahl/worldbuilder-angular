import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { Validation } from '../_helpers/validation';

@Directive({
  selector: '[appEitherOrRaceCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EitherOrRaceCheckDirective, multi: true }]
})
export class EitherOrRaceCheckDirective implements Validator {
  @Input('appEitherOrRaceCheck') eitherOr: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.eitherOrRace(this.eitherOr[0], this.eitherOr[1])(formGroup);
  }
}