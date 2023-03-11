import { FormArray, FormGroup } from "@angular/forms";

export class Validation {
    static match(controlName: string, checkControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const checkControl = formGroup.controls[checkControlName];
  
        if (checkControl?.errors && !checkControl.errors['matching']) {
          return null;
        }
  
        if (control?.value !== checkControl?.value) {
          checkControl?.setErrors({ matching: true });
          return { matching: true };
        } else {
          checkControl?.setErrors(null);
          return null;
        }
      };
    }

    static eitherOrRace(controlName: string, checkControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const checkControl = formGroup.controls[checkControlName];
        
        if ((!control.value)
           && 
           ((checkControl?.get('name')?.value == null || (checkControl?.get('name')?.value?.trim() == '')) 
              || (checkControl?.get('description')?.value == null || (checkControl?.get('description')?.value?.trim() == ''))
              || (checkControl?.get('trait')?.value == null || (checkControl?.get('trait')?.value?.trim() == '')))) {
          checkControl?.get('name')?.setErrors({ eitherOrRace: {value:true} });
          checkControl?.get('description')?.setErrors({ eitherOrRace: {value:true} });
          checkControl?.get('trait')?.setErrors({ eitherOrRace: {value:true} });
          control?.setErrors({ eitherOrRace: {value:true} });
          return { eitherOrRace: {value:true} };
        } else {
          checkControl?.get('name')?.setErrors(null);
          checkControl?.get('description')?.setErrors(null);
          checkControl?.get('trait')?.setErrors(null);
          control?.setErrors(null);
          return null;
        }
      };
    }

    static eitherOrGeography(controlName: string, checkControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const checkControl = formGroup.controls[checkControlName];
  
        if ((!control.value)
           && 
           ((checkControl?.get('name')?.value == null || (checkControl?.get('name')?.value?.trim() == '')) 
              || (checkControl?.get('description')?.value == null || (checkControl?.get('description')?.value?.trim() == ''))
              || (checkControl?.get('type')?.value == null || (checkControl?.get('type')?.value?.trim() == '')))) {
          checkControl?.get('name')?.setErrors({ eitherOrGeography: {value:true} });
          checkControl?.get('description')?.setErrors({ eitherOrGeography: {value:true} });
          checkControl?.get('type')?.setErrors({ eitherOrGeography: {value:true} });
          control?.setErrors({ eitherOrGeography: {value:true} });
          return { eitherOrGeography: {value:true} };
        } else {
          checkControl?.get('name')?.setErrors(null);
          checkControl?.get('description')?.setErrors(null);
          checkControl?.get('type')?.setErrors(null);
          control?.setErrors(null);
          return null;
        }
      };
    }

    static eitherOrGeneric(controlName: string, checkControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const checkControl = formGroup.controls[checkControlName];
        
        if ((!control.value)
        && 
           ((checkControl?.get('name')?.value == null || (checkControl?.get('name')?.value?.trim() == '')) 
           || (checkControl?.get('description')?.value == null || (checkControl?.get('description')?.value?.trim() == '')))) {
          checkControl?.get('name')?.setErrors({ eitherOr: {value:true} });
          checkControl?.get('description')?.setErrors({ eitherOr: {value:true} });
          control?.setErrors({ eitherOr: {value:true} });
          return { eitherOr: {value:true} };
        } else {
          checkControl?.get('name')?.setErrors(null);
          checkControl?.get('description')?.setErrors(null);
          control?.setErrors(null);
          return null;
        }
      };
    }

    static eitherOrArray(controlName: string, checkControlName: string) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const checkControl = formGroup.controls[checkControlName] as FormArray;
        if (checkControl?.controls.length > 0) {
          checkControl?.setErrors(null);
          control?.setErrors(null);
          return null;
        } else if (control?.value.length == 0) {
          control?.setErrors({ eitherOr: {value:true} });
          return { eitherOr: {value:true} };
        } else {
          return null;
        }
      };
    }

    static requiredIfGeneric(controlName: string|boolean, check: string|boolean) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[String(controlName)];
        const checkControl = Boolean(check);
  
        if (checkControl) {
          if((!control?.get('name')?.value || (control?.get('name')?.value.trim() == '')) && (!control?.get('description')?.value || (control?.get('description')?.value.trim() == ''))) {
            control?.get('name')?.setErrors({ requiredIf: {value:true} });
            control?.get('description')?.setErrors({ requiredIf: {value:true} });
            return { requiredIf: {value:true} };
          } else if ((!control?.get('name')?.value || (control?.get('name')?.value.trim() == ''))) {
            control?.get('description')?.setErrors(null);
            control?.get('name')?.setErrors({ requiredIf: {value:true} });
            return { requiredIf: {value:true} };
          } else if ((!control?.get('description')?.value || (control?.get('description')?.value.trim() == ''))) {
            control?.get('name')?.setErrors(null);
            control?.get('description')?.setErrors({ requiredIf: {value:true} });
            return { requiredIf: {value:true} };
          } else {
            control?.get('name')?.setErrors(null);
            control?.get('description')?.setErrors(null);
            return null;
          }
        } else {
          control?.get('name')?.setErrors(null);
          control?.get('description')?.setErrors(null);
          return null;
        }
      };
    }
    
    static requiredIfPoliticalSystem(controlName: string|boolean, check: string|boolean) {
      return (formGroup: FormGroup) => {
        const control = formGroup.controls[String(controlName)];
        const checkControl = Boolean(check);
  
        if (checkControl) {
          if ((!control?.get('name')?.value || (control?.get('name')?.value.trim() == '')) && (!control?.get('description')?.value || (control?.get('description')?.value.trim() == '')) && (!control?.get('type')?.value || (control?.get('type')?.value.trim() == ''))) {
            control?.get('name')?.setErrors({ requiredIf: {value:true} });
            control?.get('description')?.setErrors({ requiredIf: {value:true} });
            control?.get('type')?.setErrors({ requiredIf: {value:true} });
            return { requiredIf: {value:true} };
          } else if((!control?.get('name')?.value || (control?.get('name')?.value.trim() == '')) && (!control?.get('description')?.value || (control?.get('description')?.value.trim() == ''))) {
            control?.get('name')?.setErrors({ requiredIf: {value:true} });
            control?.get('description')?.setErrors({ requiredIf: {value:true} });
            control?.get('type')?.setErrors({ requiredIf: {value:true} });
            return { requiredIf: {value:true} };
          } else if((!control?.get('name')?.value || (control?.get('name')?.value.trim() == '')) && (!control?.get('type')?.value || (control?.get('type')?.value.trim() == ''))) {
            control?.get('name')?.setErrors({ requiredIf: {value:true} });
            control?.get('description')?.setErrors({ requiredIf: {value:true} });
            control?.get('type')?.setErrors({ requiredIf: {value:true} });
            return { requiredIf: {value:true} };
          } else if((!control?.get('type')?.value || (control?.get('type')?.value.trim() == '')) && (!control?.get('description')?.value || (control?.get('description')?.value.trim() == ''))) {
            control?.get('name')?.setErrors({ requiredIf: {value:true} });
            control?.get('description')?.setErrors({ requiredIf: {value:true} });
            control?.get('type')?.setErrors({ requiredIf: {value:true} });
            return { requiredIf: {value:true} };
          } else if ((!control?.get('name')?.value || (control?.get('name')?.value.trim() == ''))) {
            control?.get('description')?.setErrors(null);
            control?.get('name')?.setErrors({ requiredIf: {value:true} });
            control?.get('type')?.setErrors({ requiredIf: {value:true} });
            return { requiredIf: {value:true} };
          } else if ((!control?.get('description')?.value || (control?.get('description')?.value.trim() == ''))) {
            control?.get('name')?.setErrors(null);
            control?.get('description')?.setErrors({ requiredIf: {value:true} });
            control?.get('type')?.setErrors({ requiredIf: {value:true} });
            return { requiredIf: {value:true} };
          } else if ((!control?.get('type')?.value || (control?.get('type')?.value.trim() == ''))) {
            control?.get('name')?.setErrors(null);
            control?.get('description')?.setErrors({ requiredIf: {value:true} });
            control?.get('type')?.setErrors({ requiredIf: {value:true} });
            return { requiredIf: {value:true} };
          } else {
            control?.get('name')?.setErrors(null);
            control?.get('description')?.setErrors(null);
            control?.get('type')?.setErrors(null);
            return null;
          }
        } else {
          control?.get('name')?.setErrors(null);
          control?.get('description')?.setErrors(null);
          control?.get('type')?.setErrors(null);
          return null;
        }
      };
    }
  }