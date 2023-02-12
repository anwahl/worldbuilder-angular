import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { Validation } from '../_helpers/validation';

@Directive({
  selector: '[appMatchEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchEmailDirective, multi: true }]
})
export class MatchEmailDirective implements Validator {
  @Input('appMatchEmail') matchEmail: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.match(this.matchEmail[0], this.matchEmail[1])(formGroup);
  }
}