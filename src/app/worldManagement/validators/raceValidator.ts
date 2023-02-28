import { FormGroup, ValidationErrors } from "@angular/forms";

export function raceValidator() {
    return (form: FormGroup): ValidationErrors | null => {
      return (form.get('race') && (form.get('newRace')?.get('name') && form.get('newRace')?.get('description') && form.get('newRace')?.get('trait'))) ||
             (!form.get('race') && !(form.get('newRace')?.get('name') && form.get('newRace')?.get('description') && form.get('newRace')?.get('trait'))) 
                ? { raceError : true } 
                : null;
    };
  }