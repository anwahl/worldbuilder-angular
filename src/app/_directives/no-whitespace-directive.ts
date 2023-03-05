import { Directive, ElementRef,  Renderer2, } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[noWhitespace]', 
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
export class NoWhitespaceDirective implements Validator {
  
  constructor(private elementRef: ElementRef, private renderer: Renderer2, ) {
  }

  ngOnInit(): void {
    const parent = this.renderer.parentNode(this.elementRef.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return (control.value != null && (control.value?.trim() != '')) ? null : { required: {value:true} };
  }


}