import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { Validation } from '../_helpers/validation';

@Directive({
  selector: '[appEitherOrGeographyCheck]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EitherOrGeographyCheckDirective, multi: true }]
})
export class EitherOrGeographyCheckDirective implements Validator {
  @Input('appEitherOrGeographyCheck') eitherOr: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.eitherOrGeography(this.eitherOr[0], this.eitherOr[1])(formGroup);
  }
}