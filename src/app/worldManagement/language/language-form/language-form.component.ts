import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_alert';
import { World } from 'src/app/_model/world';
import { Language } from '../../model/language';
import { WorldStorageService } from '../../service/world-storage.service';
import { LanguageService } from '../../language/service/language.service';


@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.css',]
})
export class LanguageFormComponent {
  language: Language;
  world: World;
  id: string;
  worldId: string;
  isAddMode: boolean;
  public loading = false;
  redirectUrl: string | undefined;

  form = this.formBuilder.group({
    name: ['', {
        validators: [
           Validators.required,
           Validators.minLength(3),
           Validators.maxLength(64)
        ],
        updateOn: 'blur'
    }],
    description: ['', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1024)
      ],
      updateOn: 'blur'
    }]
  });

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private worldStorage: WorldStorageService,
        private languageService: LanguageService) {
    
    this.redirectUrl = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.language = new Language();
    this.language.world = this.worldStorage.getWorld();

    if (!this.isAddMode) {
      this.loading = true;
      this.languageService.findById(this.id).subscribe({
        next: data => {
            this.loading = false;
            this.language = data;
            this.form.patchValue({
              name: this.language.name,
              description: this.language.description
            });
          }, error: err => {
            this.loading = false;
            this.alertService.error("Error retrieving language: " + err.error.error);
        }
      });
    } 
  }

  async onSubmit() {
    if(this.form.valid) {
      this.loading = true;
      const name = this.form.controls.name.value?.trim() || '';
      const description = this.form.controls.description.value?.trim() || '';
      this.language = {
        name: name,
        description: description,
        world: this.worldStorage.getWorld()
      };
      if (!this.isAddMode)
        this.language.id = this.id;

      const observe = this.isAddMode ? this.languageService.create(this.language) : this.languageService.update(this.language);
      
      observe.subscribe({
          next: result => {
            this.loading = false;
            const message = this.isAddMode ? 'Language saved successfully!' : 'Language updated successfully!';
            this.alertService.success(message);
            this.gotoRedirect();
          },
          error: err => {
            this.loading = false;
            const message = this.isAddMode ? 'Error creating Language: ' : 'Error updating Language: ';
            this.alertService.error(message + err.error.error);
          }
        });
      } else {
        this.validateAllFormFields(this.form);
      }
    }

  
    validateAllFormFields(formGroup: FormGroup) {         
      Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);             
        if (control instanceof FormControl) {             
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {        
          this.validateAllFormFields(control);            
        }
      });
    }

  gotoRedirect() {
    this.router.navigate(['/'+this.redirectUrl]);
  }
}
